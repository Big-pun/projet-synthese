<script setup>
import BudgetTableTemplate from './BudgetTableTemplate.vue';

const props = defineProps({
  spendings: Array,
  itemsTotal: Number,
  loading: Boolean
});

const headers = [
  { label: 'Description', key: 'description' },
  { label: 'Catégorie', key: 'category' },
  { label: '$/mois', key: 'amount' },
  { label: 'Recurrent', key: 'recurrent' },
  { label: 'Actions', key: 'actions' }
];

const emits = defineEmits(['toggleTransactionReccurence', 'updateFrequency', 'deleteItem', 'openForm']);
</script>

<template>
  <BudgetTableTemplate 
    name="Dépenses" 
    :loading="loading"
    :headers="headers" 
    :items="spendings" 
    :primaryColorTheme= false
    :itemsTotal="itemsTotal"
    @toggleTransactionReccurence="$emit('toggleTransactionReccurence', $event)"
    @updateFrequency="$emit('updateFrequency', $event)"
    @deleteItem="$emit('deleteItem', $event)"
    @openForm="$emit('openForm')"
  />
</template>
