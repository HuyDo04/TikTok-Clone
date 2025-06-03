import * as yup from "yup";

const updateSchema = yup
    .object({
      firstName: yup.string().required("Họ không được để trống"),
      lastName: yup.string().required("Tên không được để trống"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      gender: yup.string().required("Họ không được để trống"),
      phone: yup.string().required("Họ không được để trống"),
      birthDate: yup.date().required("Họ không được để trống"),
      username: yup.string().required("Username không được để trống"),
        emailVerifiedAt: yup
    .mixed()
    .transform((value) => (value ? "Tài khoản đã được xác minh" : "Tài khoản chưa xác minh")),

    });

export default updateSchema