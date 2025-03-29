<script setup>
import BudgetTableTemplate from './BudgetTableTemplate.vue';

const props = defineProps({
  incomes: Array,
  itemsTotal: Number,
  loading: Boolean
});

const headers = [
  { label: 'Description', key: 'description' },
  { label: '$/mois', key: 'amount' },
  { label: 'Recurrent', key: 'recurrent' },
  { label: 'Actions', key: 'actions' }
];

const emits = defineEmits(['toggleTransactionReccurence', 'updateFrequency', 'deleteItem', 'openForm']);
</script>

<template>
  <BudgetTableTemplate 
    name="Revenus" 
    :loading="loading"
    :headers="headers" 
    :items="incomes"
    :primaryColorTheme= true
    :itemsTotal="itemsTotal"
    @toggleTransactionReccurence="$emit('toggleTransactionReccurence', $event)"
    @updateFrequency="$emit('updateFrequency', $event)"
    @deleteItem="$emit('deleteItem', $event)"
    @openForm="$emit('openForm')"
  />
</template>