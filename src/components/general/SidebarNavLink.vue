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

<style></style>