<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nom de l'établissement -->
      <div class="mb-4">
        <label for="schoolName" class="block text-sm font-medium text-gray-700 mb-1">
          Nom de l'établissement
        </label>
        <input 
          type="text" 
          id="schoolName" 
          v-model="formData.schoolName"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.schoolName.$error }"
        />
        <div v-if="v$.schoolName.$error" class="text-red-500 text-sm mt-1">
          {{ v$.schoolName.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Domaine d'études -->
      <div class="mb-4">
        <label for="fieldOfStudy" class="block text-sm font-medium text-gray-700 mb-1">
          Domaine d'études
        </label>
        <input 
          type="text" 
          id="fieldOfStudy" 
          v-model="formData.fieldOfStudy"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.fieldOfStudy.$error }"
        />
        <div v-if="v$.fieldOfStudy.$error" class="text-red-500 text-sm mt-1">
          {{ v$.fieldOfStudy.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Date de début -->
      <div class="mb-4">
        <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
          Début du programme
        </label>
        <input 
          type="date" 
          id="startDate" 
          v-model="formData.startDate"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.startDate.$error }"
        />
        <div v-if="v$.startDate.$error" class="text-red-500 text-sm mt-1">
          {{ v$.startDate.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Date de fin prévue -->
      <div class="mb-4">
        <label for="projectedEndDate" class="block text-sm font-medium text-gray-700 mb-1">
          Fin prévue du programme
        </label>
        <input 
          type="date" 
          id="projectedEndDate" 
          v-model="formData.projectedEndDate"
          class="w-full px-3 py-2 border rounded-md"
          :class="{ 'border-red-500': v$.projectedEndDate.$error }"
        />
        <div v-if="v$.projectedEndDate.$error" class="text-red-500 text-sm mt-1">
          {{ v$.projectedEndDate.$errors[0].$message }}
        </div>
        <div v-if="endDateError" class="text-red-500 text-sm mt-1">
          La date de fin ne peut pas être antérieure à la date de début
        </div>
      </div>
      
      <!-- Boutons -->
      <div class="flex justify-end space-x-2 mt-6">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'En cours...' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const props = defineProps({
  title: {
    type: String,
    default: 'Éditer mes informations scolaires'
  },
  schoolData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['save', 'cancel']);

// État du formulaire
const formData = reactive({
  schoolName: '',
  fieldOfStudy: '',
  startDate: '',
  projectedEndDate: ''
});

const isSubmitting = ref(false);
const endDateError = ref(false);

// Charger les données initiales
function loadSchoolData() {
  if (props.schoolData) {
    formData.schoolName = props.schoolData.schoolName || '';
    formData.fieldOfStudy = props.schoolData.fieldOfStudy || '';
    formData.startDate = props.schoolData.startDate || '';
    formData.projectedEndDate = props.schoolData.projectedEndDate || '';
  }
}

// Règles de validation
const rules = computed(() => ({
  schoolName: { 
    required: helpers.withMessage('Le nom de l\'établissement est requis', required) 
  },
  fieldOfStudy: { 
    required: helpers.withMessage('Le domaine d\'études est requis', required) 
  },
  startDate: { 
    required: helpers.withMessage('La date de début du programme est requise', required) 
  },
  projectedEndDate: { 
    required: helpers.withMessage('La date de fin prévue du programme est requise', required) 
  }
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Charger les données initiales au montage
loadSchoolData();

// Surveiller les changements de schoolData pour recharger les données
watch(() => props.schoolData, () => {
  loadSchoolData();
}, { deep: true });

// Surveiller les dates pour la validation
watch([() => formData.startDate, () => formData.projectedEndDate], ([startDate, endDate]) => {
  if (startDate && endDate) {
    endDateError.value = new Date(endDate) < new Date(startDate);
  } else {
    endDateError.value = false;
  }
});

async function handleSubmit() {
  isSubmitting.value = true;
  
  // Valider le formulaire
  const isValid = await v$.value.$validate();
  
  if (!isValid || endDateError.value) {
    isSubmitting.value = false;
    return;
  }
  
  try {
    // Émettre l'événement save avec les données du formulaire
    emit('save', {
      schoolName: formData.schoolName,
      fieldOfStudy: formData.fieldOfStudy,
      startDate: formData.startDate,
      projectedEndDate: formData.projectedEndDate
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script> 