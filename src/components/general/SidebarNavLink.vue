<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  link: Object,
  collapsed: Boolean
})
</script>

<template>
  <RouterLink :to="link.route" exact-active-class="active" class="nav__link relative bg-transparent px-4 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 w-full">
    <img class="w-12" :src="link.icon" :alt="'aller a la page ' + link.name">
    <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-18">{{ link.name }}</span>
  </RouterLink>
</template>

<style>

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