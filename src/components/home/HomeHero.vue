<script setup>
</script>

<template scoped>
  <div class="flex w-screen justify-center">
    <section class="m-auto w-full">
      <div class="bg-[url(@/assets/img/Swirls.svg)] bg-no-repeat bg-cover bg-center py-20">
        <div class="flex flex-col sm:flex-row items-center justify-center pb-5">
          <img src="@/assets/img/logo.svg" alt="Flow icon" class="w-[35px] pb-8 sm:pb-0 hover:animate-spin" > <!--Je me suis amusé ;), c'est peut-être trop-->
          <h1 class="text-black p-[6px] text-center uppercase">Bienvenue sur l’application flow</h1>
        </div>
        <!--À VOIR SI ON REMPLACE LA CLASS DE P PAR UNE CLASS DANS LE THEME-->
        <p class="text-center text-xl">Commencez à prendre le contrôle de vos finances dès aujourd'hui!</p>
        <div class="flex justify-center pt-12">
          <a class="font-(family-name:--font-roboto) text-center text-white bg-accent1 py-4 px-8 rounded-[5px]">Inscription</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>