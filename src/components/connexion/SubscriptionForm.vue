<template>
  <form @submit.prevent="handleSubmit">
    <h2>Sign Up</h2>

    <!-- First Name -->
    <input v-model="firstName" type="text" placeholder="First Name" required />

    <!-- Last Name -->
    <input v-model="lastName" type="text" placeholder="Last Name" required />

    <!-- Email -->
    <input v-model="email" type="email" placeholder="Email" required />

    <!-- Password -->
    <input v-model="password" type="password" placeholder="Password" required />

    <!-- Confirm Password -->
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />

    <!-- Sign Up Button -->
    <button type="submit" :disabled="loading || !isValidForm">
      {{ loading ? "Signing up..." : "Sign Up" }}
    </button>
  </form>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useUserStore } from '@/services/userStore';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

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
  if (password.value !== confirmPassword.value) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
    loading.value = true;
    const response = await userStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });

    if (response.success) {
      toast.success("Sign-up successful!");
      setTimeout(() => {
        emit('closeModal'); // Close the modal after sign-up
        router.push('/profile'); // Redirect to profile page
      }, 2000);
    } else {
      toast.error(response.message || "Error during sign-up.");
    }
  } catch (error) {
    toast.error("Server error. Please try again.");
  } finally {
    loading.value = false;
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
