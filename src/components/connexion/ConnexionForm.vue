<template>
  <FormTemplate title="Connexion" subTitle="Connectez-vous pour avoir accès à votre compte" :handleSubmit="handleSubmit" :btnText="userStore.loading ? 'Connexion...' : 'Se connecter'" :disableBtn="userStore.loading">
    <!-- mail -->
    <input v-model="email" type="email" placeholder="Email" />

    <!-- password -->
    <input v-model="password" type="password" placeholder="Mot de passe" />

    <!-- error -->
    <p v-if="errorMessage" class="text-xs text-accent2">{{ errorMessage }}</p>
  </FormTemplate>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useUserStore } from '@/services/userStore';
import FormTemplate from '../general/FormTemplate.vue';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const emit = defineEmits(['closeModal']);

const email = ref('');
const password = ref('');
const errorMessage = ref('');

// submit form
const handleSubmit = async () => {
  errorMessage.value = '';
  if (!email.value || !password.value) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    await userStore.login(email.value, password.value);
    
    if (userStore.user) {
      toast.success("Login successful!");
      setTimeout(() => {
        emit('closeModal'); // Close the modal after login
        router.push('/profil'); // Redirect to profile page
      }, 2000);
    } else {
      toast.error(userStore.error);
    }
  } catch {
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
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
