import * as httpRequest from "@/utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response.data;
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  const requestData = {
    firstName,
    lastName,
    email,
    password,
    password_confirmation: confirmPassword,
  };
  try {
    const response = await httpRequest.post("/auth/register", requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // ? tránh lỗi response là undefined
    throw error.response?.data || error.message;
  }
};

export const login = async (data) => {
  const response = await httpRequest.post("auth/login", data);
  return response;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await httpRequest.post("/auth/logout", null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    httpRequest.setToken(null);
    return response;
  } catch (error) {
    console.error("Lỗi khi logout:", error);
    throw error.response?.data || error.message;
  }
};

export const checkEmail = async (email) => {
  try {
    const res = await httpRequest.get(`/auth/check-email?email=${email}`);
    return res.data.exists;
  } catch (error) {
    console.error("Lỗi check email:", error);
    return false;
  }
};

export const checkEmailUpdate = async (email, id) => {
  try {
    const res = await httpRequest.get(
      `/auth/check-email?email=${email}&exclude_id=${id}`
    );
    console.log(res.data.exists);
    return res.data.exists;
  } catch (error) {
    console.error("Lỗi check email:", error);
    return false;
  }
};

export const checkPhone = async (phone, id) => {
  try {
    const res = await httpRequest.get(
      `/auth/check-phone?phone=${phone}&exclude_id=${id}`
    );
    return res.data.exists;
  } catch (error) {
    console.error("Lỗi check phone:", error);

    return false;
  }
};

export const CheckUsername = async (username, id) => {
  try {
    const res = await httpRequest.get(
      `/auth/check-phone?phone=${username}&exclude_id=${id}`
    );
    return res.data.exists;
  } catch (error) {
    console.error("Lỗi check username:", error);
    return false;
  }
};

export default {
  getCurrentUser,
  register,
  login,
  logout,
  checkEmail,
  checkPhone,
  CheckUsername,
  checkEmailUpdate,
};
