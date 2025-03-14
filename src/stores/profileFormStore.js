import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getFormFields, getFormTitle } from '@/utils/formValidation';

/**
 * Store pour gérer l'état des formulaires de profil dans l'application
 * Centralise la gestion des types de formulaire et des données associées
 */
export const useProfileFormStore = defineStore('profileForm', () => {
  // Configuration du formulaire
  const formType = ref('');
  const formTitle = ref('');
  
  // Configuration du formulaire contenu dans le modal
  const formFields = ref([]);
  const formData = reactive({});
  
  /**
   * Sélectionne un type de formulaire spécifique et définit ses données
   * @param {string} type - Type de formulaire (ex: 'personnalInfo', 'bankingInfo')
   * @param {string} [title] - Titre personnalisé (facultatif, utilise le titre par défaut si non spécifié)
   * @param {Array} [fields] - Configuration personnalisée des champs (facultatif, utilise les champs par défaut si non spécifiés)
   * @param {Object} data - Données initiales du formulaire
   */
  function chooseForm(type, title, fields, data) {
    // Configure le type de formulaire
    formType.value = type;
    
    // Utilise le titre personnalisé ou le titre par défaut
    formTitle.value = title || getFormTitle(type);
    
    // Utilise les champs personnalisés ou les champs par défaut
    formFields.value = fields || getFormFields(type);
    
    // Initialise les données du formulaire
    formData.value = { ...data };
  }
  
  /**
   * Version simplifiée de chooseForm qui utilise les configurations par défaut
   * @param {string} type - Type de formulaire (ex: 'personnalInfo', 'bankingInfo')
   * @param {Object} data - Données initiales du formulaire
   */
  function setupForm(type, data) {
    chooseForm(type, getFormTitle(type), getFormFields(type), data);
  }
  
  /**
   * Réinitialise les données du formulaire
   */
  function resetForm() {
    formType.value = '';
    formTitle.value = '';
    formFields.value = [];
    Object.keys(formData).forEach(key => delete formData[key]);
  }
  
  return {
    formType,
    formTitle,
    formFields,
    formData,
    chooseForm,
    setupForm,
    resetForm
  };
}); 