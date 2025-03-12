import { useToast } from '../plugins/toastification';

/**
 * Utilitaire pour afficher des notifications toast dans toute l'application
 * Centralise les appels et permet de maintenir un style cohérent
 */

// Fonction pour afficher un toast de succès
export const showSuccess = (message, options = {}) => {
  const { success } = useToast();
  success(message, {
    ...options
  });
};

// Fonction pour afficher un toast d'erreur
export const showError = (message, options = {}) => {
  const { error } = useToast();
  error(message, {
    ...options
  });
};

// Fonction pour afficher un toast d'information
export const showInfo = (message, options = {}) => {
  const { info } = useToast();
  info(message, {
    ...options
  });
};

// Fonction pour afficher un toast d'avertissement
export const showWarning = (message, options = {}) => {
  const { warning } = useToast();
  warning(message, {
    ...options
  });
};

/**
 * Fonction avancée pour créer un toast complètement personnalisé
 * @param {string} message - Le message à afficher
 * @param {object} options - Options de personnalisation (timeout, position, etc.)
 * @param {string} type - Type du toast (success, error, info, warning)
 */
export const showCustomToast = (message, options = {}, type = 'success') => {
  const toast = useToast();
  
  if (!toast[type]) {
    console.warn(`Type de toast '${type}' non supporté. Utilisation du type 'default'.`);
    toast.default(message, options);
    return;
  }
  
  toast[type](message, options);
};

// Export global pour une utilisation simplifiée
export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
  custom: showCustomToast
}; 