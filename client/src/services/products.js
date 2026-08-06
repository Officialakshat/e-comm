import api from "./api";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post("/products", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await api.post("/products/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.imageUrl;
};
