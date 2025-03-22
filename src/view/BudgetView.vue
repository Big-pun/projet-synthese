<script setup>
import BudgetPreview from '@/components/budget/BudgetPreview.vue';
import IncomeTable from '@/components/budget/IncomeTable.vue';
import SpendingTable from '@/components/budget/SpendingTable.vue';
import { ref } from 'vue';

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

const toggleReccurence = (item) => {
  item.recurrent = !item.recurrent;
};

const openModal = (item) => {
  console.log('Open modal for item:', item);
};
</script>

<template>
  <div class="flex flex-col gap-12">
    <BudgetPreview></BudgetPreview>
    <IncomeTable
    :incomes="userBudget.incomes"
    @toggleReccurence="toggleReccurence"
    @openModal="openModal"
    @openForm="openIncomeFormModal" 
    />
    
    <SpendingTable
    :spendings="userBudget.spendings"
    @openModal="openModal"
    @openForm="openIncomeFormModal"
    @toggleReccurence="toggleReccurence" 
    />
  </div>
</template>

<style></style>