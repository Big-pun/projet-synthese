<template>
  <div class="font-roboto bg-light-gray rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div
      class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0"
    >
      <h2 class="text-xl font-roboto font-semibold text-white ml-4">
        Modifier vos renseignements bancaires
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
      <!-- Informations bancaires -->
      <div class="mb-4">
        <!-- Institution et compte -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-2">
          <!-- Institution bancaire -->
          <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
            <label
              for="institutionName"
              class="block text-sm font-medium text-gray mb-2 responsive-margin"
            >
              Institution
            </label>
            <div>
              <div
                v-if="v$.institutionName.$error"
                class="text-accent2 text-sm mt-1"
            >
              {{ v$.institutionName.$errors[0].$message }}
            </div>
            <input
              type="text"
              id="institutionName"
              v-model="formData.institutionName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$.institutionName.$error }"
              />
            </div>
          </div>

          <!-- Informations du compte -->
          <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
            <label
              for="accountInfo"
              class="block text-sm font-medium text-gray mb-2 responsive-margin"
            >
              Compte
            </label>
            <div>
              <div
                v-if="v$.accountInfo.$error"
                class="text-accent2 text-sm mt-1"
              >
                {{ v$.accountInfo.$errors[0].$message }}
              </div>
              <input
                type="text"
                id="accountInfo"
                v-model="formData.accountInfo"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$.accountInfo.$error }"
            />
            </div>
          </div>
        </div>

        <!-- Prêts et autres -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <!-- Informations de prêt -->
          <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
            <label
              for="loanInfo"
              class="block text-sm font-medium text-gray mb-2 responsive-margin"
            >
              Prêts
            </label>

            <div>
              <div v-if="v$.loanInfo.$error" class="text-accent2 text-sm mt-1">
                {{ v$.loanInfo.$errors[0].$message }}
              </div>
              <textarea
                id="loanInfo"
                v-model="formData.loanInfo"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                rows="3"
                :class="{ 'border-accent2': v$.loanInfo.$error }"
              ></textarea>
            </div>
          </div>

          <!-- Autres informations -->
          <div class="rounded-lg bg-white p-4 flex flex-col lg:flex-row justify-start">
            <label
              for="other"
              class="block text-sm font-medium text-gray mb-2 responsive-margin"
            >
              Autres
            </label>
            <textarea
              id="other"
              v-model="formData.other"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mt-8">
        <button
          type="button"
          @click="$emit('cancel')"
          class=" px-8 py-3 border-2 border-accent2 bg-white text-gray rounded-md hover:bg-accent2 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-8 py-3 border-2 border-accent1 bg-white text-gray rounded-md hover:bg-accent1 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength} from "@vuelidate/validators";
import { useBankingStore } from "@/services/bankingStore";
import { useUserStore } from "@/services/userStore";
import { useToast } from "vue-toastification";

const bankingStore = useBankingStore();
const userStore = useUserStore();
const toast = useToast();
const emit = defineEmits(["save", "cancel"]);

const isSubmitting = ref(false);

// form data
const formData = reactive({
  institutionName: "",
  accountInfo: "",
  loanInfo: "",
  other: "",
});

// validation rules
const rules = {
  institutionName: {
    required: helpers.withMessage(
      "L'institution bancaire est requise",
      required
    ),
    minLength: helpers.withMessage(
      "L'institution bancaire doit contenir au moins 3 caractères",
      minLength(3)
    ),
  },
  accountInfo: {
    required: helpers.withMessage(
      "Les informations du compte sont requises",
      required
    ),
    validate: helpers.withMessage(
      "Veuillez entrer un numéro de compte valide (exemple: 123-456-7890)",
      (value) => {
        const digitsOnly = value.replace(/\D/g, "");
        return digitsOnly.length >= 6;
      }
    ),
  },
  loanInfo: {
    required: helpers.withMessage(
      "Les informations de prêt sont requises",
      required
    ),
  },
};

const v$ = useVuelidate(rules, formData);

// load banking data from store
function loadBankingData() {

  if (bankingStore.bankingDetails) {
    formData.institutionName =
      bankingStore.bankingDetails.institutionName || "";
    formData.accountInfo = bankingStore.bankingDetails.accountInfo || "";
    formData.loanInfo = bankingStore.bankingDetails.loanInfo || "";
    formData.other = bankingStore.bankingDetails.other || "";

  }
}


// format account info
function formatAccountInfo(accountInfo) {

  if (!accountInfo) return "";

  const digitsOnly = accountInfo.replace(/\D/g, "");

  if (digitsOnly.length === 10) {
    return `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6, 10)}`;
  }

  return accountInfo;
}

// form submission
async function handleSubmit() {

  try {
    const isValid = await v$.value.$validate();
    if (!isValid) {
      return;
    }

    isSubmitting.value = true;

    const formattedData = {
      institutionName: formData.institutionName,
      accountInfo: formatAccountInfo(formData.accountInfo),
      loanInfo: formData.loanInfo,
      other: formData.other,
    };

    // Mise à jour via le store
    await bankingStore.updateBankingDetails(userStore.user.id, formattedData);
    emit("save", formattedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    toast.error(
      bankingStore.error || "Une erreur est survenue lors de la mise à jour"
    );
  } finally {
    isSubmitting.value = false;
  }
}

// load data on mount
onMounted(async () => {

  if (userStore.user?.id) {
    await bankingStore.fetchBankingDetails(userStore.user.id);
    loadBankingData();
  }
});

// watch for changes in the store
watch(
  () => bankingStore.bankingDetails,
  (newVal) => {
    loadBankingData();
  },
  { deep: true }
);
</script>

<style scoped></style>
