import axios from "axios";

// One axios instance; every request goes to /api (Vite proxies it to Express)
const api = axios.create({ baseURL: "/api" });

// Turn axios errors into a simple Error carrying the backend's message
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(new Error(error.response?.data?.message || error.message))
);

export const registerUser = (email, password) => api.post("/users/register", { email, password });

export const loginUser = (email, password) => api.post("/users/login", { email, password });

export const getProducts = (userId) => api.get("/products", { params: { userId } });

export const addProduct = (product) => api.post("/products", product);

export const updateProduct = (id, product) => api.put(`/products/${id}`, product);

export const deleteProduct = (id) => api.delete(`/products/${id}`);
