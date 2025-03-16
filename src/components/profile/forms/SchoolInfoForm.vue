<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h2 class="text-xl font-main font-semibold text-white ml-4">{{ title }}</h2>
      
      <!-- Rectangle SVG avec couleur d'accent -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b">
        <rect width="36" height="75" class="rectangle-fill-hovered" />
      </svg>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4 px-4">
        <!-- Nom de l'établissement et domaine d'études -->
        <div class="grid grid-cols-1 gap-x-4 gap-y-2 mb-6">
          <!-- Nom de l'établissement -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg">
            <label for="schoolName" class="block text-sm font-medium text-gray mb-2">
              Nom de l'établissement
            </label>
            <input 
              type="text" 
              id="schoolName" 
              v-model="formData.schoolName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.schoolName.$error }"
            />
            <div v-if="v$.schoolName.$error" class="text-accent2 text-sm mt-1">
              {{ v$.schoolName.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Domaine d'études -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg">
            <label for="fieldOfStudy" class="block text-sm font-medium text-gray mb-2">
              Domaine d'études
            </label>
            <input 
              type="text" 
              id="fieldOfStudy" 
              v-model="formData.fieldOfStudy"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.fieldOfStudy.$error }"
            />
            <div v-if="v$.fieldOfStudy.$error" class="text-accent2 text-sm mt-1">
              {{ v$.fieldOfStudy.$errors[0].$message }}
            </div>
          </div>
        </div>
        
        <!-- Dates du programme -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <!-- Date de début -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg">
            <label for="startDate" class="block text-sm font-medium text-gray mb-2">
              Début du programme
            </label>
            <input 
              type="date" 
              id="startDate" 
              v-model="formData.startDate"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.startDate.$error }"
            />
            <div v-if="v$.startDate.$error" class="text-accent2 text-sm mt-1">
              {{ v$.startDate.$errors[0].$message }}
            </div>
          </div>
          
          <!-- Date de fin prévue -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg">
            <label for="projectedEndDate" class="block text-sm font-medium text-gray mb-2">
              Fin prévue du programme
            </label>
            <input 
              type="date" 
              id="projectedEndDate" 
              v-model="formData.projectedEndDate"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.projectedEndDate.$error || endDateError }"
            />
            <div v-if="v$.projectedEndDate.$error" class="text-accent2 text-sm">
              {{ v$.projectedEndDate.$errors[0].$message }}
            </div>
            <div v-if="endDateError" class="text-accent2 text-sm">
              La date de fin ne peut pas être antérieure à la date de début
            </div>
          </div>
        </div>
      
      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4 mt-8">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-8 py-3 border bg-white border-accent2 text-accent2 rounded-md hover:bg-accent2 hover:text-white transition-colors">
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 border border-accent1 bg-white text-accent1 rounded-md hover:bg-accent1 hover:text-white transition-colors">
          Enregistrer
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
  schoolData: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: 'Modifier vos informations scolaires'
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
    
    // Convertir les dates au format YYYY-MM-DD
    if (props.schoolData.startDate) {
      const startDate = new Date(props.schoolData.startDate);
      const startYear = startDate.getFullYear();
      const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      const startDay = String(startDate.getDate()).padStart(2, '0');
      formData.startDate = `${startYear}-${startMonth}-${startDay}`;
    } else {
      formData.startDate = '';
    }
    
    if (props.schoolData.projectedEndDate) {
      const endDate = new Date(props.schoolData.projectedEndDate);
      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endDay = String(endDate.getDate()).padStart(2, '0');
      formData.projectedEndDate = `${endYear}-${endMonth}-${endDay}`;
    } else {
      formData.projectedEndDate = '';
    }
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

<style scoped>
.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}
</style> 