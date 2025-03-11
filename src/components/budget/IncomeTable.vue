<script setup>
import { ref } from 'vue';
import deleteIcon from '@/assets/img/icons/delete_icon.svg';
import toolIcon from '@/assets/img/icons/tool_icon.svg';
import recurrenceIcon from '@/assets/img/icons/recurrence_icon.png';

// This data will come from the backend or store
const userBudget = ref({
  incomes: [
    { id: 1, name: 'Salaire', amount: 2000, reccurent: true },
    { id: 2, name: 'Bourse', amount: 500, reccurent: true },
    { id: 3, name: 'Aide familiale', amount: 200, reccurent: false },
  ],
  spendings: [
    { id: 1, name: 'Loyer', amount: 500 },
    { id: 2, name: 'Courses', amount: 200 },
    { id: 3, name: 'Transport', amount: 100 },
  ],
});

const openIncomeFormModal = () => {
  console.log('openIncomeFormModal');
}
</script>

<template>
   <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative">
      <h3 class="text-white ml-8">Renseignements personnels</h3>
      
      <!-- Rectangle SVG avec changement de couleur lors du survol -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
           class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" :fill="hovered ? '#00EC86' : '#F74949'"/>
      </svg>
    </div>


  <table class="w-full bg-light-gray rounded-lg relative">
    <thead class="bg-gray relative text-white font-medium">
      <tr>
        <th>Description</th>
        <th>$/mois</th>
        <th>
          <img class="block sm:hidden" :src="recurrenceIcon" alt="Recurrent">
          <span class="hidden sm:inline-block">Recurrent</span>
        </th>
        <th><img :src="toolIcon" alt="Actions"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="income in userBudget.incomes" :key="income.id">
        <td>{{ income.name }}</td>
        <td>{{ income.amount}}</td>
        <td>{{ income.reccurent }}</td>
        <td>
          <button @click="ouvrirModal(activite)">
            <img :src="deleteIcon" alt="Supprimer la ligne">
          </button>
        </td>
      </tr>
      <tr class="tr-btn">
        <td colspan="4" class="w-full">
          <button class="cursor-pointer font-medium transition-all duration-200 hover:bg-accent1 hover:text-white" @click="openIncomeFormModal()">+ Ajouter un revenu</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

thead tr,
tbody tr {
  width: 100%;
  display: grid;
  grid-template-columns: 7fr 3fr 3fr 1fr;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

tbody, thead {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

thead {
  border-radius: 8px 8px 0 0;
}

th {
  text-align: left;
}

tbody tr {
  background-color: var(--color-white);
  border-radius: 8px;
}

tr {
  display: block;
  padding-left: 22px;
  padding-right: 22px;
}

.tr-btn {
  display: block;
  width: 100%;
  padding: 0;
}

tbody tr {
  padding-top: 15px;
  padding-bottom: 15px;
}

thead tr {
  padding-top: 5px;
  padding-bottom: 5px;
}

.tr-btn td {
  width: 100%;
}

.tr-btn button {
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 15px;
  padding-bottom: 15px;
}

thead, 
tbody {
  padding: 10px;
}

td {
  width: fit-content;
}

th, td {
  margin: auto;
}

th:nth-child(1),
td:nth-child(1) {
  margin: 0;
}

th img {
  height: 24px;
}

.tr-btn {
  margin: auto;
  border: 2px solid var(--color-accent2);
  transition: all 200ms ease;
}

table:hover .tr-btn {
  border-color: var(--color-accent1);
}

tbody img {
  height: 24px;
}

td {
  display: flex;
  align-items: center;
}

table::after {
  content: '';
  position: absolute;
  height: 60px;
  width: 30px;
  background-color: var(--color-accent2);
  top: 0;
  right: 2%;
  transition: all 200ms ease;
}

table:hover::after {
  height: 75px;
  background-color: var(--color-accent1);
}

@media screen and (max-width: 800px) {
  thead tr,
  tbody tr {
  grid-template-columns: 4fr 2fr 2fr 1fr;
}

tr {
  padding: 5px 10px;
}
}

</style>