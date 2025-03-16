import { useToast } from '../plugins/toastification';
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