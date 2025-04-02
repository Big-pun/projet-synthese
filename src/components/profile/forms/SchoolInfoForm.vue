<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div
      class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0"
    >
      <h2 class="text-xl font-roboto font-semibold text-white ml-4">
        Modifier votre établissement scolaire
      </h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4 p-4" novalidate>
      <!-- Nom de l'établissement et domaine d'études -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
        <!-- Nom de l'établissement -->
        <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
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
        <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
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
        <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
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
        <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
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
      <div class="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mt-8">
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

const emit = defineEmits(["save", "cancel"]);

const userStore = useUserStore();
const schoolStore = useSchoolStore();
const toast = useToast();

const isSubmitting = ref(false);

const props = defineProps({
  schoolDetails: {
    type: Object,
    required: true,
  },
});

const formData = reactive({
  schoolName: "",
  fieldOfStudy: "",
  startDate: "",
  projectedEndDate: "",
});

// load initial data
function loadSchoolData() {
  if (props.schoolDetails) {  
    formData.schoolName = props.schoolDetails.schoolName || "";
    formData.fieldOfStudy = props.schoolDetails.fieldOfStudy || "";

    if (props.schoolDetails.startDate) {
      formData.startDate = new Date(props.schoolDetails.startDate)
        .toISOString()
        .split("T")[0];
    }
    formData.schoolName = schoolStore.schoolDetails.schoolName || "";
    formData.fieldOfStudy = schoolStore.schoolDetails.fieldOfStudy || "";

    if (schoolStore.schoolDetails.startDate) {
      formData.startDate = new Date(schoolStore.schoolDetails.startDate)
        .toISOString()
        .split("T")[0];
    }

    if (schoolStore.schoolDetails.projectedEndDate) {
      formData.projectedEndDate = new Date(
        schoolStore.schoolDetails.projectedEndDate
      )
        .toISOString()
        .split("T")[0];
    }
  }
}

// validation rules
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

// load initial data on mount
onMounted(async () => {
  if (userStore.user?.id) {
      await schoolStore.fetchSchoolDetails(userStore.user.id);
    loadSchoolData();
  }
});

// add a watch to reset the end date if it becomes invalid
watch(
  () => formData.startDate,
  (newStartDate) => {
    // if the end date exists and is before the new start date, reset it
    if (formData.projectedEndDate && newStartDate) {
      const startDate = new Date(newStartDate);
      const endDate = new Date(formData.projectedEndDate);

      if (endDate <= startDate) {
        formData.projectedEndDate = "";
        toast.info(
          "Please select a new end date after the start date"
        );
      }
    }
  }
);

async function handleSubmit() {
  try {
    const isFormValid = await v$.value.$validate();

    if (!isFormValid) {
      return;
    }

    isSubmitting.value = true;

    // format the data
    const schoolData = {
      schoolName: formData.schoolName,
      fieldOfStudy: formData.fieldOfStudy,
      startDate: new Date(formData.startDate).toISOString(),
      projectedEndDate: new Date(formData.projectedEndDate).toISOString(),
    };

    await schoolStore.updateSchoolDetails(userStore.user.id, schoolData);

    // emit the save event with the data
    emit("save", schoolData);
  } catch (error) {
    toast.error(
    schoolStore.error || "An error occurred during update"
    );
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
</style>
