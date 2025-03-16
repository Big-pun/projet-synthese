import { defineStore } from 'pinia';
import { getUserAddresses } from '@/api/api.js';

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAddresses(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getUserAddresses(userId);
        this.addresses = response.data;
      } catch (error) {
        this.error = "Impossible de récupérer les adresses.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
