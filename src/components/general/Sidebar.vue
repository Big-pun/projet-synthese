<script setup>
import { ref } from 'vue';
import closeIcon from '../../assets/icons/close_icon.svg';
import menuIcon from '../../assets/icons/menu_icon.svg';
import homeIcon from '../../assets/icons/home_icon.svg';
import budgetIcon from '../../assets/icons/budget_icon.svg';
import profileIcon from '../../assets/icons/profil_icon.svg';
import signOutIcon from '../../assets/icons/sign_out_icon_alt.svg';
import SidebarNavLink from './SidebarNavLink.vue';

const collapsed = ref(true);

function collapseSidebar() {
  collapsed.value = !collapsed.value;
}

const navLinks = [
  {
    name: 'Accueil',
    icon: homeIcon,
    route: '/accueil'
  },
  {
    name: 'Budget',
    icon: budgetIcon,
    route: '/espace-client/budget'
  },
  {
    name: 'Profil',
    icon: profileIcon,
    route: '/espace-client/profil'
  }
]
</script>

<template>
  <div class="sidebar relative py-5 text-dark-gray bg-black h-full flex flex-col justify-center">
    <!-- sidebar is expandable only on md screen and above -->
     <!-- collapse / expand sidebar button -->
    <div @click="collapseSidebar" :class="collapsed ? 'justify-center': 'start w-max'" class="hidden md:flex nav__link relative bg-transparent px-6 py-3 font-medium text-md text-color-dark-gray items-center gap-4 cursor-pointer">
      <img class="h-4" :src="collapsed ? menuIcon : closeIcon" :alt="collapsed ? 'Agrandir le menu' : 'Reduire le menu'"> <!-- SIGN OUT LOGIC TO ADD -->
    </div>

    <!-- navlinks -->
    <nav class="nav flex flex-col min-h-full relative grow justify-center w-full min-w-18">
      <ul>
        <li v-for="link in navLinks" :key="link.route">
          <SidebarNavLink :link="link" :collapsed="collapsed"></SidebarNavLink>
        </li>
      </ul>
    </nav>

    <!-- sign out button -->
    <div class="nav__link relative bg-transparent px-2 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 cursor-pointer">
        <img class="w-12" :src="signOutIcon" alt="se deconnecter"> <!-- SIGN OUT LOGIC TO ADD -->
        <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-18">Deconnexion</span>
    </div>
  </div>
</template>

<style scoped>

.nav__link:not(.active):hover {
  background-color: var(--color-accent1);
  transition: all 200ms ease;
}

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

.nav__link.active::after {
  background-color: var(--color-gray);
  outline: 3px solid var(--color-accent1);
  width: 108%;
}

</style>