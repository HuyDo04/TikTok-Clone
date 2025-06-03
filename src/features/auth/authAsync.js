import authService from "@/service/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser",
    async () => {
        const user = await authService.getCurrentUser();
        return user
    }
)
