<template>
  <form @submit.prevent="handleSubmit">
    <h2>Inscription</h2>
    <!-- FirstName -->
    <input v-model="firstName" type="text" placeholder="Prénom" required />

    <!-- LastName -->
    <input v-model="lastName" type="text" placeholder="Nom" required />

    <!-- Mail -->
    <input v-model="email" type="email" placeholder="Email" required />

    <!-- Password -->
    <input v-model="password" type="password" placeholder="Mot de passe" required />

    <!-- Confirm Password -->
    <input v-model="confirmPassword" type="password" placeholder="Confirmez le mot de passe" required />

    <!-- subscription button -->
    <button type="submit">S'inscrire</button>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '@/api';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// submit form
const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    await registerUser(userData);
    
    emit('closeModal'); // close modal after register
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription. Veuillez réessayer.";
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
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
