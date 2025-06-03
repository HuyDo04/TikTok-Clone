import * as yup from "yup";

const loginSchema = yup
    .object({
        email : yup 
        .string()
        .required("Vui lòng không để trống")
        .email("Vui lòng nhập đúng định dạng email"),
        password: yup 
        .string()
        .required("Vui lòng không để trống")
        .min(8,"Mật khẩu cần tối thiểu 8 ký tự"),
    })

export default loginSchema