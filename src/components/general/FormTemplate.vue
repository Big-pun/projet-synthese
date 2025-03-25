<script setup>
import logo from '@/assets/img/logo.svg';

const props = defineProps({
  title: String,
  subTitle: String,
  handleSubmit: Function,
  btnText: String,
  disableBtn: Boolean
});
</script>

<template>
  <div class="rounded-md p-8 flex flex-col items-center gap-2 max-h-[75vh] overflow-y-auto">
    <h2 class="font-light text-gray font-main">
      <img :src="logo" class="h-4 inline-block" alt="logo">
      {{ title }}
    </h2>
    <h3 class="font-roboto text-sm">{{ subTitle }}</h3>
    <form v-on:submit.prevent="handleSubmit" action="" class="flex flex-col gap-4 my-4">
        <slot></slot>
      <button :disabled="disableBtn" type="submit" class="mx-auto mt-4 border-2 border-accent1 hover:bg-accent1 inline-block w-max py-2 px-5 rounded-md text-accent1 hover:text-white font-semibold transition-all">{{ btnText }}</button>
    </form>
  </div>
</template>

<style></style>