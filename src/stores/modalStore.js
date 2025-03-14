import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Store pour gérer uniquement l'état des modaux dans l'application
 * Centralise la gestion de l'ouverture/fermeture des modaux
 */
export const useModalStore = defineStore('modal', () => {
  // État du modal
  const isOpen = ref(false);
  
  /**
   * Ouvre le modal
   */
  function openModal() {
    isOpen.value = true;
  }
  
  /**
   * Ferme le modal
   */
  function closeModal() {
    isOpen.value = false;
  }
  
  return {
    isOpen,
    openModal,
    closeModal
  };
});
