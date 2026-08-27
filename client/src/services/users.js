import api from "./api";

// Get all customers - Admin only
export async function getAllUsers() {
  const response = await api.get("/users");

  return response.data;
}
