import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "@/service/userService";
import { useParams, useNavigate } from "react-router-dom";
import InputText from "@/component/InputText";
import authService from "@/service/authService";
import useDebounce from "@/hooks/useBounce";
import { useLoading } from "@/hooks/useLoading";

const schema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  gender: yup.string(),
  phone: yup.string(),
  birthDate: yup.string(),
  username: yup.string(),
});

function EditProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { loading, setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const typeImage = ["image/jpg", "image/jpeg", "image/png"];
    const fileSizeInMB = file.size / (1024 * 1024);

    if (!typeImage.includes(file.type)) {
      alert("Chỉ nhận file jpg, jpeg, png");
      return;
    }

    if (fileSizeInMB > 5) {
      alert("Không up ảnh quá 5Mb");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setAvatar(file);
  };

  const cancelImage = () => {
    setPreview(null);
    setAvatar(null);
  };

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await authService.getCurrentUser();
        setCurrentUser(data);

        const res = await userService.getOne(username);
        setAvatar(res.data.image);

        // Gán các giá trị vào form
        [
          "firstName",
          "lastName",
          "email",
          "gender",
          "phone",
          "birthDate",
          "username",
        ].forEach((key) => setValue(key, res.data[key] || ""));

        setIsUserLoaded(true);
      } catch (err) {
        setFormError("Không thể tải thông tin người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, setValue, setLoading]);

  const debouncedEmail = useDebounce(watch("email"), 400);
  const debouncedPhone = useDebounce(watch("phone"), 400);
  const debouncedUsername = useDebounce(watch("username"), 400);

  // mail
  useEffect(() => {
    if (!debouncedEmail || !isUserLoaded || !currentUser) return;
    const checkEmail = async () => {
      const isValid = await trigger("email");
      if (isValid) {
        const exists = await authService.checkEmailUpdate(
          debouncedEmail,
          currentUser.id
        );
        if (exists) {
          setError("email", {
            type: "manual",
            message: "Email này đã được sử dụng",
          });
        }
      }
    };

    checkEmail();
  }, [debouncedEmail, trigger, setError, isUserLoaded, currentUser]);

  // phone
  useEffect(() => {
    if (!debouncedPhone || !currentUser) return;

    const checkPhone = async () => {
      const isValid = await trigger("phone");
      if (isValid) {
        const exists = await authService.checkPhone(
          debouncedPhone,
          currentUser.id
        );
        if (exists) {
          setError("phone", {
            type: "manual",
            message: "Số điện thoại đã được sử dụng",
          });
        }
      }
    };

    checkPhone();
  }, [debouncedPhone, trigger, setError, currentUser]);

  // username
  useEffect(() => {
    if (!debouncedUsername || !isUserLoaded || !currentUser) return;
    const checkUsername = async () => {
      const isValid = await trigger("username");
      if (isValid) {
        const exists = await authService.CheckUsername(
          debouncedUsername,
          currentUser.id
        );
        if (exists) {
          setError("username", {
            type: "manual",
            message: "Username này đã được sử dụng",
          });
        }
      }
    };

    checkUsername();
  }, [debouncedUsername, trigger, setError, isUserLoaded, currentUser]);

  // submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        if (key === "image" && avatar instanceof File) {
          formData.append("image", avatar);
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      setLoading(true);
      await userService.update(username, formData);
      alert("Cập nhật thành công!");
      navigate(`/profile/${username}`);
    } catch (error) {
      console.log("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (formError) return <p>{formError}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Họ</label>
      <InputText
        type="text"
        name="firstName"
        register={register}
        message={errors.firstName?.message}
      />

      <label>Tên</label>
      <InputText
        type="text"
        name="lastName"
        register={register}
        message={errors.lastName?.message}
      />

      <label>Email</label>
      <InputText
        type="email"
        name="email"
        register={register}
        message={errors.email?.message}
      />

      <label>Giới tính</label>
      <select {...register("gender")}>
        <option value="">Chưa cập nhật</option>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>

      <label>Số điện thoại</label>
      <InputText
        type="text"
        name="phone"
        register={register}
        message={errors.phone?.message}
      />

      <label>Ngày sinh</label>
      <InputText
        type="date"
        name="birthDate"
        register={register}
        message={errors.birthDate?.message}
      />

      <label>Username</label>
      <InputText
        type="text"
        name="username"
        register={register}
        message={errors.username?.message}
      />

      <label>Avatar</label>
      <div>
        <img
          src={preview || avatar}
          alt="Avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={handleImage}
      />
      {preview && (
        <button type="button" onClick={cancelImage}>
          Hủy bỏ ảnh mới
        </button>
      )}

      <button type="submit">{loading ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </form>
  );
}

export default EditProfile;
