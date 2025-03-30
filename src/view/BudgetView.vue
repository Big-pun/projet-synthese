<script setup>
import BudgetForm from '@/components/budget/BudgetForm.vue';
import BudgetPreview from '@/components/budget/BudgetPreview.vue';
import IncomeTable from '@/components/budget/IncomeTable.vue';
import SpendingTable from '@/components/budget/SpendingTable.vue';
import Modal from '@/components/general/Modal.vue';
import { useTransactionStore } from '@/services/transactionStore';
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/services/userStore';
import { showConfirmPopup, showSuccessPopup } from '@/utils/sweetAlert';

const transactionStore = useTransactionStore();
const userStore = useUserStore();

// Get user ID from the user store to fetch transactions infos
const userId = computed(() => userStore.user?.id || null);

// Fetch transactions on component mount
onMounted(() => {
  transactionStore.fetchTransactions(userId.value);
});

// Modal Management (Forms)
const modalType = ref(null);

const openModal = (type) => {
  modalType.value = type;
};

const closeModal = () => {
  modalType.value = null;
};

// Easy acces to reactive transactionStore state variables - Need to be computed to be reactive to the store changes
const incomes = computed(() => transactionStore.incomes);
const spendings = computed(() => transactionStore.spendings);
const incomesTotal = computed(() => transactionStore.incomesTotal);
const spendingsTotal = computed(() => transactionStore.spendingsTotal);

// Recurrence Toggle Switch Function (activate and set a default frequency value OR deactivate and set frequency to -1)
const toggleTransactionReccurence = (transactionId) => transactionStore.toggleTransactionReccurence(transactionId);

const updateTransactionFrequency = (payload) => {
  const { transactionId= payload.itemId, frequency } = payload;
  transactionStore.updateTransactionFrequency(transactionId, frequency);
}

const deleteTransaction = (transactionId) => transactionStore.deleteTransaction(userId.value, transactionId);

const addTransaction = (transaction) => {
  const newTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount),
      type: modalType.value === 'income' ? 'Revenue' : 'Expense',
      isDone: true,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

  transactionStore.addNewTransaction(userId.value, newTransaction);
  closeModal();
};

// Reset Budget for New Month Function
const resetBudgetNewMonth = async () => {
  // SweetAlert2 confirmation modal
  const result = await showConfirmPopup({
    text: 'Cette action est irréversible et effacera toutes vos transactions non récurrentes!',
    confirmButtonText: 'Oui, supprimer',
  });

  // If user confirms, delete all non-recurrent items
  if (result.isConfirmed) {
    transactionStore.deleteNonRecurrentTransactions(userId.value);
    showSuccessPopup({
      title: "Supprime!",
      text: `Les transactions non réccurentes ont bien ete supprimées. Vous êtes prêt pour votre nouveau mois !`,
    });
  }
}
</script>

<template>
  <div class="flex flex-col gap-8 main--boxed">

    <BudgetPreview :incomesTotal="incomesTotal" :spendingsTotal="spendingsTotal"></BudgetPreview>

    <button class="border-2 border-accent1 hover:bg-accent1 inline-block w-max py-2 px-5 rounded-md self-end text-accent1 hover:text-white font-semibold transition-all" @click="resetBudgetNewMonth" >Nouveau mois</button>
    
    <IncomeTable
    :loading ="transactionStore.loading"
    :incomes="incomes"
    :itemsTotal="incomesTotal"
    @toggleTransactionReccurence="toggleTransactionReccurence"
    @deleteItem="deleteTransaction"
    @openForm="openModal('income')" 
    @updateFrequency="updateTransactionFrequency"
    />
    
    <SpendingTable
    :loading ="transactionStore.loading"
    :spendings="spendings"
    :itemsTotal="spendingsTotal"
    @openForm="openModal('spending')"
    @deleteItem="deleteTransaction"
    @toggleTransactionReccurence="toggleTransactionReccurence"
    @updateFrequency="updateTransactionFrequency"
    />

    <Modal :isOpen="modalType !== null || undefined" @close="closeModal">
      <BudgetForm 
      :title="modalType === 'income' ? 'Ajouter un revenu' : 'Ajouter une dépense'"
      :subTitle="modalType === 'income'  ? 'Ajoutez un revenu récurrent ou ponctuel' : 'Ajoutez une dépense récurrente ou ponctuelle'"
      :hasCategory="modalType === 'spending' "
      @submit="addTransaction"
      />
    </Modal>

  </div>
</template>

<style></style>