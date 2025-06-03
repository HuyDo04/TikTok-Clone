import Button from "@/component/Button";
import authService from "@/service/authService";
import userService from "@/service/userService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const name = useParams();
  const [profile, setProfile] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function handle() {
      const res = await userService.getOne(name.username);
      setProfile(res.data);
    }
    handle();
  }, [name.username]);

  useEffect(() => {
    async function handle() {
      const data = await authService.getCurrentUser();
      setCurrentUser(data);
    }
    handle();
  }, []);

  return (
    <>
      <h1>User Profile</h1>
      <p>
        Họ và tên: {profile.firstName} {profile.lastName}
      </p>
      <p>Email: {profile.email}</p>
      <p>Giới tính: {profile.gender || "Chưa cập nhật"}</p>
      <p>Tuổi: {profile.age || "Chưa cập nhật"}</p>
      <p>Số điện thoại: {profile.phone || "Chưa cập nhật"}</p>
      <p>Ngày sinh: {profile.birthDate || "Chưa cập nhật"}</p>
      <p>Avatar</p>
      <img src={profile.image || "Avatar"} alt="" width={200} />
      <p>
        Trạng thái:
        {profile.emailVerifiedAt
          ? "Tài khoản đã được xác minh"
          : "Tài khoản chưa xác minh"}
      </p>
      {profile.username === currentUser.username ? (
        <button onClick={() => navigate(`/profile/${profile.username}/edit`)}>
          Edit
        </button>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
