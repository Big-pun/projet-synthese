<script setup>
import { defineEmits, ref, watch, onMounted, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { generateValidationRules } from '@/utils/formValidation';
import { showSuccess, showError } from '@/utils/toast';
import { showConfirm } from '@/utils/sweetAlert';

const props = defineProps({
  title: String,
  formFields: Array,
  formData: Object,
  formType: String
});

const emit = defineEmits(['close', 'save']);

const localFormData = ref({});
const passwordVisibility = ref({});
const isSubmitted = ref(false);
const passwordsMatch = ref(true);
const shouldCheckPasswordMatch = ref(false);

const validationRules = computed(() => {
  return generateValidationRules(props.formType, localFormData.value);
});

const v$ = useVuelidate(validationRules, localFormData);

watch(() => props.formFields, (newFields) => {
  if (newFields) {
    newFields.forEach(field => {
      if (field.type === 'password') {
        passwordVisibility.value[field.key] = false;
      }
    });
  }
}, { immediate: true });

watch(() => props.formType, (newType) => {
  console.log("📝 Changement de type de formulaire:", newType);
  isSubmitted.value = false;
  resetValidation();
  
  // Réinitialiser les états de correspondance des mots de passe
  passwordsMatch.value = true;
  shouldCheckPasswordMatch.value = false;
  
  // Réinitialisation des données locales si le type change
  if (newType && props.formData) {
    loadFormData();
  }
}, { immediate: true });

watch([() => props.formFields, () => localFormData.value], ([fields, data]) => {
  if (fields && fields.length > 0 && data) {
    fields.forEach(field => {
      if (data[field.key] === undefined) {
        data[field.key] = field.defaultValue || '';
      }
    });
  }
}, { immediate: true, deep: true });

function resetValidation() {
  if (v$.value.$reset) {
    console.log("🔄 Réinitialisation des validations");
    v$.value.$reset();
  }
}

function loadFormData() {
  if (props.formData) {
    console.log("🔄 Chargement des données du formulaire:", props.formData);
    resetValidation();
    
    const dataToUse = props.formData.value !== undefined ? props.formData.value : props.formData;
    
    const newData = JSON.parse(JSON.stringify(dataToUse));
    console.log("📋 Nouvelle copie des données:", newData);
    
    localFormData.value = newData;
  }
}

onMounted(() => {
  console.log("🚀 Composant ProfileForm monté. Type:", props.formType);
  loadFormData();
});

watch(() => props.formData, (newVal) => {
  console.log("➡️ Données reçues du parent (changement):", newVal);
  loadFormData();
}, { immediate: true });

watch(() => localFormData.value, (newVal) => {
  console.log("🔄 localFormData mise à jour:", newVal);
}, { deep: true, immediate: true });

watch(() => validationRules.value, (rules) => {
  console.log("📏 Règles de validation:", rules);
}, { immediate: true });

function getFieldType(field) {
  if (field.type === 'password') {
    return passwordVisibility.value[field.key] ? 'text' : 'password';
  }
  return field.type || 'text';
}

function getGridPersonnalInfo(formType) {
  if (formType === 'personnalInfo' && window.innerWidth > 768) {
    return 'grid md:grid-cols-2 grid-cols-1';
  }
  return 'grid grid-cols-1';
}

function getEyeIconClass(key) {
  return passwordVisibility.value[key] ? 'text-accent1 hover:text-accent1' : 'text-accent2 hover:text-accent2';
}

function closeForm() {
  emit('close');
}

async function handleSave() {
  isSubmitted.value = true;
  console.log("🔍 Tentative de validation avec données:", localFormData.value);
  
  // Première étape : vérifier si tous les champs requis sont remplis
  const isValid = await v$.value.$validate();
  console.log("✅ Résultat de validation de base:", isValid, "Erreurs:", v$.value.$errors);
  
  if (!isValid) {
    v$.value.$errors.forEach(error => {
      console.error(`❌ Erreur dans le champ ${error.$property}:`, error.$message);
    });
    
    showError('Veuillez corriger les erreurs dans le formulaire avant de continuer.', {
      timeout: 8000,
      closeOnClick: false
    });
    return;
  }
  
  // Deuxième étape : vérification spécifique pour les mots de passe
  if (props.formType === 'changePassword') {
    console.log("🔐 Vérification finale des mots de passe avant soumission");
    console.log("   - Nouveau mot de passe:", localFormData.value.newPassword);
    console.log("   - Confirmation:", localFormData.value.confirmPassword);
    
    const passwordsMatch = localFormData.value.newPassword === localFormData.value.confirmPassword;
    console.log("   - Correspondent:", passwordsMatch);
    
    if (!passwordsMatch) {
      console.error("❌ Les mots de passe ne correspondent pas lors de la vérification finale");
      showError('Les mots de passe ne correspondent pas.', {
        timeout: 8000,
        closeOnClick: false
      });
      return;
    }
  }
  
  // Troisième étape : confirmation pour la suppression du profil
  if (props.formType === 'deleteProfile') {
    const result = await showConfirm(
      'Confirmation de suppression',
      'Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.',
      'Oui, supprimer',
      'Annuler'
    );
    
    if (!result.isConfirmed) {
      return;
    }
  }

  // Quatrième étape : sauvegarde des données
  emit('save', localFormData.value);
  
  showSuccess('Vos modifications ont été enregistrées avec succès.', {
    position: 'bottom-right',
    timeout: 3000
  });
}

function togglePasswordVisibility(key) {
  console.log("👁️ Changement de visibilité du mot de passe pour:", key);
  Object.keys(passwordVisibility.value).forEach(fieldKey => {
    passwordVisibility.value[fieldKey] = false;
  });
  
  passwordVisibility.value[key] = true;
}

function toggleAllPasswordsVisibility() {
  const isAnyVisible = Object.values(passwordVisibility.value).some(value => value === true);
  
  const newState = !isAnyVisible;
  console.log("👁️ Changement de visibilité pour tous les mots de passe:", newState);
  
  for (const key in passwordVisibility.value) {
    passwordVisibility.value[key] = newState;
  }
  
  // Si nous sommes dans le formulaire de changement de mot de passe,
  // réinitialisons les validations liées aux mots de passe
  if (props.formType === 'changePassword' && isSubmitted.value) {
    console.log("🔄 Réinitialisation des validations de mot de passe après changement de visibilité");
    
    // Réinitialiser uniquement les validations des champs de mot de passe
    if (v$.value.newPassword) v$.value.newPassword.$reset();
    if (v$.value.confirmPassword) v$.value.confirmPassword.$reset();
    
    // Pour éviter les messages d'erreur qui pourraient perturber l'utilisateur
    isSubmitted.value = false;
  }
}

function hasError(fieldName) {
  return isSubmitted.value && v$.value[fieldName] && v$.value[fieldName].$error;
}

function getErrorMessage(fieldName) {
  if (!v$.value[fieldName]) return '';
  
  const errors = v$.value[fieldName].$errors;
  return errors.length > 0 ? errors[0].$message : '';
}

function formatDateForInput(date) {
  if (!date) return '';
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) return '';
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return '';
  }
}

function onPasswordFieldChange(key, event) {
  console.log(`🔑 Champ de mot de passe '${key}' modifié:`, event.target.value);
  localFormData.value[key] = event.target.value;
  
  // Vérifier la correspondance des mots de passe pour le formulaire de changement de mot de passe
  if (props.formType === 'changePassword' && 
      (key === 'newPassword' || key === 'confirmPassword')) {
    
    // Activer la vérification seulement après que l'utilisateur a commencé à remplir 
    // le champ de confirmation
    if (key === 'confirmPassword' && event.target.value.length > 0) {
      shouldCheckPasswordMatch.value = true;
    }
    
    // Si les deux champs sont remplis, vérifier la correspondance
    if (localFormData.value.newPassword && localFormData.value.confirmPassword) {
      console.log("🔄 Vérification immédiate des mots de passe");
      console.log("   - Nouveau mot de passe:", localFormData.value.newPassword);
      console.log("   - Confirmation:", localFormData.value.confirmPassword);
      
      passwordsMatch.value = localFormData.value.newPassword === localFormData.value.confirmPassword;
      console.log("   - Correspondent:", passwordsMatch.value);
    }
  }
}

function getPasswordMatchClass(fieldKey) {
  if (props.formType !== 'changePassword' || fieldKey !== 'confirmPassword' || 
      !shouldCheckPasswordMatch.value || !localFormData.value.confirmPassword) {
    return '';
  }
  
  return passwordsMatch.value ? 'border-green-500' : 'border-red-500';
}
</script>

<template>
  <div class="form-container font-roboto">
    <div class="flex items-center justify-between p-3 rounded-t-lg bg-gray relative max-w-full">
      <h3 class="text-white ml-8">{{ title }}</h3>
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
           class="absolute right-5 top-0 rounded-b transition-colors duration-200">
        <rect width="36" height="75" fill="#00EC86"/>
      </svg>
    </div>
    
    <div class="flex justify-end p-4">
      <button 
        v-if="formFields && formFields.some(field => field.type === 'password')"
        @click="toggleAllPasswordsVisibility"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
        mots de passe
      </button>
    </div>
    
    <div :class="getGridPersonnalInfo(formType)" class="px-6 w-full">
      <!-- Champs cachés - ils n'apparaissent pas dans l'UI mais conservent leur valeur -->
      <input 
        v-for="field in formFields.filter(f => f.type === 'hidden')" 
        :key="field.key" 
        type="hidden" 
        v-model="localFormData[field.key]"
      >
      
      <!-- Champs visibles -->
      <div v-for="field in formFields.filter(f => f.type !== 'hidden')" :key="field.key" class="py-1 px-2" >
        <div class="rounded-lg bg-white p-4 flex items-center flex-col sm:flex-row w-full">
          <label class="block font-medium sm:w-1/3 mb-2 sm:mb-0">{{ field.label }}</label>
          <div class="relative w-full sm:w-2/3">
            <!-- Message d'erreur standard -->
            <div v-if="hasError(field.key)" class="text-red-500 mb-1">
              <small>{{ getErrorMessage(field.key) }}</small>
            </div>
            
            <!-- Message de correspondance des mots de passe -->
            <div v-if="props.formType === 'changePassword' && field.key === 'confirmPassword' && shouldCheckPasswordMatch && localFormData.confirmPassword" 
                 :class="passwordsMatch ? 'text-green-500' : 'text-red-500'" 
                 class="mb-1">
              <small v-if="passwordsMatch">✓ Les mots de passe correspondent</small>
              <small v-else>✗ Les mots de passe ne correspondent pas</small>
            </div>
            
            <!-- Champ select avec options -->
            <select 
              v-if="field.type === 'select' && field.options"
              v-model="localFormData[field.key]"
              :class="{
                'border-accent2': hasError(field.key),
                'border-accent1': !hasError(field.key) && localFormData[field.key]
              }"
              class="border p-2 rounded-md w-full focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none">
              <option value="" disabled>Sélectionnez une option</option>
              <option 
                v-for="option in field.options" 
                :key="option.value" 
                :value="option.value">
                {{ option.label }}
              </option>
            </select>

            
            <!-- Champs texte, password, email, etc. -->
            <input 
              v-else
              :value="field.type === 'date' ? formatDateForInput(localFormData[field.key]) : localFormData[field.key]"
              @input="e => field.type === 'password' 
                ? onPasswordFieldChange(field.key, e) 
                : (field.type === 'date' 
                    ? localFormData[field.key] = e.target.value 
                    : localFormData[field.key] = e.target.value)"
              :type="getFieldType(field)" 
              :class="{
                'border-accent2': hasError(field.key),
                'border-accent1': !hasError(field.key) && localFormData[field.key] && 
                                 !(props.formType === 'changePassword' && field.key === 'confirmPassword' && shouldCheckPasswordMatch),
                'border-green-500': props.formType === 'changePassword' && field.key === 'confirmPassword' && 
                                  shouldCheckPasswordMatch && passwordsMatch && localFormData.confirmPassword,
                'border-red-500': props.formType === 'changePassword' && field.key === 'confirmPassword' && 
                                shouldCheckPasswordMatch && !passwordsMatch && localFormData.confirmPassword
              }"
              class="border p-2 rounded-md w-full focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none"
              :placeholder="field.placeholder || ''"
            >
            <button 
              v-if="field.type === 'password'" 
              type="button"
              @click="togglePasswordVisibility(field.key)"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700 focus:outline-none transition-colors duration-200"
              :class="getEyeIconClass(field.key)"
            >
              <svg v-if="passwordVisibility[field.key]" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end space-x-3 p-4 px-6">
      <button 
        @click="closeForm" 
        class="px-6 py-3 text-gray rounded-md border-2 border-accent2 hover:bg-accent2 hover:text-white transition-colors duration-200">
        Annuler
      </button>
      <button 
        @click="handleSave" 
        class="px-6 py-3 bg-white text-gray border-2 border-accent1 rounded-md hover:bg-accent1 hover:text-white transition-colors duration-200">
        Enregistrer
      </button>
    </div>
  </div>
</template>

<style>
.form-container {
  width: 100%;
  background-color: var(--light-gray, #f5f5f5);
  border-radius: 0.5rem;
  max-height: 80vh;
  overflow-y: auto;
}

.responsive-margin {
  margin-right: clamp(1rem, 2vw, 3rem);
}

.rectangle-fill-default {
  fill: #F74949;
  transition: fill 0.2s ease;
}

.rectangle-fill-hovered {
  fill: #00EC86;
  transition: fill 0.2s ease;
}
</style>