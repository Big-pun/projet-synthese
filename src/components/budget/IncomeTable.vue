<script setup>
import BaseBudgetTable from './BaseBudgetTable.vue';

const props = defineProps({
  incomes: Array
});

const headers = [
  { label: 'Description', key: 'name' },
  { label: '$/mois', key: 'amount' },
  { label: 'Recurrent', key: 'recurrent' },
  { label: 'Actions', key: 'actions' }
];
</script>

<template>
  <BaseBudgetTable 
    name="Revenus" 
    :headers="headers" 
    :items="incomes" 
    @toggleReccurence="$emit('toggleReccurence', $event)"
    @openModal="$emit('openModal', $event)"
    @openForm="$emit('openForm')"
  />
</template>