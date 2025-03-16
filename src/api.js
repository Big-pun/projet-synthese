import axios from "axios";

// URL de votre API
const API_URL = 'https://money-pie-1.fly.dev/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //Inscription user
  export const registerUser = async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw error;
    }
  };

  //Connexion user
  export default async function loginUser(userData) {
    try {
      const response = await api.post('/users/login', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur connexion:', error);
      throw error;
    }
  };
