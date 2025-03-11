<template>
  <form @submit.prevent="handleSubmit">
    <h2>Connexion</h2>

    <!-- Mail -->
    <input v-model="email" type="email" placeholder="Email" required />

    <!-- Password -->
    <input v-model="password" type="password" placeholder="Mot de passe" required />

    <!-- Connexion button -->
    <button type="submit">Se connecter</button>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { loginUser } from '@/api';


const email = ref('');
const password = ref('');
const errorMessage = ref('');

// submit form
const handleSubmit = async () => {
  try {
    const userData = {
      email: email.value,
      password: password.value,
    };

    const response = await loginUser(userData);

    // validation connexion
    if (response.success) {
      console.log("Utilisateur connecté:", response);
      emit('closeModal'); // close modal after login
    } else {
      errorMessage.value = response.message || "Erreur de connexion.";
    }
  } catch (error) {
    errorMessage.value = "Erreur de connexion. Veuillez réessayer.";
  }
};
</script>

<style scoped>
/* à revoir */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  margin-bottom: 10px;
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
</style>
