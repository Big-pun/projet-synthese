<script setup>
/**
 * Composant ProfileForm - Formulaire générique pour différents types de modals
 * Ce composant gère différents types de formulaires (infos personnelles, bancaires, suppression de profil, etc.)
 */

// -------------------- IMPORTS --------------------
import { defineEmits, ref, watch, onMounted } from 'vue';

// -------------------- PROPS ET ÉMISSIONS --------------------
/**
 * Props du composant
 * @param {String} title - Titre du modal
 * @param {Boolean} isOpen - État d'ouverture du modal
 * @param {Array} formFields - Champs du formulaire (label, key, type, etc.)
 * @param {Object} formData - Données initiales du formulaire
 * @param {String} modalType - Type de modal (personnalInfo, bankingInfo, etc.)
 */
const props = defineProps({
  title: String,
  isOpen: Boolean,
  formFields: Array,
  formData: Object,
  modalType: String
});

// Émissions d'événements
const emit = defineEmits(['update:isOpen', 'save']);

// -------------------- ÉTAT LOCAL --------------------
// Données du formulaire
const localFormData = ref({});
// État de visibilité des mots de passe
const passwordVisibility = ref({});
// Erreurs de validation
const errors = ref({});

// -------------------- CYCLE DE VIE ET HOOKS --------------------
// Chargement initial des données
onMounted(() => {
  loadFormData();
});

// -------------------- WATCHERS --------------------
// Mise à jour des données locales depuis les props
watch(() => props.formData, (newVal) => {
  if (newVal) {
    // Vérifier si les données sont encapsulées dans une propriété value
    const dataToUse = newVal.value !== undefined ? newVal.value : newVal;
    
    // Créer un nouvel objet réactif
    const newData = {};
    // Copier toutes les propriétés de dataToUse dans newData
    Object.keys(dataToUse).forEach(key => {
      newData[key] = dataToUse[key];
    });
    // Assigner le nouvel objet à localFormData.value
    localFormData.value = newData;
  } else {
    localFormData.value = {}; // Initialiser avec un objet vide si nécessaire
  }
}, { immediate: true, deep: true });

// Initialisation de la visibilité des mots de passe
watch(() => props.formFields, (newFields) => {
  if (newFields) {
    newFields.forEach(field => {
      if (field.type === 'password') {
        passwordVisibility.value[field.key] = false;
      }
    });
  }
}, { immediate: true });

// Réinitialisation des erreurs lors du changement de type de modal
watch(() => props.modalType, () => {
  errors.value = {};
}, { immediate: true });

// Mise à jour des données lors de l'ouverture du modal
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loadFormData();
  }
}, { immediate: true });

// Initialisation des champs manquants
watch([() => props.formFields, () => localFormData.value], ([fields, data]) => {
  if (fields && fields.length > 0 && data) {
    fields.forEach(field => {
      if (data[field.key] === undefined) {
        data[field.key] = field.defaultValue || '';
      }
    });
  }
}, { immediate: true, deep: true });

// -------------------- FONCTIONS D'AIDE (HELPERS) --------------------
/**
 * Charge les données du formulaire depuis les props
 * Gère les données encapsulées dans une propriété value (cas des refs)
 */
function loadFormData() {
  if (props.formData) {
    const dataToUse = props.formData.value !== undefined ? props.formData.value : props.formData;
    // Créer un nouvel objet pour éviter les problèmes de réactivité
    const newData = { ...dataToUse };
    localFormData.value = newData;
  }
}

/**
 * Détermine le type de champ en fonction de la visibilité des mots de passe
 * @param {Object} field - Champ de formulaire
 * @returns {String} Type de champ à utiliser
 */
function getFieldType(field) {
  if (field.type === 'password') {
    return passwordVisibility.value[field.key] ? 'text' : 'password';
  }
  return field.type || 'text';
}

/**
 * Détermine la classe de grille en fonction du type de modal
 * @param {String} modalType - Type de modal
 * @returns {String} Classe CSS pour la grille
 */
function getGridPersonnalInfo(modalType) {
  if (modalType === 'personnalInfo' && window.innerWidth > 768) {
    return 'grid md:grid-cols-2 grid-cols-1';
  }
  return 'grid grid-cols-1';
}

/**
 * Obtient la classe CSS pour l'icône d'œil en fonction de la visibilité
 * @param {String} key - Clé du champ
 * @returns {String} Classe CSS pour l'icône
 */
function getEyeIconClass(key) {
  return passwordVisibility.value[key] ? 'text-accent1 hover:text-accent1' : 'text-accent2 hover:text-accent2';
}

// -------------------- VALIDATION --------------------
/**
 * Valide les données du formulaire en fonction du type de modal
 * @param {Object} data - Données du formulaire
 * @param {String} modalType - Type de modal
 * @returns {Object} Erreurs de validation
 */
function validateForm(data, modalType) {
  const errors = {};

  if (!data) {
    return { general: "Les données du formulaire sont manquantes." };
  }

  switch (modalType) {
    case 'personnalInfo':
      if (!data.prenom) {
        errors.prenom = "Le prénom est requis.";
      }
      if (!data.nom) {
        errors.nom = "Le nom est requis.";
      }
      if (!data.dateNaissance) {
        errors.dateNaissance = "La date de naissance est requise.";
      }
      if (!data.telephone) {
        errors.telephone = "Le téléphone est requis.";
      }
      if (!data.courriel || !/\S+@\S+\.\S+/.test(data.courriel)) {
        errors.courriel = "Un courriel valide est requis.";
      }
      if (!data.adressePersonnelle) {
        errors.adressePersonnelle = "L'adresse personnelle est requise.";
      }
      if (!data.adresseTravail) {
        errors.adresseTravail = "L'adresse au travail est requise.";
      }
      break;

    case 'schoolInfo':
      if (!data.nom) {
        errors.nom = "Le nom de l'établissement est requis.";
      }
      if (!data.domaine) {
        errors.domaine = "Le domaine d'études est requis.";
      }
      if (!data.debutProgramme) {
        errors.debutProgramme = "La date de début du programme est requise.";
      }
      if (!data.finProgramme) {
        errors.finProgramme = "La date de fin du programme est requise.";
      }
      break;

    case 'bankingInfo':
      if (!data.institution) {
        errors.institution = "L'institution bancaire est requise.";
      }
      if (!data.numeroCarte) {
        errors.numeroCarte = "Le numéro de carte est requis.";
      }
      if (!data.dateExpiration) {
        errors.dateExpiration = "La date d'expiration est requise.";
      }
      if (!data.codeSecurite) {
        errors.codeSecurite = "Le code de sécurité est requis.";
      }
      break;

    case 'changePassword':
      if (!data.currentPassword) {
        errors.currentPassword = "Le mot de passe actuel est requis.";
      }
      if (!data.newPassword) {
        errors.newPassword = "Le nouveau mot de passe est requis.";
      }
      if (data.newPassword !== data.confirmPassword) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas.";
      }
      break;

    case 'deleteProfile':
      if (data.confirmation !== 'SUPPRIMER') {
        errors.confirmation = 'Veuillez taper "SUPPRIMER" pour confirmer.';
      }
      if (!data.password) {
        errors.password = "Le mot de passe est requis.";
      }
      break;

    // Ajoutez d'autres cas si nécessaire
  }

  return errors;
}

// -------------------- ACTIONS UTILISATEUR --------------------
/**
 * Ferme le modal
 */
function closeModal() {
  emit('update:isOpen', false);
}

/**
 * Sauvegarde les données du formulaire après validation
 */
function handleSave() {
  errors.value = validateForm(localFormData.value, props.modalType);
  
  if (Object.keys(errors.value).length > 0) {
    return; // Ne pas continuer si des erreurs existent
  }

  emit('save', localFormData.value);
  closeModal();
}

/**
 * Bascule la visibilité d'un champ de mot de passe
 * @param {String} key - Clé du champ
 */
function togglePasswordVisibility(key) {
  passwordVisibility.value[key] = !passwordVisibility.value[key];
}

/**
 * Bascule la visibilité de tous les mots de passe
 */
function toggleAllPasswordsVisibility() {
  for (const key in passwordVisibility.value) {
    passwordVisibility.value[key] = !passwordVisibility.value[key];
  }
}
</script>

<template>
  <div v-if="isOpen" 
       class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-roboto">
    <div class="bg-light-gray max-h-screen overflow-y-auto  max-w-screen-lg rounded-lg shadow-xl mx-4 transition-all duration-200">
      <!-- En-tête du modal avec style cohérent -->
      <div class="flex items-center justify-between p-3 rounded-t-lg bg-gray relative">
        <h3 class="text-white ml-8">{{ title }}</h3>
        
        <!-- Rectangle coloré à droite comme dans les autres composants -->
        <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="absolute right-5 top-0 rounded-b transition-colors duration-200">
          <rect width="36" height="75" fill="#00EC86"/>
        </svg>
      </div>
      
      <!-- Bouton pour basculer la visibilité de tous les mots de passe -->
      <div class="flex justify-end p-4">
        <button 
          v-if="modalType === 'changePassword' || modalType === 'deleteProfile'"
          @click="toggleAllPasswordsVisibility"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
          mots de passe
        </button>
      </div>
      
      <!-- Corps du formulaire -->
      <div :class="getGridPersonnalInfo(modalType)" class="px-6 w-full">
        <div v-for="field in formFields" :key="field.key" class="py-1 px-2" >
          <div class="rounded-lg bg-white p-4 flex w-full items-center flex-col sm:flex-row gap-4">
            <label class="block font-medium w-full sm:w-1/3">{{ field.label }}</label>

            <!-- Affichage des erreurs -->
            <div class="relative w-full sm:w-2/3">
              <div v-if="errors[field.key]" class="text-red-500 mb-1">
                <small>{{ errors[field.key] }}</small>
              </div>
              <!-- Champ de saisie -->
              <input 
                v-model="localFormData[field.key]" 
                :type="getFieldType(field)" 
                :class="{
                  'border-accent2': errors[field.key],
                  'border-accent1': !errors[field.key] && localFormData[field.key]
                }"
                class="border p-2 rounded-md w-full focus:border-accent1 focus:ring-1 focus:ring-accent1 outline-none"
                :placeholder="field.placeholder || ''"
              >
              <!-- Icône d'œil pour les champs de mot de passe -->
              <button 
                v-if="field.type === 'password'" 
                type="button"
                @click="togglePasswordVisibility(field.key)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                :class="getEyeIconClass(field.key)"
              >
                <!-- Icône œil ouvert quand le mot de passe est visible -->
                <svg v-if="passwordVisibility[field.key]" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <!-- Icône œil barré quand le mot de passe est masqué -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pied du modal avec actions -->
      <div class="flex justify-end space-x-3 p-4 px-6">
        <button 
          @click="closeModal" 
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
  </div>
</template>

<style scoped>
/* Styles pour les boutons et les transitions */
</style>