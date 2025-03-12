import Toast, { useToast as vueToastUseToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Options pour Vue Toastification
const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

// Méthodes utilitaires pour faciliter l'utilisation des toasts
export const useToast = () => {
  const toast = vueToastUseToast();
  
  return {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast.info(message),
    warning: (message) => toast.warning(message)
  };
};

export default {
  install: (app) => {
    app.use(Toast, toastOptions);
  }
}; 