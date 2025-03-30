<script setup>
import { ref } from 'vue';
import closeIcon from '../../assets/icons/close_icon.svg';
import menuIcon from '../../assets/icons/menu_icon.svg';
import homeIcon from '../../assets/icons/home_icon.svg';
import budgetIcon from '../../assets/icons/budget_icon.svg';
import profileIcon from '../../assets/icons/profil_icon.svg';
import signOutIcon from '../../assets/icons/sign_out_icon_alt.svg';
import signInIcon from '../../assets/icons/sign_in_icon.svg';
import signUpIcon from '../../assets/icons/sign_up_icon.svg';
import SidebarNavLink from './SidebarNavLink.vue';

const props = defineProps({
  userConnected: Boolean
});

const collapsed = ref(true);

function toggleSidebar() {
  collapsed.value = !collapsed.value;
}

const homeRouterLink = {
  name: 'Accueil',
  icon: homeIcon,
  route: '/accueil'
}

const budgetRouterLink = {
  name: 'Budget',
  icon: budgetIcon,
  route: '/budget'
}

const profileRouterLink = {
  name: 'Profil',
  icon: profileIcon,
  route: '/profil'
}

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
  <div class="sidebar sticky min-w-max top-0 min-h-[100vh] h-full py-5 text-dark-gray bg-black flex flex-col justify-center z-10">
    <!-- sidebar is expandable only on md screen and above -->
     <!-- collapse / expand sidebar button -->
    <div @click="toggleSidebar" :class="collapsed ? 'justify-center': 'start w-max'" class="hidden md:flex nav__link relative bg-transparent px-6 py-3 font-medium text-md text-color-dark-gray items-center gap-4 cursor-pointer">
      <img class="h-4" :src="collapsed ? menuIcon : closeIcon" :alt="collapsed ? 'Agrandir le menu' : 'Reduire le menu'">
    </div>

    <!-- navlinks -->
    <nav class="nav flex flex-col min-h-full relative grow justify-center w-full min-w-18">
      <ul>
        <!-- Home -->
        <SidebarNavLink :routerLink="homeRouterLink.route" :iconSrc="homeRouterLink.icon" :text="homeRouterLink.name" :collapsed="collapsed" :isButton="false"></SidebarNavLink>
        <!-- if user is connected: Budget | Profile -->
        <template v-if="userConnected">
          <SidebarNavLink :routerLink="budgetRouterLink.route" :iconSrc="budgetRouterLink.icon" :text="budgetRouterLink.name" :collapsed="collapsed" :isButton="false"></SidebarNavLink>
          <SidebarNavLink :routerLink="profileRouterLink.route" :iconSrc="profileRouterLink.icon" :text="profileRouterLink.name" :collapsed="collapsed" :isButton="false"></SidebarNavLink>
        </template>
        <!-- if user is not connected: Sign Up | Sign In -->
        <template v-else>
          <!-- ***** sign up button - logic inside openSubscriptionModal function needs to be added -->
          <SidebarNavLink :iconSrc="signUpIcon" text="Inscription" :collapsed="collapsed" :isButton="true" @handleClick="openSubscriptionModal"></SidebarNavLink>
          <!-- ***** sign in button - logic inside openConnexionModal function needs to be added -->
          <SidebarNavLink :iconSrc="signInIcon" text="Connexion" :collapsed="collapsed" :isButton="true" @handleClick="openConnexionModal"></SidebarNavLink>
        </template>
      </ul>
    </nav>

     <!-- ***** sign out button - logic inside signOutUser function needs to be added -->
     <SidebarNavLink v-if="userConnected" :iconSrc="signOutIcon" text="Deconnexion" :collapsed="collapsed" :isButton="true" @handleClick="signOutUser"></SidebarNavLink>
  </div>
</template>

<style scoped>

</style>