import * as yup from "yup";

const userSchema = yup
    .object({
        username : yup
        .string()
        .required("Vui lòng nhập tên người dùng")
        .min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
        email : yup 
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
        password: yup 
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8,"Mật khẩu phải có ít nhất 8 ký tự"),
        confirmPassword: yup 
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu")
    })

export default userSchema