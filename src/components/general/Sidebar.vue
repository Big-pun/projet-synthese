<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
const collapsed = ref(false);
</script>

<template>
  <div class="sidebar py-10 text-dark-gray bg-black h-full flex flex-col justify-center">
        <nav class="nav flex flex-col min-h-full relative grow justify-center">
          <RouterLink to="/accueil" exact-active-class="active" class="nav__link relative bg-transparent pl-6 pr-18 py-3 flex font-medium text-lg text-color-dark-gray items-center gap-4">
            <img class="w-14" src="../../assets/icons/home_icon.svg" alt="aller a la page accueil">
            Accueil
          </RouterLink>
          <RouterLink to="/espace-client/budget" exact-active-class="active" class="nav__link relative bg-transparent pl-6 pr-18 py-3 flex font-medium text-lg text-color-dark-gray items-center gap-4">
            <img class="w-14" src="../../assets/icons/budget_icon.svg" alt="aller a la page budget">
            Budget
          </RouterLink>
          <RouterLink to="/espace-client/profil" exact-active-class="active" class="nav__link relative bg-transparent pl-6 pr-18 py-3 flex font-medium text-lg text-color-dark-gray items-center gap-4">
            <img class="w-14" src="../../assets/icons/profil_icon.svg" alt="aller a la page profile">
            Profil
          </RouterLink>
        </nav>
        <div class="nav__link relative bg-transparent pl-6 pr-18 py-3 flex font-medium text-lg text-color-dark-gray items-center gap-4 cursor-pointer">
            <img class="w-14" src="../../assets/icons/sign_out_icon.svg" alt="se deconnecter"> <!-- SIGN OUT LOGIC TO ADD -->
            Deconnexion
        </div>
  </div>
</template>

<style>

.nav__link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 150ms ease-in;
}

.nav__link:hover::after {
  background-color: var(--color-accent1);
}

.nav__link.active::after {
  background-color: var(--color-gray);
  outline: 3px solid var(--color-accent1);
  width: 112%;
}

</style>