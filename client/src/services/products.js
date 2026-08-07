import api from "./api";

// =========================
// GET PRODUCTS
// =========================
export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);

  return data;
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);

  return data;
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};

// =========================
// UPLOAD PRODUCT IMAGE
// =========================
export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const { data } = await api.post("/products/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.imageUrl;
};
