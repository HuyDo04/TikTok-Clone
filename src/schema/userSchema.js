import * as yup from "yup";

const userSchema = yup
    .object({
        fullname : yup
        .string()
        .required("Vui lòng không để trống"),
        email : yup 
        .string()
        .required("Vui lòng không để trống")
        .email("Vui lòng nhập đúng định dạng email"),
        password: yup 
        .string()
        .required("Vui lòng không để trống")
        .min(8,"Mật khẩu cần tối thiểu 8 ký tự"),
        confirmPassword: yup 
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng.")
        .required("Vui lòng không để trống")
    })

export default userSchema