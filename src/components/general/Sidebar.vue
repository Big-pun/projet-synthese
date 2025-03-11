<script setup>
import { ref } from 'vue';
import closeIcon from '../../assets/icons/close_icon.svg';
import menuIcon from '../../assets/icons/menu_icon.svg';
import homeIcon from '../../assets/icons/home_icon.svg';
import budgetIcon from '../../assets/icons/budget_icon.svg';
import profileIcon from '../../assets/icons/profil_icon.svg';
import signOutIcon from '../../assets/icons/sign_out_icon_alt.svg';
import SidebarNavLink from './SidebarNavLink.vue';
import signInIcon from '../../assets/icons/sign_in_icon.svg';
import signUpIcon from '../../assets/icons/sign_up_icon.svg';

const props = defineProps({
  userConnected: Boolean
});

const collapsed = ref(true);

function collapseSidebar() {
  collapsed.value = !collapsed.value;
}

const userConnectedNavLinks = [
  {
    name: 'Accueil',
    icon: homeIcon,
    route: '/accueil'
  },
  {
    name: 'Budget',
    icon: budgetIcon,
    route: '/budget'
  },
  {
    name: 'Profil',
    icon: profileIcon,
    route: '/profil'
  }
]

const homeLink = {
  name: 'Accueil',
  icon: homeIcon,
  route: '/accueil'
}
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
      <!-- if user is connected -->
      <ul v-if="userConnected">
        <li v-for="link in userConnectedNavLinks" :key="link.route">
          <SidebarNavLink :link="link" :collapsed="collapsed"></SidebarNavLink>
        </li>
      </ul>

      <!-- if user is not connected -->
      <ul v-else>
        <SidebarNavLink :link="homeLink" :collapsed="collapsed"></SidebarNavLink>

        <!-- ***** sign up button - @click and its logic to open up Subscription Modal will need to be added -->
        <div class="nav__link relative bg-transparent px-4 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 w-full cursor-pointer">
          <img class="w-12" :src="signUpIcon" alt="S'inscrire">
          <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-18">S'inscrire</span>
        </div>

        <!-- ***** sign in button - @click and its logic to open up Connexion Modal will need to be added -->
        <div class="nav__link relative bg-transparent px-4 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 w-full cursor-pointer">
          <img class="w-12" :src="signInIcon" alt="Se connecter">
          <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-18">Se connecter</span>
        </div>
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

</style>