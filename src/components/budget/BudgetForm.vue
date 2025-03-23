<script setup>
import FormTemplate from '../general/FormTemplate.vue';
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const props = defineProps({
  title: String,
  subTitle: String,
  hasCategory: Boolean
});

// Form data
const name = ref('');
const amount = ref(0);
const frequency = ref(-1);
const category = ref('');

// Form errors
const errors = ref({
  name: '',
  amount: '',
  category: ''
})

// Form validations
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

// Form submission
const submitForm = () => {
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
      frequency: frequency.value,
      category: category.value
    });
  }
}

</script>

<template>
  <FormTemplate :title="title" :subTitle="subTitle" :handleSubmit="submitForm">

    <!-- Description Field -->
    <div class="flex flex-col gap-2 items-center">
      <label for="income-name">Description</label>
      <input type="text" class="border border-slate-400 rounded-sm" name="description" v-model="name" @input="validateName" />
      <span class="text-xs text-accent2">{{ errors.name }}</span>
    </div>

    <!-- Category Field (if table has a category column) -->
    <div v-if="hasCategory" class="flex flex-col gap-2 items-center">
      <label for="income-name">Categorie</label>
      <input type="text" class="border border-slate-400 rounded-sm" name="category" v-model="category" @input="validateCategory" />
      <span class="text-xs text-accent2">{{ errors.category }}</span>
    </div>

    <!-- $/month field -->
    <div class="flex flex-col gap-2 items-center">
      <label for="income-name">$/mois</label>
      <input type="number" step="0.01" min="0" class="border border-slate-400 rounded-sm" name="amount" v-model="amount" @input="validateAmount" />
      <span class="text-xs text-accent2">{{ errors.amount }}</span>
    </div>

    <!-- Recurrence Field -->
    <div class="flex flex-col gap-4 mx-auto">
        <!-- Toggle Switch -->
        <div class="flex flex-col items-center gap-2">
            <span>Recurrent</span>
            <label class="switch">
                <input
                type="checkbox"
                :checked="frequency !== -1"
                @change="frequency = frequency === -1 ? 30 : -1"
                />
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Frequency Select -->
        <select
            v-model="frequency"
            class="border border-gray-300 rounded-md p-1"
            :class="frequency !== -1 ? 'block' : 'hidden'"
        >
            <option :value="1">Quotidien</option>
            <option :value="7">Hebdomadaire</option>
            <option :value="14">Bihebdomadaire</option>
            <option :value="30">Mensuel</option>
            <option :value="-1">Non récurrent</option>
        </select>
    </div>
  </FormTemplate>
</template>

<style>
</style>