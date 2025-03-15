<script setup>
import { ref, watch, onMounted } from 'vue';
import { 
  useFormValidation, 
} from '@/utils/formValidation';
import { showSuccess, showError } from '@/utils/toast';

// configuration et propriétés
const props = defineProps({
  title: String,        // Titre du formulaire
  formFields: Array,    // Champs du formulaire
  formData: Object,     // Données initiales
  formType: String      // Type de formulaire (personnalInfo, addressInfo, etc.)
});
const emit = defineEmits(['close', 'save']);
// État réactif
const localFormData = ref({});
const formTypeRef = ref(props.formType);
// États UI
const isSubmitted = ref(false);
// Visibilité des champs de mot de passe
const passwordVisibility = ref({});
// Suivi de la correspondance des mots de passe (pour le changement de mot de passe)
const passwordsMatch = ref(true);
const shouldCheckPasswordMatch = ref(false);
// Utilisation de notre hook personnalisé pour la validation
const { 
  v$, 
  validateForm, 
  resetValidation, 
  hasError, 
  getErrorMessage,
  onPasswordFieldChange 
} = useFormValidation(formTypeRef, localFormData);
// Initialisation et chargement des données
function loadFormData() {
  if (props.formData) {
    console.log("🔄 Chargement des données du formulaire:", props.formData);
    resetValidation();
    
    const dataToUse = props.formData.value !== undefined ? props.formData.value : props.formData;
    
    // Créer une copie profonde pour éviter les problèmes de référence
    const newData = JSON.parse(JSON.stringify(dataToUse));
    
    // Traiter les données d'adresse si elles existent
    if (props.formType === 'personnalInfo' && newData.address) {
      console.log("📍 Chargement des données d'adresse:", newData.address);
      
      // Définir le type d'adresse
      newData.addressType = newData.address.type || 'PERSONAL';
      selectedAddressType.value = newData.addressType;
      
      // Copier les champs d'adresse dans les champs du formulaire
      newData.streetNumber = newData.address.streetNumber || '';
      newData.streetName = newData.address.streetName || '';
      newData.city = newData.address.city || '';
      newData.province = newData.address.province || '';
      newData.country = newData.address.country || 'CA';
      
      // Supprimer l'objet address pour éviter la duplication
      delete newData.address;
    } else if (props.formType === 'personnalInfo') {
      // Initialiser avec des valeurs par défaut si aucune adresse n'existe
      newData.addressType = 'PERSONAL';
      newData.streetNumber = '';
      newData.streetName = '';
      newData.city = '';
      newData.province = '';
      newData.country = 'CA';
    }
    
    console.log("📋 Nouvelle copie des données:", newData);
    localFormData.value = newData;
  }
}
// Initialisation au montage du composant
onMounted(() => {
  console.log("🚀 Composant ProfileForm monté. Type:", props.formType);
  loadFormData();
});
// Observer les changements dans les champs du formulaire
watch(() => props.formFields, (newFields) => {
  if (newFields) {
    newFields.forEach(field => {
      if (field.type === 'password') {
        passwordVisibility.value[field.key] = false;
      }
    });
  }
}, { immediate: true });
// Observer les changements de type de formulaire
watch(() => props.formType, (newType) => {
  console.log("📝 Changement de type de formulaire:", newType);
  formTypeRef.value = newType;
  
  if (newType && props.formData) {
    loadFormData();
  }
});
// Observer les changements de données pour s'assurer que les valeurs par défaut sont définies
watch([() => props.formFields, () => localFormData.value], ([fields, data]) => {
  if (fields && fields.length > 0 && data) {
    fields.forEach(field => {
      if (data[field.key] === undefined) {
        data[field.key] = field.defaultValue || '';
      }
    });
  }
}, { immediate: true, deep: true });
// Observer les changements de données externes
watch(() => props.formData, (newVal) => {
  console.log("➡️ Données reçues du parent (changement):", newVal);
  loadFormData();
}, { immediate: true });
// Gestion du changement des champs de mot de passe
function handlePasswordInput(key, event) {
  localFormData.value[key] = event.target.value;
  onPasswordFieldChange(key, event.target.value);
}
// Basculer la visibilité d'un champ de mot de passe spécifique
function togglePasswordVisibility(key) {
  console.log("👁️ Changement de visibilité du mot de passe pour:", key);
  Object.keys(passwordVisibility.value).forEach(fieldKey => {
    passwordVisibility.value[fieldKey] = false;
  });
  
  passwordVisibility.value[key] = true;
}
// Basculer la visibilité de tous les champs de mot de passe
function toggleAllPasswordsVisibility() {
  const isAnyVisible = Object.values(passwordVisibility.value).some(value => value === true);
  
  const newState = !isAnyVisible;
  console.log("👁️ Changement de visibilité pour tous les mots de passe:", newState);
  
  for (const key in passwordVisibility.value) {
    passwordVisibility.value[key] = newState;
  }
}
// Classe CSS pour l'indicateur de correspondance des mots de passe
function getPasswordMatchClass(fieldKey) {
  if (props.formType !== 'changePassword' || fieldKey !== 'confirmPassword' || 
      !shouldCheckPasswordMatch.value || !localFormData.value.confirmPassword) {
    return '';
  }
  
  return passwordsMatch.value ? 'border-green-500' : 'border-red-500';
}

// ========================================
// 8. ACTIONS DU FORMULAIRE
// ========================================

// Fermer le formulaire
function closeForm() {
  emit('close');
}

// Ajouter après les déclarations d'état existantes
const selectedAddressType = ref('PERSONAL'); // Valeur par défaut: Personnel

// Surveiller les changements de type d'adresse
watch(() => localFormData.value.addressType, (newType) => {
  if (newType) {
    console.log("📍 Type d'adresse sélectionné:", newType);
    selectedAddressType.value = newType;
  }
}, { immediate: true });

// Fonction pour préparer les données avant l'envoi
function prepareDataForSubmission() {
  const formattedData = { ...localFormData.value };
  
  // Si nous sommes dans le formulaire d'informations personnelles avec adresse
  if (props.formType === 'personnalInfo' && formattedData.addressType) {
    console.log("🔄 Préparation des données d'adresse pour la soumission");
    
    // Créer un objet d'adresse distincte
    const addressData = {
      streetNumber: formattedData.streetNumber,
      streetName: formattedData.streetName,
      city: formattedData.city,
      province: formattedData.province,
      country: formattedData.country,
      type: formattedData.addressType
    };
    
    // Stocker l'adresse dans une propriété séparée et nettoyer les champs individuels
    formattedData.address = addressData;
    
    // Supprimer les champs d'adresse individuels de l'objet principal
    delete formattedData.streetNumber;
    delete formattedData.streetName;
    delete formattedData.city;
    delete formattedData.province;
    delete formattedData.country;
    delete formattedData.addressType;
  }
  
  return formattedData;
}

// Modifier la fonction handleSave pour utiliser prepareDataForSubmission
async function handleSave() {
  const isValid = await validateForm();
  
  if (!isValid) {
    showError('Veuillez corriger les erreurs dans le formulaire avant de continuer.', {
      timeout: 8000,
      closeOnClick: false
    });
    return;
  }
  
  // Préparer les données avant l'envoi
  const formattedData = prepareDataForSubmission();
  
  // Sauvegarde des données
  emit('save', formattedData);
  
  // Message de succès adapté au type de formulaire
  if (props.formType === 'deleteProfile') {
    showSuccess('Votre profil a été supprimé avec succès.', {
      position: 'bottom-right',
      timeout: 3000
    });
  } else {
    showSuccess('Vos modifications ont été enregistrées avec succès.', {
      position: 'bottom-right',
      timeout: 3000
    });
  }
}

// ========================================
// 9. UTILITAIRES UI
// ========================================

// Obtenir le type de champ (pour gérer l'affichage des mots de passe)
function getFieldType(field) {
  if (field.type === 'password') {
    return passwordVisibility.value[field.key] ? 'text' : 'password';
  }
  return field.type || 'text';
}

// Obtenir les classes de grille pour le formulaire d'informations personnelles
function getGridPersonnalInfo(formType) {
  if (formType === 'personnalInfo' && window.innerWidth > 768) {
    return 'md:grid-cols-2 grid-cols-1';
  }
  return 'grid-cols-1';
}

// Obtenir la classe pour l'icône de visibilité du mot de passe
function getEyeIconClass(key) {
  return passwordVisibility.value[key] ? 'text-accent1 hover:text-accent1' : 'text-accent2 hover:text-accent2';
}

// Formater les dates pour l'affichage dans les champs de type date
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
    
    <div :class="[
      getGridPersonnalInfo(formType),
      'px-6 w-full grid'
    ]">
      <!-- Champs cachés - ils n'apparaissent pas dans l'UI mais conservent leur valeur -->
      <input 
        v-for="field in formFields.filter(f => f.type === 'hidden')" 
        :key="field.key" 
        type="hidden" 
        v-model="localFormData[field.key]"
      >
      
      <!-- Champs visibles -->
      <div 
        v-for="field in formFields.filter(f => f.type !== 'hidden')" 
        :key="field.key" 
        :class="[
          'py-1 px-2',
          { 'md:col-span-2': field.type === 'separator' }
        ]"
      >
        <!-- Séparateur pour la section adresse -->
        <div v-if="field.type === 'separator'" class="my-4 w-full">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-700 border-b-2 border-accent1 pb-2 flex-grow">{{ field.label }}</h3>
            
            <!-- Sélecteur de type d'adresse intégré dans le séparateur -->
            <div v-if="field.key === 'addressSeparator' && formType === 'personnalInfo'" class="ml-4 w-48">
              <select 
                v-model="localFormData.addressType"
                class="border p-2 rounded-md w-full focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none border-accent1"
              >
                <option value="PERSONAL">Personnel</option>
                <option value="WORK">Travail</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Champs normaux -->
        <div v-else class="rounded-lg bg-white p-4 flex items-center flex-col sm:flex-row w-full">
          <label class="block font-medium sm:w-1/3 mb-2 sm:mb-0">{{ field.label }}</label>
          <div class="relative w-full sm:w-2/3">
            
            <!-- Zone de messages -->
            <div class="mb-2 min-h-[24px]">
              <!-- Message d'erreur standard -->
              <div v-if="hasError(field.key)" class="text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <small>{{ getErrorMessage(field.key) }}</small>
              </div>
              
              <!-- Message de correspondance des mots de passe -->
              <div v-if="props.formType === 'changePassword' && field.key === 'confirmPassword' && shouldCheckPasswordMatch && localFormData.confirmPassword" 
                  :class="passwordsMatch ? 'text-green-500' : 'text-red-500'" 
                  class="flex items-center">
                <svg v-if="passwordsMatch" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <small v-if="passwordsMatch">Les mots de passe correspondent</small>
                <small v-else>Les mots de passe ne correspondent pas</small>
              </div>
              
              <!-- Message spécifique pour la suppression du profil -->
              <div v-if="props.formType === 'deleteProfile' && field.key === 'confirmation'" class="text-red-500">
                <small class="font-semibold">⚠️ Cette action est irréversible</small>
              </div>
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
                ? handlePasswordInput(field.key, e) 
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
      
      <!-- Bouton d'action principal avec style adapté au contexte -->
      <button 
        @click="handleSave" 
        :class="{
          'bg-white text-gray border-accent1 hover:bg-accent1': props.formType !== 'deleteProfile',
          'bg-red-500 text-white border-red-500 hover:bg-red-700': props.formType === 'deleteProfile'
        }"
        class="px-6 py-3 border-2 rounded-md transition-colors duration-200 flex items-center">
        
        <!-- Icône d'avertissement pour la suppression -->
        <svg v-if="props.formType === 'deleteProfile'" 
             xmlns="http://www.w3.org/2000/svg" 
             class="h-5 w-5 mr-2" 
             viewBox="0 0 20 20" 
             fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        
        {{ props.formType === 'deleteProfile' ? 'Supprimer définitivement' : 'Enregistrer' }}
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

/* Style pour les champs d'adresse */
.address-field .rounded-lg {
  border-left: 3px solid var(--accent1, #00EC86);
  background-color: rgba(0, 236, 134, 0.03);
}

/* Style pour le sélecteur dans le séparateur */
.flex-grow {
  flex-grow: 1;
}

/* Style pour la bordure du séparateur qui s'étend sur toute la largeur disponible */
.flex-grow.border-b-2 {
  min-width: 150px;
  margin-right: 10px;
}

/* Style pour le séparateur afin qu'il occupe toute la largeur */
@media (min-width: 768px) {
  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}
</style>