import { defineStore } from 'pinia';
import { getUserBankingDetails, updateBankingDetails } from '../api/api.js';

export const useBankingStore = defineStore('banking', {
  state: () => ({
    bankingDetails: {
      institutionName: '',
      accountInfo: '',
      loanInfo: '',
      other: ''
    },
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
        if (error.response?.status === 404) {
          console.log('Aucune donnée bancaire disponible pour cet utilisateur');
        } else {
          this.error = "Impossible de récupérer les détails bancaires.";
          console.error('Erreur lors de la récupération des données bancaires:', error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateBankingDetails(userId, bankingData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateBankingDetails(userId, bankingData);
        this.bankingDetails = response.data;  
      } catch (error) {
        this.error = "Impossible de mettre à jour les détails bancaires.";
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
