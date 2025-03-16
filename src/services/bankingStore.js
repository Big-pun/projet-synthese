import { defineStore } from 'pinia';
import { getUserBankingDetails } from '@/api/api.js';

export const useBankingStore = defineStore('banking', {
  state: () => ({
    bankingDetails: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchBankingDetails(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getUserBankingDetails(userId);
        this.bankingDetails = response.data;
      } catch (error) {
        this.error = "Impossible de récupérer les détails bancaires.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
