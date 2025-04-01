import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://money-pie-1.fly.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Users endpoints
export const getUserById = (userId) => apiClient.get(`/users/${userId}`);
export const updateUser = (userId, userData) => apiClient.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => apiClient.delete(`/users/${userId}`);
export const postNewUser = (userData) => apiClient.post("/users", userData);
export const getUserByEmail = (email) => apiClient.get(`/users/email/${email}`);


// Transactions endpoints
export const getUserTransactions = (userId) =>
  apiClient.get(`/users/${userId}/transactions`);

export const postNewTransaction = (userId, transactionData) =>{
  const url = `/users/${userId}/transactions`;
  console.log('url', url);
  console.log('transactionData', transactionData);
  return apiClient.post(url, transactionData);
}

export const deleteTransaction = (userId, transactionId) => {
  console.log('deleting en cours');
  return apiClient.delete(`/users/${userId}/transactions/${transactionId}`);
}

export const updateTransaction = (userId, transactionId, transactionData) =>
  apiClient.put(`/users/${userId}/transactions/${transactionId}`, transactionData);


// Addresses endpoints
export const getUserAddresses = (userId) =>
  apiClient.get(`/users/${userId}/addresses`);

export const updateAddress = (userId, addressData) =>
  apiClient.put(`/users/${userId}/addresses`, addressData);

export const getAddressByType = (userId, addressType) =>
  apiClient.get(`/users/${userId}/addresses/${addressType}`);


// Banking details endpoints
export const getUserBankingDetails = (userId) =>
  apiClient.get(`/users/${userId}/banking-details`);

export const updateBankingDetails = (userId, bankingData) =>
  apiClient.put(`/users/${userId}/banking-details`, bankingData);


// School details endpoints
export const getUserSchoolDetails = (userId) =>
  apiClient.get(`/users/${userId}/school-details`);

export const updateSchoolDetails = (userId, schoolData) =>
  apiClient.put(`/users/${userId}/school-details`, schoolData);