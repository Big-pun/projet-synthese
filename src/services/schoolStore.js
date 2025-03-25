import { defineStore } from 'pinia';
import { getUserSchoolDetails, updateSchoolDetails } from '@/api/api.js';

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

    async updateSchoolDetails(userId, schoolData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateSchoolDetails(userId, schoolData);
        this.schoolDetails = response.data;
        return response.data;
      } catch (error) {
        this.error = "Impossible de mettre à jour les informations scolaires.";
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});