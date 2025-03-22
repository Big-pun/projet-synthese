<script setup>
import BaseBudgetTable from './BaseBudgetTable.vue';

const props = defineProps({
  spendings: Array
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
  <BaseBudgetTable 
    name="Dépenses" 
    :headers="headers" 
    :items="spendings" 
    @toggleReccurence="$emit('toggleReccurence', $event)"
    @openModal="$emit('openModal', $event)"
    @openForm="$emit('openForm')"
  />
</template>
