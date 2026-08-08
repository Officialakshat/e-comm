import api from "./api";

// ===============================
// CREATE ORDER
// ===============================
export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

// ===============================
// GET LOGGED-IN USER ORDERS
// ===============================
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/myorders");
  return data;
};

// ===============================
// GET SINGLE ORDER
// ===============================
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// ===============================
// ADMIN - GET ALL ORDERS
// ===============================
export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// ===============================
// ADMIN - UPDATE ORDER STATUS
// ===============================
export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}`, {
    status,
  });

  return data;
};
