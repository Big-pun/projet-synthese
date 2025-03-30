<template>
  <FormTemplate
    title="Inscription"
    subTitle="Créez votre compte en quelques secondes !"
    :handleSubmit="handleSubmit"
    :btnText="loading ? 'Signing up..' : 'Sign Up'"
    :disableBtn="loading"
  >
    <!-- First Name -->
    <input v-model="firstName" type="text" placeholder="First Name" />
    <span class="text-xs text-accent2">{{ errors.firstName }}</span>

    <!-- Last Name -->
    <input v-model="lastName" type="text" placeholder="Last Name" />
    <span class="text-xs text-accent2">{{ errors.lastName }}</span>

    <!-- Email -->
    <input v-model="email" type="email" placeholder="Email" />
    <span class="text-xs text-accent2">{{ errors.email }}</span>

    <!-- Password -->
    <input v-model="password" type="password" placeholder="Password" />
    <span class="text-xs text-accent2">{{ errors.password }}</span>

    <!-- Confirm Password -->
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
    <span class="text-xs text-accent2">{{ errors.confirmPassword }}</span>
  </FormTemplate>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useUserStore } from '@/services/userStore';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import FormTemplate from '../general/FormTemplate.vue';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const emit = defineEmits(['closeModal']);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Email validation (basic regex check)
const isValidEmail = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.value);
});

// Password validation (at least 8 characters, 1 uppercase, 1 number, 1 special character)
const isValidPassword = computed(() => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password.value);
});

// Check fields filled and valid
const isValidForm = computed(() => {
  return firstName.value && lastName.value && isValidEmail.value && isValidPassword.value && password.value === confirmPassword.value;
});

// Form submission
const handleSubmit = async () => {
  errors.value.firstName = !firstName.value ? 'Le prénom est requis.' : '';
  errors.value.lastName = !lastName.value ? 'Le nom est requis.' : '';
  errors.value.email = !email.value ? 'Le mail est requis' : !isValidEmail.value ? 'Le mail est invalide' : '';
  errors.value.password = !isValidPassword.value ? 'Le mot de passe doit contenir au moins 8 caractères, dont au moins 1 lettre majuscule, 1 chiffre et 1 caractère spécial.' : '';
  errors.value.confirmPassword = password.value !== confirmPassword.value ? 'Les mots de passe ne correspondent pas.' : '';

  if(isValidForm.value === true) {
    try {
    loading.value = true;
    await userStore.register({
      id: "0",
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      isActive: true,
      birthDate: null,
      phone: null
    });

    if (userStore.user) {
      toast.success("Sign-up successful!");
      setTimeout(() => {
        emit('closeModal'); // Close the modal after sign-up
        router.push('/profil'); // Redirect to profile page
      }, 500);
    } else {
      toast.error(userStore.error);
    }
  } catch {
    toast.error("Erreur de connexion. Veuillez réessayer.");
  } finally {
    loading.value = false;
  }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
