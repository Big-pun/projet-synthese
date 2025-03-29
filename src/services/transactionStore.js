import { defineStore } from 'pinia';
import { deleteTransaction, getUserTransactions, updateTransaction, postNewTransaction } from '@/api/api.js';

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
        console.log(this.transactions);
      } catch (error) {
        this.error = "Impossible de récupérer les transactions.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addNewTransaction(userId, transactionData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await postNewTransaction(userId, transactionData);
        this.transactions.push(response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        this.error = "Impossible de créer la transaction.";
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteTransaction(userId, transactionId) {
      this.loading = true;
      this.error = null;
      try {
        await deleteTransaction(userId, transactionId);
        this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      } catch (error) {
        this.error = "Impossible de supprimer la transaction.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async updateTransaction(userId, transactionId, transactionData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateTransaction(userId, transactionId, transactionData);
        this.transactions = this.transactions.map(transaction => {
          if (transaction.id === transactionId) {
            return { ...transaction, ...response.data };
          }
          return transaction;
        });
      } catch (error) {
        this.error = "Impossible de mettre à jour la transaction.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    isEntryRecurrent(entry) {
      return entry.frequency !== -1;
    },

    async deleteNonRecurrentTransactions(userId) {
      this.transactions.forEach(async (transaction) => {
        if (!this.isEntryRecurrent(transaction)) {
          // If the transaction is not recurrent, delete it
          await this.deleteTransaction(userId, transaction.id);
        }
      });
      // update the local state
      this.transactions = this.transactions.filter(transaction => this.isEntryRecurrent(transaction));
    }
  },
});
