<template>
  <div class="bg-light-gray font-roboto rounded-lg mx-auto">
    <!-- En-tête du formulaire -->
    <div
      class="flex items-center justify-between mb-4 p-3 rounded-t-lg bg-gray relative z-0"
    >
      <h2 class="text-xl font-roboto font-semibold text-white ml-4">
        Modifier vos informations personnelles
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
      <!-- Informations personnelles -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3 text-gray">
          Informations personnelles
        </h3>

        <!-- Grille pour prénom et nom -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-2">
          <!-- Prénom -->
          <div class="rounded-lg bg-white p-4 mb-2 sm:mb-0 sm:flex sm:flex-row items-center">
            <label
              for="firstName"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Prénom
            </label>

            <div>
              <div
                v-if="v$?.firstName?.$error"
                class="text-accent2 text-sm mt-1"
              >
                {{ v$?.firstName?.$errors[0]?.$message }}
              </div>

              <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.firstName?.$error }"
              />
            </div>
          </div>

          <!-- Nom -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label
              for="lastName"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Nom
            </label>

            <div>
              <div v-if="v$?.lastName?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.lastName?.$errors[0]?.$message }}
              </div>

              <input
                type="text"
              id="lastName"
              v-model="formData.lastName"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.lastName?.$error }"
              />
            </div>
          </div>
        </div>

        <!-- Grille pour date de naissance et téléphone -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <!-- Date de naissance -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label
              for="birthDate"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Date de naissance
            </label>

            <div>
              <div v-if="v$?.birthDate?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.birthDate?.$errors[0]?.$message }}
              </div>
              <div v-else class="text-gray text-sm mt-1">
                Vous devez avoir entre 16 et 100 ans
              </div>

              <input
                type="date"
              id="birthDate"
              v-model="formData.birthDate"
              :max="maxDate.toISOString().split('T')[0]"
              :min="minDate.toISOString().split('T')[0]"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.birthDate?.$error }"
              />
            </div>
          </div>

          <!-- Téléphone -->
          <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
            <label
              for="phone"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Téléphone
            </label>
            <div>
              <div v-if="v$?.phone?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.phone?.$errors[0]?.$message }}
              </div>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                @input="formatPhoneNumber"
                placeholder="XXX-XXX-XXXX"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.phone?.$error }"
            />
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="rounded-lg bg-white p-4 sm:flex sm:flex-row items-center">
          <label
            for="email"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Courriel
          </label>
          <div>
            <div v-if="v$?.email?.$error" class="text-accent2 text-sm mt-1">
              {{ v$?.email?.$errors[0]?.$message }}
            </div>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.email?.$error }"
            />
          </div>
        </div>
      </div>

      <!-- Informations d'adresse -->
      <div class="mb-6">
        <!-- En-tête de section avec type d'adresse intégré -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <h3 class="text-lg font-medium text-gray">ADRESSE</h3>
          </div>
          <div class="relative">
            <select
              id="addressType"
              v-model="formData.addressType"
              @change="handleAddressTypeChange"
              class="w-48 px-3 py-2 border border-accent1 rounded-md focus:border-accent1 outline-none bg-white text-gray"
              :class="{ 'border-accent2': v$?.addressType?.$error }"
            >
              <option value="PERSONAL">Personnelle</option>
              <option value="WORK">Professionnelle</option>
            </select>
            <div
              v-if="v$?.addressType?.$error"
              class="absolute text-accent2 text-sm mt-1"
            >
              {{ v$?.addressType?.$errors[0]?.$message }}
            </div>
          </div>
        </div>

        <!-- Grille pour les informations d'adresse -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pb-2">
          <!-- Numéro de rue -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label
              for="streetNumber"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Numéro de rue
            </label>
            <div>
              <div v-if="v$?.streetNumber?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.streetNumber?.$errors[0]?.$message }}
              </div>
              <input
                type="text"
                id="streetNumber"
                v-model="formData.streetNumber"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.streetNumber?.$error }"
            />
            </div>
          </div>

          <!-- Nom de rue -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label
              for="streetName"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Nom de rue
            </label>
            <div>
              <div v-if="v$?.streetName?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.streetName?.$errors[0]?.$message }}
              </div>
              <input
                type="text"
                id="streetName"
                v-model="formData.streetName"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.streetName?.$error }"
              />
            </div>
          </div>

          <!-- Ville -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label
              for="city"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Ville
            </label>
            <div>
              <div v-if="v$?.city?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.city?.$errors[0]?.$message }}
              </div>
              <input
                type="text"
                id="city"
                v-model="formData.city"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.city?.$error }"
              />
            </div>
          </div>

          <!-- Province -->
          <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
            <label
              for="province"
              class="block text-sm font-medium text-gray responsive-margin"
            >
              Province
            </label>

            <div>
              <div v-if="v$?.province?.$error" class="text-accent2 text-sm mt-1">
                {{ v$?.province?.$errors[0]?.$message }}
              </div>
              <select
                id="province"
                v-model="formData.province"
                class="w-full px-3 py-2 border rounded-md focus:border-accent1 outline-none"
                :class="{ 'border-accent2': v$?.province?.$error }"
            >
             
              <option
                v-for="province in provinces"
                :key="province.value"
                :value="province.value"
              >
                {{ province.label }}
              </option>
            </select>
            </div>
          </div>
        </div>

        <!-- Pays -->
        <div class="sm:flex sm:flex-row p-4 bg-white rounded-lg items-center">
          <label
            for="country"
            class="block text-sm font-medium text-gray responsive-margin"
          >
            Pays
          </label>
          <select
            id="country"
            v-model="formData.country"
            class="w-full px-3 py-2 border border-accent1 rounded-md focus:border-accent1 outline-none"
            :class="{ 'border-accent2': v$?.country?.$error }"
          >
            <option value="CA">Canada</option>
          </select>
          <div v-if="v$?.country?.$error" class="text-accent2 text-sm mt-1">
            {{ v$?.country?.$errors[0]?.$message }}
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
        >
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import { useUserStore } from "@/services/userStore";
import { useAddressStore } from "@/services/addressStore";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const addressStore = useAddressStore();
const toast = useToast();

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  userAddresses: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["save", "cancel"]);

// provinces
const provinces = [
  { value: "QC", label: "Québec" },
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "Colombie-Britannique" },
  { value: "AB", label: "Alberta" },
  { value: "MB", label: "Manitoba" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NB", label: "Nouveau-Brunswick" },
  { value: "NS", label: "Nouvelle-Écosse" },
  { value: "PE", label: "Île-du-Prince-Édouard" },
  { value: "NL", label: "Terre-Neuve-et-Labrador" },
  { value: "YT", label: "Yukon" },
  { value: "NT", label: "Territoires du Nord-Ouest" },
  { value: "NU", label: "Nunavut" },
];

// calculate the limits
const today = new Date();
const minAge = 16;
const maxAge = 100;

const maxDate = new Date(
  today.getFullYear() - minAge,
  today.getMonth(),
  today.getDate()
);
const minDate = new Date(
  today.getFullYear() - maxAge,
  today.getMonth(),
  today.getDate()
);

// reactive form
const formData = reactive({
  firstName: "",
  lastName: "",
  birthDate: "",
  phone: "",
  email: "",
  addressType: "PERSONAL",
  streetNumber: "",
  streetName: "",
  city: "",
  province: "",
  country: "CA",
});

// validation rules
const rules = {
  firstName: {
    required: helpers.withMessage("Le prénom est requis", required),
    minLength: helpers.withMessage(
      "Le prénom doit contenir au moins 2 caractères",
      minLength(2)
    ),
  },
  lastName: {
    required: helpers.withMessage("Le nom est requis", required),
    minLength: helpers.withMessage(
      "Le nom doit contenir au moins 2 caractères",
      minLength(2)
    ),
  },
  birthDate: {
    required: helpers.withMessage("La date de naissance est requise et doit être comprise entre 16 et 100 ans", required),
    validAge: helpers.withMessage(
      `La date de naissance doit être comprise entre ${minDate.toLocaleDateString()} et ${maxDate.toLocaleDateString()}`,
      (value) => {
        const date = new Date(value);
        return date >= minDate && date <= maxDate;
      },
    ),
  },
  phone: {
    required: helpers.withMessage(
      "Le numéro de téléphone est requis",
      required
    ),
    validPhone: helpers.withMessage(
      "Le format du numéro de téléphone est invalide (ex: 123-456-7890)",
      (value) => {
        // Accepte les formats: 123-456-7890, (123) 456-7890, 1234567890
        const phoneRegex =
          /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneRegex.test(value);
      }
    ),
  },
  email: {
    required: helpers.withMessage("L'adresse email est requise", required),
    email: helpers.withMessage(
      "Veuillez entrer une adresse email valide",
      email
    ),
  },
  streetNumber: {
    required: helpers.withMessage("Le numéro de rue est requis", required),
    minLength: helpers.withMessage(
      "Le numéro de rue doit contenir au moins 1 chiffre",
      minLength(1)
    ),
  },
  streetName: {
    required: helpers.withMessage("Le nom de rue est requis", required),
    minLength: helpers.withMessage(
      "Le nom de rue doit contenir au moins 2 caractères",
      minLength(2)
    ),
  },
  city: {
    required: helpers.withMessage("La ville est requise", required),
    minLength: helpers.withMessage(
      "La ville doit contenir au moins 2 caractères",
      minLength(2)
    ),
  },
  province: {
    required: helpers.withMessage("La province est requise", required),
    minLength: helpers.withMessage(
      "La province doit contenir au moins 2 caractères",
      minLength(2)
    ),
  },
};

// initialize Vuelidate
const v$ = useVuelidate(rules, formData, { $lazy: true });

// add this line before the handleSubmit function
const isSubmitting = ref(false);

// load user data
function loadUserData() {

  if (props.userData) {

    formData.firstName = props.userData.firstName || "";
    formData.lastName = props.userData.lastName || "";

    if (props.userData.birthDate) {
      formData.birthDate = new Date(props.userData.birthDate)
        .toISOString()
        .split("T")[0];
    }

    formData.email = props.userData.email || "";
    formData.phone = props.userData.phone || "";

    // load the initial address
    if (props.userAddresses && props.userAddresses.length > 0) {
      // first search for the personal address
      const personalAddress = props.userAddresses.find(
        (addr) => addr.type === "PERSONAL"
      );
      const workAddress = props.userAddresses.find(
        (addr) => addr.type === "WORK"
      );

      // use the personal address in priority, otherwise the work address
      const addressToLoad = personalAddress || workAddress;

      if (addressToLoad) {
        formData.addressType = addressToLoad.type;
        loadAddressByType(addressToLoad.type);
      }
    }
  }
}

// load an address by type
function loadAddressByType(type) {
  const address = props.userAddresses?.find((addr) => addr.type === type);

  if (address) {
    formData.addressType = type;
    formData.streetNumber = address.streetNumber || "";
    formData.streetName = address.streetName || "";
    formData.city = address.city || "";
    formData.province = address.province || "";
    formData.country = address.country || "CA";
  } else {
    // reset the address fields
    formData.addressType = type;
    formData.streetNumber = "";
    formData.streetName = "";
    formData.city = "";
    formData.province = "";
    formData.country = "CA";
  }
}

// handle the address type change
function handleAddressTypeChange() {
  loadAddressByType(formData.addressType);
}

// load data on mount
onMounted(() => {
  loadUserData();
});

// form submission
async function handleSubmit() {
  try {
    const isFormValid = await v$.value.$validate();

    if (!isFormValid) {
      return;
    }

    isSubmitting.value = true;

    // format user data
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: new Date(formData.birthDate).toISOString(),
      email: formData.email,
      phone: formData.phone,
    };

    // format address data
    const addressData = {
      type: formData.addressType,
      streetNumber: formData.streetNumber,
      streetName: formData.streetName,
      city: formData.city,
      province: formData.province,
      country: formData.country,
    };

    // get the user id
    const userId = userStore.user?.id;
    if (!userId) {
      throw new Error("User ID not found");
    }

    // update the two stores in parallel with the user id
    await Promise.all([
      userStore.updateUser(userId, userData),
      addressStore.updateAddress(userId, addressData),
    ]);

    emit("save", userData, addressData);
  } catch (error) {
    console.error("Error during update:", error);
    Swal.close();
    toast.error(
      error.message || "An error occurred during update"
    );
  } finally {
    isSubmitting.value = false;
  }
}

watch(
  formData,
  async (newVal) => {
    if (v$.value.$dirty) {
      await v$.value.$validate();
    }
  },
  { deep: true }
);

function formatPhoneNumber(event) {
  // remove everything that is not a digit
  let phoneNumber = event.target.value.replace(/\D/g, "");

  // limit to 10 digits
  phoneNumber = phoneNumber.substring(0, 10);

  // format as XXX-XXX-XXXX
  if (phoneNumber.length >= 6) {
    phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
  } else if (phoneNumber.length >= 3) {
    phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3)}`;
  }

    // update the value
  formData.phone = phoneNumber;
}
</script>

<style scoped></style>
