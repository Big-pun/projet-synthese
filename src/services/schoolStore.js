import { defineStore } from 'pinia';
import { getUserSchoolDetails } from '../api/api.js';

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
        const response = await getUserSchoolDetails(userId);
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