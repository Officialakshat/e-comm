import api from "./api";

// Get all categories
export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}
export async function getAdminCategories() {
  const { data } = await api.get("/categories/admin");
  return data;
}

// Create category
export async function createCategory(categoryData) {
  const { data } = await api.post("/categories", categoryData);
  return data;
}

// Update category
export async function updateCategory(id, categoryData) {
  const { data } = await api.put(`/categories/${id}`, categoryData);
  return data;
}

// Delete category
export async function deleteCategory(id) {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}
