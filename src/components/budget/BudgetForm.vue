<script setup>
import logo from '@/assets/img/logo.svg';
import FormBase from '../general/FormBase.vue';
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const props = defineProps({
  title: String,
  subTitle: String,
  hasCategory: Boolean
});

const name = ref('');
const amount = ref(0);
const recurrent = ref(false);
const category = ref('');

const errors = ref({
  name: '',
  amount: '',
  category: ''
})

const validateName = () => {
  if (name.value.trim().length < 3) {
    errors.value.name = 'La description doit contenir au moins 3 caractères';
  } else {
    errors.value.name = '';
  }
}

const validateCategory = () => {
  if (category.value.trim().length < 3) {
    errors.value.category = 'La catégorie doit contenir au moins 3 caractères';
  } else {
    errors.value.category = '';
  }
}

const validateAmount = () => {
  if (amount.value <= 0) {
    errors.value.amount = 'Le montant doit être supérieur à 0';
  } else {
    errors.value.amount = '';
  }
}

const validateForm = () => {
  let valide = true;

  validateName();
  validateAmount();

  if (errors.value.name || errors.value.amount) {
    valide = false;
  }

  if(valide) {
    emit('submit', {
      name: name.value,
      amount: amount.value,
      recurrent: recurrent.value,
      category: category.value
    });
  }
}

</script>

<template>
  <FormBase :title="title" :subTitle="subTitle" :handleSubmit="validateForm">
    <div class="flex flex-col gap-2 items-center">
      <label for="income-name">Description</label>
      <input type="text" class="border border-slate-400 rounded-sm" name="description" v-model="name" @input="validateName" />
      <span class="text-xs text-accent2">{{ errors.name }}</span>
    </div>

    <div v-if="hasCategory" class="flex flex-col gap-2 items-center">
      <label for="income-name">Categorie</label>
      <input type="text" class="border border-slate-400 rounded-sm" name="category" v-model="category" @input="validateCategory" />
      <span class="text-xs text-accent2">{{ errors.category }}</span>
    </div>

    <div class="flex flex-col gap-2 items-center">
      <label for="income-name">$/mois</label>
      <input type="number" step="0.01" min="0" class="border border-slate-400 rounded-sm" name="amount" v-model="amount" @input="validateAmount" />
      <span class="text-xs text-accent2">{{ errors.amount }}</span>
    </div>

    <div class="flex gap-2 mx-auto">
      <label for="income-name">Recurrent</label>
      <input type="checkbox" v-model="recurrent" />
    </div>
  </FormBase>
</template>

<style></style>