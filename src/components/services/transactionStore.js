import { defineStore } from 'pinia';
import { getUserTransactions } from '@/api/api.js';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTransactions(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getUserTransactions(userId);
        this.transactions = response.data;
      } catch (error) {
        this.error = "Impossible de récupérer les transactions.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
