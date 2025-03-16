import { defineStore } from 'pinia';
import apiClient from '@/api/api.js';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    schoolDetails: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchSchoolDetails(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get(`/users/${userId}/schoolDetails`);
        this.schoolDetails = response.data;
      } catch (error) {
        this.error = "Impossible de récupérer les informations scolaires.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
