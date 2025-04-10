<template>
  <div class="bg-light-gray font-roboto rounded-lg mx-auto max-w-screen-sm">
    <!-- En-tête du formulaire -->
    <div class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0">
      <h2 class="text-xl font-roboto font-semibold text-white ml-4">Supprimer votre profil</h2>
      
      <!-- Rectangle SVG avec couleur d'accent -->
      <svg width="36" height="75" viewBox="0 0 36 75" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b">
        <rect width="36" height="75" class="rectangle-fill-hovered" />
      </svg>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
      <!-- Champ de confirmation texte -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label for="confirmation" class="block text-sm font-medium text-gray sm:responsive-margin">
            Tapez "SUPPRIMER" pour confirmer
          </label>
          <input 
            type="text" 
            id="confirmation" 
            v-model="formData.confirmation"
            class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
            :class="{ 'border-accent2': v$.confirmation.$error }"
            placeholder="Tapez 'SUPPRIMER' pour confirmer"
          />
        </div>
        <div v-if="v$.confirmation.$error" class="text-accent2 text-sm mt-1 ml-4">
          {{ v$.confirmation.$errors[0].$message }}
        </div>
      </div>

      <!-- Mot de passe -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label for="password" class="block text-sm font-medium text-gray sm:responsive-margin">
            Mot de passe
          </label>
          <div class="relative w-full">
            <input 
              :type="passwordVisible ? 'text' : 'password'" 
              id="password" 
              v-model="formData.password"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$.password.$error }"
            />
            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <div v-if="v$.password.$error" class="text-accent2 text-sm mt-1 ml-4">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <!-- Avertissement -->
      <div class="p-4 bg-white text-accent2 rounded-md mb-4">
        <p class="font-medium">Attention !</p>
        <p>Cette action est irréversible. Tous vos données seront définitivement supprimées.</p>
      </div>

      <!-- Boutons -->
      <div class="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mt-8">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="px-8 py-3 border-2 border-accent2 bg-white text-gray rounded-md hover:bg-accent2 transition-colors"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 bg-accent2 bg-opacity-10 border-2 border-accent2 text-gray rounded-md hover:text-white transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'En cours...' : 'Supprimer mon profil' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useUserStore } from '@/services/userStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const emit = defineEmits(['save', 'cancel']);

// États du formulaire
const formData = reactive({
  confirmation: '',
  password: ''
});

const isSubmitting = ref(false);
const passwordVisible = ref(false);

// Règles de validation
const rules = computed(() => ({
  confirmation: { 
    required: helpers.withMessage('La confirmation est requise', required),
    isSupprimer: helpers.withMessage(
      'Veuillez taper "SUPPRIMER" pour confirmer', 
      (value) => value === 'SUPPRIMER'
    )
  },
  password: { 
    required: helpers.withMessage('Le mot de passe est requis', required)
  }
}));

const v$ = useVuelidate(rules, formData);

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

async function handleSubmit() {
  try {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible. Toutes vos données seront définitivement supprimées.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F74949',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      // show loading
      Swal.fire({
        title: 'Suppression en cours...',
        text: 'Veuillez patienter pendant la suppression de votre compte',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await userStore.deleteUser(userStore.user.id, formData.password);
        localStorage.removeItem('user');
        
        // close the loading SweetAlert
        Swal.close();
        
        // show success toast
        toast.success("Votre compte a été supprimé avec succès");

        emit('save');
        router.push('/accueil');
        window.location.reload();
      } catch (error) {
        Swal.close();
        // handle the incorrect password error
        if (error.message === "Mot de passe incorrect" || userStore.error === "Mot de passe incorrect") {
          toast.error("Le mot de passe est incorrect");
        } else {
          toast.error("Une erreur est survenue lors de la suppression du profil");
        }
      }
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    toast.error("An unexpected error occurred");
    Swal.close();
  } finally {
    isSubmitting.value = false;
  }
}
</script> 