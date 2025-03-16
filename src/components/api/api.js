import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://money-pie-1.fly.dev/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
});

// Get user by ID
export const getUserById = (userId) => apiClient.get(`/users/${userId}`);

// Get user transactions
export const getUserTransactions = (userId) =>
  apiClient.get(`/users/${userId}/transactions`);

// Get user addresses
export const getUserAddresses = (userId) =>
  apiClient.get(`/users/${userId}/addresses`);

// Get user banking details
export const getUserBankingDetails = (userId) =>
  apiClient.get(`/users/${userId}/bankingDetails`);

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data; 
  } catch (error) {
    return { success: false, message: "Erreur de connexion." };
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data; // { success: true, user: {...} } 
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Erreur lors de l'inscription." };
  }
};

export default {
  getUserById,
  getUserTransactions,
  getUserAddresses,
  getUserBankingDetails,
  loginUser,
  registerUser,
};
