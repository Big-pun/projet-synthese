<script setup>
import BudgetPreview from '@/components/budget/BudgetPreview.vue';
import IncomeForm from '@/components/budget/IncomeForm.vue';
import IncomeTable from '@/components/budget/IncomeTable.vue';
import SpendingForm from '@/components/budget/SpendingForm.vue';
import SpendingTable from '@/components/budget/SpendingTable.vue';
import Modal from '@/components/general/Modal.vue';
import { useTransactionStore } from '@/services/transactionStore';
import { computed, onMounted, ref } from 'vue';

const transactionStore = useTransactionStore();

// Charger les transactions au montage du composant
onMounted(() => {
  const userId = 1; // Remplacez par l'ID utilisateur approprié
  transactionStore.fetchTransactions(userId);
});

const incomeFormModalOpen = ref(false);
const spendingFormModalOpen = ref(false);

/* this code (userBudget object with hardcoded values) will be deleted once the api will be linked, but the structure of the transactions objects will need to be this way */
/* use a computed value to perform any needed transformations from the transactions object from the API to the object below */
const userBudget = ref({
  incomes: [
    { id: 1, name: 'Salaire mensuel', amount: 3000, recurrent: true },
    { id: 2, name: 'Bourse universitaire', amount: 700, recurrent: true },
    { id: 3, name: 'Revenu freelance', amount: 500, recurrent: false }
  ],
  spendings: [
    { id: 1, name: 'Loyer', category: 'Logement', amount: 900 },
    { id: 2, name: 'Courses alimentaires', category: 'Alimentation', amount: 300, recurrent: true },
    { id: 3, name: 'Abonnement Internet', category: 'Services', amount: 50, recurrent: true },
    { id: 4, name: 'Transport en commun', category: 'Transport', amount: 80, recurrent: false },
    { id: 5, name: 'Sorties et loisirs', category: 'Divertissement', amount: 150, recurrent: true }
  ]
});

const calcItemsTotal = (items) => {
  return items.reduce((acc, item) => acc + item.amount, 0);
};

const incomesTotal = computed(() => {
  return calcItemsTotal(userBudget.value.incomes);
});

const spendingsTotal = computed(() => {
  return calcItemsTotal(userBudget.value.spendings);
});

const balance = computed(() => {
  return incomesTotal.value - spendingsTotal.value;
});

const percentageSpent = computed(() => {
  return Math.floor((spendingsTotal.value / incomesTotal.value) * 100);
});

const toggleIncomeReccurence = (itemId) => {
  const item = userBudget.value.incomes.find((item) => item.id === itemId);
  item.recurrent = !item.recurrent;
};

const toggleSpendingReccurence = (itemId) => {
  const item = userBudget.value.spendings.find((item) => item.id === itemId);
  item.recurrent = !item.recurrent;
};

const deleteSpending = (itemId) => {
  userBudget.value.spendings = userBudget.value.spendings.filter((item) => item.id !== itemId);
  console.log('Delete spending', itemId);
};

const deleteIncome = (itemId) => {
  userBudget.value.incomes = userBudget.value.incomes.filter((item) => item.id !== itemId);
  console.log('Delete income', itemId);
};

const addIncome = (income) => {
  userBudget.value.incomes.push(income);
};

const addSpending = (spending) => {
  userBudget.value.spendings.push(spending);
};

const openIncomeFormModal = () => {
  incomeFormModalOpen.value = true;
  spendingFormModalOpen.value = false;
  console.log('openIncomeFormModal');
};

const openSpendingFormModal = () => {
  spendingFormModalOpen.value = true;
  incomeFormModalOpen.value = false;
  console.log('openSpendingFormModal');
};

const closeModal = () => {
  incomeFormModalOpen.value = false;
  spendingFormModalOpen.value = false;
};

</script>

<template>
  <div class="flex flex-col gap-12">

    <BudgetPreview :balance="balance" :percentageSpent="percentageSpent" :spendingsTotal="spendingsTotal"></BudgetPreview>

    <button class="border-2 border-accent1 hover:bg-accent1 inline-block w-max py-2 px-5 rounded-md self-end text-accent1 hover:text-white font-semibold transition-all">Nouveau mois</button>
    
    <IncomeTable
    :incomes="userBudget.incomes"
    :itemsTotal="incomesTotal"
    @toggleReccurence="toggleIncomeReccurence"
    @deleteItem="deleteIncome"
    @openForm="openIncomeFormModal" 
    />
    
    <SpendingTable
    :spendings="userBudget.spendings"
    :itemsTotal="spendingsTotal"
    @openForm="openSpendingFormModal"
    @deleteItem="deleteSpending"
    @toggleReccurence="toggleSpendingReccurence" 
    />

    <Modal :isOpen="incomeFormModalOpen || spendingFormModalOpen" @close="closeModal">
      <IncomeForm v-if="incomeFormModalOpen"></IncomeForm>
      <SpendingForm v-if="spendingFormModalOpen"></SpendingForm>
    </Modal>

  </div>
</template>

<style></style>