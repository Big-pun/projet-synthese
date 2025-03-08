<template>
  <div class="font-roboto text-lg max-w-screen-lg mx-auto bg-light-gray rounded-lg shadow-md mb-6 transition-all duration-200" 
       @mouseenter="hovered = true" 
       @mouseleave="hovered = false">
    
    <!-- En-tête de la section avec pastille de statut -->
    <div class="flex items-center justify-between mb-4 p-6 rounded-t-lg bg-gray">
      <h3 class="text-xl font-bold text-white">Renseignements personnels</h3>
      
      <div class="relative">
        <div class="h-4 w-4 rounded-full transition-colors duration-200"
            :class="hovered ? 'bg-accent1' : 'bg-accent2'"></div>
      </div>
    </div>
    
    <!-- Contenu du profil en deux colonnes -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Première colonne -->
      <div>
        <div class="bg-white mb-4 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Prenom</p>
          <p class="text-lg">{{ userData.prenom || 'Non spécifié' }}</p>
        </div>
        
        <div class="bg-white mb-4 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Date de naissance</p>
          <p class="text-lg">{{ userData.dateNaissance || 'Non spécifié' }}</p>
        </div>
      </div>
      
      <!-- Deuxième colonne -->
      <div>
        <div class="bg-white mb-4 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Nom</p>
          <p class="text-lg">{{ userData.nom || 'Non spécifié' }}</p>
        </div>
        
        <div class="bg-white mb-4 p-4 flex flex-row items-center ">
          <p class="responsive-margin text-sm text-gray-500">Telephone</p>
          <p class="text-lg">{{ userData.telephone || 'Non spécifié' }}</p>
        </div>
      </div>
    </div>
    
    <!-- Adresses -->
    <div class="mt-2">

      <div class="bg-white mb-4 p-4 flex flex-row items-center">
          <p class="responsive-margin text-sm text-gray-500">Courriel</p>
          <p class="text-lg">{{ userData.courriel || 'Non spécifié' }}</p>
      </div>

      <div class="bg-white mb-4 p-4 flex flex-row items-center ">
        <p class="responsive-margin text-sm text-gray-500">Adresse personnelle</p>
        <p class="text-lg">{{ userData.adressePersonnelle || 'Non spécifié' }}</p>
      </div>
      
      <div class="bg-white mb-4 p-4 flex flex-row items-center ">
        <p class="responsive-margin text-sm text-gray-500">Adresse au travail</p>
        <p class="text-lg">{{ userData.adresseTravail || 'Non spécifié' }}</p>
      </div>
    </div>
    
    <!-- Bouton d'édition -->
    <div class="mt-4 border border-accent1 rounded-lg overflow-hidden">
      <button 
        @click="openEditModal"
        class="w-full py-3 px-4 flex items-center justify-center transition-colors duration-200 text-gray"
        :class="hovered ? 'text-white bg-accent1' : 'text-accent1 bg-white'">
        <span class="mr-2">+</span> Editer cette section
      </button>
    </div>
    
    <!-- Modal d'édition (affiché lorsque showModal est true)
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-xl font-bold mb-4">Modifier les renseignements personnels</h3>
        
        <form @submit.prevent="saveUserData">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm text-gray-500 mb-1">Prénom</label>
              <input v-model="editableUserData.prenom" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
            
            <div>
              <label class="block text-sm text-gray-500 mb-1">Nom</label>
              <input v-model="editableUserData.nom" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
            
            <div>
              <label class="block text-sm text-gray-500 mb-1">Date de naissance</label>
              <input v-model="editableUserData.dateNaissance" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
            
            <div>
              <label class="block text-sm text-gray-500 mb-1">Téléphone</label>
              <input v-model="editableUserData.telephone" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-500 mb-1">Courriel</label>
              <input v-model="editableUserData.courriel" class="w-full px-3 py-2 border rounded-md" type="email">
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-500 mb-1">Adresse personnelle</label>
              <input v-model="editableUserData.adressePersonnelle" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-500 mb-1">Adresse au travail</label>
              <input v-model="editableUserData.adresseTravail" class="w-full px-3 py-2 border rounded-md" type="text">
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="closeModal" class="px-4 py-2 border border-accent2 text-accent2 rounded-md">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-accent1 text-white rounded-md">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// État pour le survol
const hovered = ref(false);

// Données utilisateur (pourrait être récupérées d'une API plus tard)
const userData = reactive({
  prenom: 'Bruno',
  nom: 'Gautier',
  dateNaissance: '02/01/1992',
  telephone: '581 - 422 - 5029',
  courriel: 'brunogautier@gmail.com',
  adressePersonnelle: '885 rue de l\'escarpement, Trois-Rivieres, G2X5L2',
  adresseTravail: '22 rue du Fort, Trois-Rivieres, G3L5M4'
});

</script>

<style>
.responsive-margin {
    margin-right: clamp(3rem, 5vw, 8rem); /* Marge dynamique */
  }
</style>