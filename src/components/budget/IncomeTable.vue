<script setup>
import BudgetTableTemplate from './BudgetTableTemplate.vue';

const props = defineProps({
  incomes: Array,
  itemsTotal: Number
});

const headers = [
  { label: 'Description', key: 'name' },
  { label: '$/mois', key: 'amount' },
  { label: 'Recurrent', key: 'recurrent' },
  { label: 'Actions', key: 'actions' }
];
</script>

<template>
  <BudgetTableTemplate 
    name="Revenus" 
    :headers="headers" 
    :items="incomes"
    :primaryColorTheme= true
    :itemsTotal="itemsTotal"
    @toggleReccurence="$emit('toggleReccurence')"
    @deleteItem="$emit('deleteItem', $event)"
    @openForm="$emit('openForm')"
  />
</template>