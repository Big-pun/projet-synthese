<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
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

    <form @submit.prevent="handleSubmit" class="space-y-4 p-4" novalidate>
      <!-- Nom de l'établissement et domaine d'études -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
        <!-- Nom de l'établissement -->
        <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
          <label
            for="schoolName"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Nom de l'établissement
          </label>
          <div>
            <div
              v-if="v$?.schoolName?.$error"
              class="text-accent2 text-sm mt-1"
            >
              {{ v$?.schoolName?.$errors[0]?.$message }}
            </div>
            <input
              type="text"
              id="schoolName"
              v-model="formData.schoolName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$?.schoolName?.$error }"
            />
          </div>
        </div>

        <!-- Domaine d'études -->
        <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
          <label
            for="fieldOfStudy"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Domaine d'études
          </label>
          <div>
            <div
              v-if="v$?.fieldOfStudy?.$error"
              class="text-accent2 text-sm mt-1"
            >
              {{ v$?.fieldOfStudy?.$errors[0]?.$message }}
            </div>
            <input
              type="text"
              id="fieldOfStudy"
              v-model="formData.fieldOfStudy"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$?.fieldOfStudy?.$error }"
            />
          </div>
        </div>
      </div>

      <!-- Dates du programme -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <!-- Date de début -->
        <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
          <label
            for="startDate"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Début du programme
          </label>
          <div>
            <div v-if="v$?.startDate?.$error" class="text-accent2 text-sm mt-1">
              {{ v$?.startDate?.$errors[0]?.$message }}
            </div>
            <input
              type="date"
              id="startDate"
              v-model="formData.startDate"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$?.startDate?.$error }"
            />
          </div>
        </div>

        <!-- Date de fin prévue -->
        <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
          <label
            for="projectedEndDate"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Fin prévue du programme
          </label>
          <div>
            <div
              v-if="v$?.projectedEndDate?.$error"
              class="text-accent2 text-sm mt-1"
            >
              {{ v$?.projectedEndDate?.$errors[0]?.$message }}
            </div>
            <input
              type="date"
              id="projectedEndDate"
              v-model="formData.projectedEndDate"
              :min="formData.startDate || ''"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              :class="{ 'border-accent2': v$?.projectedEndDate?.$error }"
            />
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { useSchoolStore } from "@/services/schoolStore";
import { useUserStore } from "@/services/userStore";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";

const props = defineProps({
  schoolData: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: "Modifier vos informations scolaires",
  },
});

const emit = defineEmits(["save", "cancel"]);

const userStore = useUserStore();
const schoolStore = useSchoolStore();
const toast = useToast();

const isSubmitting = ref(false);

const formData = reactive({
  schoolName: "",
  fieldOfStudy: "",
  startDate: "",
  projectedEndDate: "",
});

// Charger les données initiales
function loadSchoolDataDirectly() {
  console.log("Chargement direct depuis le store:", schoolStore.schoolDetails);

  if (schoolStore.schoolDetails) {
    formData.schoolName = schoolStore.schoolDetails.schoolName || "";
    formData.fieldOfStudy = schoolStore.schoolDetails.fieldOfStudy || "";

    if (schoolStore.schoolDetails.startDate) {
      formData.startDate = new Date(schoolStore.schoolDetails.startDate)
        .toISOString()
        .split("T")[0];
      console.log("Date de début formatée:", formData.startDate);
    }

    if (schoolStore.schoolDetails.projectedEndDate) {
      formData.projectedEndDate = new Date(
        schoolStore.schoolDetails.projectedEndDate
      )
        .toISOString()
        .split("T")[0];
      console.log("Date de fin formatée:", formData.projectedEndDate);
    }
  }
}

// Règles de validation
const rules = computed(() => {
  return {
    schoolName: {
      required: helpers.withMessage(
        "Le nom de l'établissement est requis",
        required
      ),
      minLength: helpers.withMessage(
        "Le nom de l'établissement doit contenir au moins 3 caractères",
        minLength(5)
      ),
    },
    fieldOfStudy: {
      required: helpers.withMessage("Le domaine d'études est requis", required),
      minLength: helpers.withMessage(
        "Le domaine d'études doit contenir au moins 3 caractères",
        minLength(5)
      ),
    },
    startDate: {
      required: helpers.withMessage(
        "La date de début du programme est requise",
        required
      ),
    },
    projectedEndDate: {
      required: helpers.withMessage(
        "La date de fin prévue du programme est requise",
        required
      ),
      validDateRange: helpers.withMessage(
        "La date de fin prévue doit être après la date de début",
        (value) => {
          if (!formData.startDate || !value) return true;

          const startDate = new Date(formData.startDate);
          const endDate = new Date(value);

          // Comparaison plus précise en ignorant les heures
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);

          const isValid = endDate > startDate;
          return isValid;
        }
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);

// Charger les données initiales au montage
onMounted(async () => {
  if (userStore.user?.id) {
    console.log(
      "Chargement des données pour l'utilisateur:",
      userStore.user.id
    );
    await schoolStore.fetchSchoolDetails(userStore.user.id);
    loadSchoolDataDirectly();
  }
});

// Surveiller les changements de schoolData pour recharger les données
watch(
  () => props.schoolData,
  () => {
    loadSchoolDataDirectly();
  },
  { deep: true }
);

// Ajoutons une fonction watch pour réinitialiser la date de fin si elle devient invalide
watch(
  () => formData.startDate,
  (newStartDate) => {
    // Si la date de fin existe et est avant la nouvelle date de début, on la réinitialise
    if (formData.projectedEndDate && newStartDate) {
      const startDate = new Date(newStartDate);
      const endDate = new Date(formData.projectedEndDate);

      if (endDate <= startDate) {
        formData.projectedEndDate = "";
        toast.info(
          "Veuillez sélectionner une nouvelle date de fin après la date de début"
        );
      }
    }
  }
);

async function handleSubmit() {
  try {
    const isFormValid = await v$.value.$validate();

    if (!isFormValid) {
      console.log("Erreurs de validation:", v$.value.$errors);
      return;
    }

    isSubmitting.value = true;

    // Formater les données
    const schoolData = {
      schoolName: formData.schoolName,
      fieldOfStudy: formData.fieldOfStudy,
      startDate: new Date(formData.startDate).toISOString(),
      projectedEndDate: new Date(formData.projectedEndDate).toISOString(),
    };

    // Afficher le loading
    Swal.fire({
      title: "Mise à jour en cours...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await schoolStore.updateSchoolDetails(userStore.user.id, schoolData);

    Swal.close();

    toast.success(
      "Vos informations scolaires ont été mises à jour avec succès"
    );

    // Émettre l'événement save avec les données
    emit("save", schoolData);
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    toast.error(
      schoolStore.error || "Une erreur est survenue lors de la mise à jour"
    );
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.rectangle-fill-hovered {
  fill: #00ec86;
  transition: fill 0.2s ease;
}
</style>
