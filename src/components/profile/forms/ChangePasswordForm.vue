<template>
  <div class="bg-light-gray font-roboto rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div
      class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0"
    >
      <h2 class="text-xl font-roboto font-semibold text-white ml-4">
        {{ title }}
      </h2>

      <!-- Rectangle SVG avec couleur d'accent -->
      <svg
        width="36"
        height="75"
        viewBox="0 0 36 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-0 rounded-b"
      >
        <rect width="36" height="75" class="rectangle-fill-hovered" />
      </svg>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
      <!-- Mot de passe actuel -->
      <div class="mb-4">
        <div class="relative h-20">
          <button
            @click="toggleAllPasswordVisibility"
            class="absolute right-5 top-1/2 -translate-y-1/2 mb-2 rounded-md bg-dark-gray border-2 border-gray p-2"
          >
            <p class="text-gray">mots de passe</p>
          </button>
        </div>

        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label
            for="currentPassword"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Mot de passe actuel
          </label>
          <div class="relative w-full">
            <div>
              <div
                v-if="v$.currentPassword.$error"
                class="text-accent2 text-sm mt-1 ml-4"
              >
                {{ v$.currentPassword.$errors[0].$message }}
              </div>
              <input
                :type="passwordVisibility.currentPassword ? 'text' : 'password'"
                id="currentPassword"
                v-model="formData.currentPassword"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$.currentPassword.$error }"
              />
            
            <button
              type="button"
              @click="togglePasswordVisibility('currentPassword')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            :class="{ 'top-6': v$.currentPassword.$error }"
            >
              <i
                :class="
                  passwordVisibility.currentPassword
                    ? 'fas fa-eye-slash'
                    : 'fas fa-eye'
                "
              ></i>
            </button>
          </div>
          </div>
        </div>
      </div>

      <!-- Nouveau mot de passe -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label
            for="newPassword"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Nouveau mot de passe
          </label>
          <div class="relative w-full">
            <div>
              <div
                v-if="v$.newPassword.$error"
                class="text-accent2 text-sm mt-1 ml-4"
              >
                {{ v$.newPassword.$errors[0].$message }}
              </div>
              <input
                :type="passwordVisibility.newPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="formData.newPassword"
                @input="checkPasswordsMatch"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$.newPassword.$error }"
              />
            </div>
            <button
              type="button"
              @click="togglePasswordVisibility('newPassword')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              :class="{ 'top-6': v$.newPassword.$error }"
            >
              <i
                :class="
                  passwordVisibility.newPassword
                    ? 'fas fa-eye-slash'
                    : 'fas fa-eye'
                "
              ></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Confirmer le mot de passe -->
      <div class="mb-4">
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Confirmer le mot de passe
          </label>
          <div class="relative w-full">
            <div>
              <div
                v-if="v$.confirmPassword.$error"
                class="text-accent2 text-sm mt-1 ml-4"
              >
                {{ v$.confirmPassword.$errors[0].$message }}
              </div>
              <div
                v-if="!v$.confirmPassword.$error && !passwordsMatch"
                class="text-accent2 text-sm mt-1 ml-4"
              >
                Les mots de passe ne correspondent pas
              </div>

              <input
                :type="passwordVisibility.confirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                @input="checkPasswordsMatch"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{
                  'border-accent2':
                    v$.confirmPassword.$error || !passwordsMatch,
                }"
              />
            </div>
            <button
              type="button"
              @click="togglePasswordVisibility('confirmPassword')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              :class="{ 'top-6': v$.confirmPassword.$error }"
            >
              <i
                :class="
                  passwordVisibility.confirmPassword
                    ? 'fas fa-eye-slash'
                    : 'fas fa-eye'
                "
              ></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Boutons -->
      <div class="flex justify-end space-x-4 p-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-8 py-3 border-2 border-accent2 text-gray rounded-md hover:bg-accent2 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-8 py-3 border-2 border-accent1 text-gray rounded-md hover:bg-accent1 transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "En cours..." : "Enregistrer" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, sameAs } from "@vuelidate/validators";
import { useUserStore } from "@/services/userStore";
import { useToast } from "vue-toastification";
import sweetAlert from "@/plugins/sweetAlert";
import Swal from "sweetalert2";

const userStore = useUserStore();
const toast = useToast();
const emit = defineEmits(["save", "cancel"]);

const props = defineProps({
  title: {
    type: String,
    default: "Changer votre mot de passe",
  },
});

// État du formulaire
const formData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// État de visibilité des mots de passe
const passwordVisibility = reactive({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
});

// État de soumission
const isSubmitting = ref(false);
const passwordsMatch = ref(true);

// Règles de validation
const rules = computed(() => ({
  currentPassword: {
    required: helpers.withMessage(
      "Le mot de passe actuel est requis",
      required
    ),
  },
  newPassword: {
    required: helpers.withMessage(
      "Le nouveau mot de passe est requis",
      required
    ),
    minLength: helpers.withMessage(
      "Le mot de passe doit contenir au moins 8 caractères",
      minLength(8)
    ),
    passwordRegex: helpers.withMessage(
      "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial",
      (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    ),
  },
  confirmPassword: {
    required: helpers.withMessage(
      "Veuillez confirmer le mot de passe",
      required
    ),
    sameAsPassword: helpers.withMessage(
      "Les mots de passe doivent correspondre",
      sameAs(formData.newPassword)
    ),
  },
}));

// Initialiser Vuelidate
const v$ = useVuelidate(rules, formData);

// Méthodes
function togglePasswordVisibility(field) {
  passwordVisibility[field] = !passwordVisibility[field];
}

function toggleAllPasswordVisibility() {
  // D'abord, vérifions si au moins un champ est visible
  const atLeastOneVisible = Object.values(passwordVisibility).some(
    (value) => value === true
  );

  // Si au moins un champ est visible, on cache tout
  // Sinon, on affiche tout
  Object.keys(passwordVisibility).forEach((key) => {
    passwordVisibility[key] = !atLeastOneVisible;
  });
}

function checkPasswordsMatch() {
  passwordsMatch.value = formData.newPassword === formData.confirmPassword;
}

async function handleSubmit() {
  isSubmitting.value = true;

  try {
    // Valider le formulaire
    const isValid = await v$.value.$validate();
    if (!isValid) {
      return;
    }

    // Vérifier que le mot de passe actuel est correct
    if (formData.currentPassword !== userStore.user?.password) {
      toast.error("Le mot de passe actuel est incorrect");
      return;
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien
    if (formData.currentPassword === formData.newPassword) {
      toast.error("Le nouveau mot de passe doit être différent de l'ancien");
      return;
    }

    // Mettre à jour le mot de passe
    await userStore.updateUser(userStore.user.id, {
      password: formData.newPassword,
    });

    Swal.fire({
      title: "Modification en cours...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    emit("save");
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    toast.error("Erreur lors du changement de mot de passe");
  } finally {
    isSubmitting.value = false;
  }
}
</script>
