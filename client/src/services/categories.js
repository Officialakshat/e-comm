import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET
export const getCategories = async () => {
  const response = await axios.get(API_URL, getConfig());

  return response.data;
};

// CREATE
export const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, getConfig());

  return response.data;
};

// UPDATE
export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    categoryData,
    getConfig(),
  );

  return response.data;
};

// DELETE
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig());

  return response.data;
};
