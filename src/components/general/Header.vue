<script setup>
</script>

<template>
  <nav class="flex gap-6">
    <RouterLink to="/accueil" class="flex font-medium text-lg text-color-dark-gray gap-3 items-center">
      <img class="w-14" src="../../assets/icons/home_logo.svg" alt="aller a la page accueil">
      Accueil
    </RouterLink>
    <RouterLink to="/espace-client/budget" class="flex font-medium text-lg text-color-dark-gray gap-3 items-center">
      <img class="w-14" src="../../assets/icons/budget_logo.svg" alt="aller a la page budget">
      Budget
    </RouterLink>
    <RouterLink to="/espace-client/profil" class="flex font-medium text-lg text-color-dark-gray gap-3 items-center">
      <img class="w-14" src="../../assets/icons/profil_logo.svg" alt="aller a la page profile">
      Profil
    </RouterLink>
   </nav>
</template>

<style></style>