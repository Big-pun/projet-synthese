import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

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
   * @param {string} title - Titre affiché dans l'en-tête du formulaire
   * @param {Array} fields - Configuration des champs du formulaire
   * @param {Object} data - Données initiales du formulaire
   */
  function chooseForm(type, title, fields, data) {
    // Configure le formulaire
    formType.value = type;
    formTitle.value = title;
    formFields.value = fields;
    formData.value = { ...data };
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
    resetForm
  };
}); 