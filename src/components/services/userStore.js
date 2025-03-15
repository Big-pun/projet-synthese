import { defineStore } from 'pinia';
import apiClient from '@/api/api.js';

export const useUserStore = defineStore('user', {
    state: () => ({
      user: null,
      token: null,
      loading: false,
      error: null,
    }),
    actions: {
      async login(email, password) {
        this.loading = true;
        this.error = null;
        try {
          const response = await apiClient.post('/auth/login', { email, password });
  
          if (response.data.success) {
            this.user = response.data.user;
            this.token = response.data.token;
            localStorage.setItem('token', this.token);
            return { success: true };
          } else {
            this.error = response.data.message || "Erreur de connexion.";
            return { success: false, message: this.error };
          }
        } catch (error) {
          this.error = "Identifiants incorrects ou erreur serveur.";
          return { success: false, message: "Erreur de connexion." };
        }
      },
  
      async register(userData) {
        this.loading = true;
        this.error = null;
        try {
          const response = await apiClient.post('/auth/register', userData);
  
          if (response.data.success) {
            return { success: true, user: response.data.user };
          } else {
            this.error = response.data.message || "Erreur lors de l'inscription.";
            return { success: false, message: this.error };
          }
        } catch (error) {
          this.error = "Erreur de serveur.";
          return { success: false, message: "Erreur lors de l'inscription." };
        } finally {
          this.loading = false;
        }
      },
    },
  });