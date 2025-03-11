<script setup>
import { ref } from 'vue';
import closeIcon from '../../assets/icons/close_icon.svg';
import menuIcon from '../../assets/icons/menu_icon.svg';
import homeIcon from '../../assets/icons/home_icon.svg';
import budgetIcon from '../../assets/icons/budget_icon.svg';
import profileIcon from '../../assets/icons/profil_icon.svg';
import signOutIcon from '../../assets/icons/sign_out_icon_alt.svg';
import SidebarRouterLink from './SidebarRouterLink.vue';
import signInIcon from '../../assets/icons/sign_in_icon.svg';
import signUpIcon from '../../assets/icons/sign_up_icon.svg';
import SidebarActionNavLink from './SidebarActionNavLink.vue';

const props = defineProps({
  userConnected: Boolean
});

const collapsed = ref(true);

function toggleSidebar() {
  collapsed.value = !collapsed.value;
}

const homeLink = {
  name: 'Accueil',
  icon: homeIcon,
  route: '/accueil'
}

const budgetLink = {
  name: 'Budget',
  icon: budgetIcon,
  route: '/budget'
}

const profileLink = {
  name: 'Profil',
  icon: profileIcon,
  route: '/profil'
}

const userConnectedNavLinks = [homeLink, budgetLink, profileLink];

const openSubscriptionModal = () => {
  // **** logic to open subscription modal to add
  console.log('open subscription modal');
}

const openConnexionModal = () => {
  // **** logic to open connexion modal to add
  console.log('open connexion modal');
}

const signOutUser = () => {
  // **** logic to sign out user to add
  console.log('sign out user');
}

</script>

<template>
  <div class="sidebar sticky w-max top-0 min-h-[100vh] h-full py-5 text-dark-gray bg-black flex flex-col justify-center">
    <!-- sidebar is expandable only on md screen and above -->
     <!-- collapse / expand sidebar button -->
    <div @click="toggleSidebar" :class="collapsed ? 'justify-center': 'start w-max'" class="hidden md:flex nav__link relative bg-transparent px-6 py-3 font-medium text-md text-color-dark-gray items-center gap-4 cursor-pointer">
      <img class="h-4" :src="collapsed ? menuIcon : closeIcon" :alt="collapsed ? 'Agrandir le menu' : 'Reduire le menu'">
    </div>

    <!-- navlinks -->
    <nav class="nav flex flex-col min-h-full relative grow justify-center w-full min-w-18">
      <!-- if user is connected: Home | Budget | Profile -->
      <ul v-if="userConnected">
        <li v-for="link in userConnectedNavLinks" :key="link.name">
          <SidebarRouterLink :link="link" :collapsed="collapsed"></SidebarRouterLink>
        </li>
      </ul>

      <!-- if user is not connected: Home | Sign Up | Sign In -->
      <ul v-else>
        <SidebarRouterLink :link="homeLink" :collapsed="collapsed"></SidebarRouterLink>

        <!-- ***** sign up button - logic inside openSubscriptionModal function needs to be added -->
        <SidebarActionNavLink :iconSrc="signUpIcon" buttonText="S'inscrire" :collapsed="collapsed" @handleClick="openSubscriptionModal"></SidebarActionNavLink>

        <!-- ***** sign in button - logic inside openConnexionModal function needs to be added -->
        <SidebarActionNavLink :iconSrc="signInIcon" buttonText="Se connecter" :collapsed="collapsed" @handleClick="openConnexionModal"></SidebarActionNavLink>
      </ul>
    </nav>

     <!-- ***** sign out button - logic inside signOutUser function needs to be added -->
    <SidebarActionNavLink :iconSrc="signOutIcon" buttonText="Deconnexion" :collapsed="collapsed" @handleClick="signOutUser"></SidebarActionNavLink>
  </div>
</template>

<style scoped>

</style>