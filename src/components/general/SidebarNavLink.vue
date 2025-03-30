<script setup>

import { RouterLink } from 'vue-router';

const props = defineProps({
  routerLink: String,
  iconSrc: String,
  text: String,
  collapsed: Boolean,
  isButton: Boolean
})

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  if (props.isButton) {
    emit("handleClick");
  }
};
</script>

<template>
    <!-- <component> = special vue element that conditionally renders elements based on its IS attribute (here a button or a RouterLink element) -->
    <component 
    :is="isButton ? 'button' : RouterLink"
    :to="!isButton && routerLink"
    @click="handleClick"
    exact-active-class="active"
    class="nav__link relative bg-transparent px-4 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 w-full cursor-pointer">
        <img class="w-12" :src="iconSrc" :alt="text">
        <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-12 min-w-max">{{ text }}</span>
    </component>
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