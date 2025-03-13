import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

/**
 * Store pour gérer l'état des modaux dans l'application
 * Centralise la gestion de l'ouverture/fermeture et des données des modaux
 */
export const useModalStore = defineStore('modal', () => {
  // État du modal
  const isModalOpen = ref(false);
  const modalType = ref('');
  const modalTitle = ref('');
  
  // Configuration du formulaire contenu dans le modal
  const formFields = ref([]);
  const formData = reactive({});
  
  /**
   * Ouvre un modal avec un formulaire spécifique
   * @param {string} type - Type de modal/formulaire (ex: 'personnalInfo', 'bankingInfo')
   * @param {string} title - Titre affiché dans l'en-tête du modal
   * @param {Array} fields - Configuration des champs du formulaire
   * @param {Object} data - Données initiales du formulaire
   */
  function openModal(type, title, fields, data) {
    modalType.value = type;
    modalTitle.value = title;
    formFields.value = fields;
    formData.value = { ...data };
    isModalOpen.value = true;
  }
  
  /**
   * Ferme le modal actuel
   */
  function closeModal() {
    isModalOpen.value = false;
  }
  
  return {
    isModalOpen,
    modalType,
    modalTitle,
    formFields,
    formData,
    openModal,
    closeModal
  };
}); 