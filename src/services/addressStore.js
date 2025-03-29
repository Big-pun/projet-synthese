import { defineStore } from 'pinia';
import { getUserAddresses, updateAddress } from '@/api/api.js';

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
    async updateAddress(userId, addressData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateAddress(userId, addressData);
        const updatedAddresses = this.addresses.map(addr => 
          addr.type === addressData.type ? response.data : addr
        );
        this.addresses = updatedAddresses;
        return response.data;
      } catch (error) {
        this.error = "Impossible de mettre à jour l'adresse.";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
