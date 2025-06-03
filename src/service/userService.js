import * as httpRequest from "@/utils/httpRequest";

export const getAll = async () => {
    const response = await httpRequest.get("/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response;
};

export const getOne = async (username) => {
    const response = await httpRequest.get(`/users/${username}`); 
    return response; 
};

export const update = async (username, data) => {
    const response = await httpRequest.put(`/users/${username}`, data);
    return response
}

export default {
    getAll,
    getOne,
    update
}

