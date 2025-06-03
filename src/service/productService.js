import httpRequest from "@/utils/httpRequest"

export const getAll = async () => {
    const response = await httpRequest.get("/products");
    return response;
};

export const getOne = async (id) => {
    const response = await httpRequest.get(`/products/${id}`);
    return response;
};

export const update = async (id, data) => {
    const response = await httpRequest.put(`/products/${id}`, data);
    return response;
};

export const del = async (id) => {
    const response = await httpRequest.del(`/products/${id}`);
    return response;
};

export default {
    getAll,
    getOne,
    update,
    del,
}
