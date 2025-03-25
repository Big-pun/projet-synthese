<script setup>
import BudgetTableTemplate from './BudgetTableTemplate.vue';

const props = defineProps({
  spendings: Array,
  itemsTotal: Number
});

const headers = [
  { label: 'Description', key: 'name' },
  { label: 'Catégorie', key: 'category' },
  { label: '$/mois', key: 'amount' },
  { label: 'Recurrent', key: 'recurrent' },
  { label: 'Actions', key: 'actions' }
];

</script>

<template>
  <BudgetTableTemplate 
    name="Dépenses" 
    :headers="headers" 
    :items="spendings" 
    :primaryColorTheme= false
    :itemsTotal="itemsTotal"
    @toggleReccurence="$emit('toggleReccurence')"
    @deleteItem="$emit('deleteItem', $event)"
    @openForm="$emit('openForm')"
  />
</template>
