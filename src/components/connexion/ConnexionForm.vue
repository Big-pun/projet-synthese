<template>
  <form @submit.prevent="handleSubmit">
    <h2>Connexion</h2>
    <!-- mail -->
    <input v-model="email" type="email" placeholder="Email" required />

    <!-- password -->
    <input v-model="password" type="password" placeholder="Mot de passe" required />

    <!-- submit -->
    <button type="submit" :disabled="loading">
      {{ loading ? 'Connexion...' : 'Se connecter' }}
    </button>

    <!-- error -->
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const emit = defineEmits(['closeModal']);

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

// submit form
const handleSubmit = async () => {
  errorMessage.value = '';
  if (!email.value || !password.value) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    const response = await userStore.login(email.value, password.value);
    
    if (response.success) {
      toast.success("Login successful!");
      setTimeout(() => {
        emit('closeModal'); // Close the modal after login
        router.push('/profile'); // Redirect to profile page
      }, 2000);
    } else {
      toast.error(response.message || "Error during login.");
    }
  } catch (error) {
    errorMessage.value = "Erreur de connexion. Veuillez réessayer.";
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
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


button:hover {
  background-color: #0056b3;
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
