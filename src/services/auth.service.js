import httpRequest from "@/utils/httpRequest"

// Register
export const register = async (data) => {
    const response = await httpRequest.post("/auth/register", data)
    return response
}

// Verify Email
export const verifyEmail = async (token) => {
    const response = await httpRequest.get(`/auth/verify-email?token=${token}`)
    return response
}

// Login
export const login = async (data) => {
    try {
      const response = await httpRequest.post("/auth/login", data, { withCredentials: true });
      // localStorage.setItem("token", response.access_token);   
      return response;
    } catch (error) {
      console.error("Login API error:", error);
      throw error; 
    }
  };

  // Resend Email
export const resendVerification = async (email) => {
  const response = await httpRequest.post("/auth/resend-verification", { email }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await httpRequest.post("/auth/forgot-password", {email})  
  return response
}

export const verifyOtp = async (email, otp) => {
  const response = await httpRequest.post("/auth/forgot-password/verify-otp", {email, otp})
  return response
}

export const resetPassword = async (data) => {
  const response = await httpRequest.put("/auth/forgot-password/reset-password", data)
  
  return response
}

export const resendOtp = async (email) => {
  const response = await httpRequest.post("/auth/forgot-password/resend-otp", {email})
  return response
}

export const changePassword = async (data) => {
  const response = await httpRequest.post("/auth/change-password", data);
  
  return response
}

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response
}

export const logout = async (refreshToken) => {
  const response = await httpRequest.post("/auth/logout", { refresh_token: refreshToken });
  
  return response
}

export const googleLogin = async (token) => {
  const response = await httpRequest.post("/auth/oauth/google", { token });
  return response;
};

export const facebookLogin = async (token) => {
  const response = await httpRequest.post("/auth/oauth/facebook", { token });
  return response;
};

export const refreshToken = async (token) => {
  const response = await httpRequest.post("/auth/refresh-token", { refresh_token: token });
  return response;
};

const authService = {
  login,
  logout,
  register,
  verifyEmail,
  resendVerification,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  changePassword,
  getCurrentUser,
  googleLogin,
  facebookLogin,
  refreshToken
};

export default authService;