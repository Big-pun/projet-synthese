<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  iconSrc: String,
  buttonText: String,
  collapsed: Boolean
})

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("handleClick");
};

</script>

<template>
    <div @click="handleClick" class="nav__link relative bg-transparent px-4 md:px-6 py-3 flex font-medium text-md text-color-dark-gray items-center gap-4 w-full cursor-pointer">
        <img class="w-12" :src="iconSrc" :alt="buttonText">
        <span v-if="!collapsed" class="hidden md:inline-block pr-4 md:pr-18 min-w-max">{{ buttonText }}</span>
    </div>
</template>

<style>

.nav__link:not(.active):hover {
  background-color: var(--color-accent1);
  transition: all 200ms ease;
}

</style>