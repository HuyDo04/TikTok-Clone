import { getCurrentUser } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk("auth/getCurrentUser",
    async () => {
        const user = await getCurrentUser();
        
        return user;
    }
);
