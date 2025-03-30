<script setup>
</script>


<template scoped>
  <section class="flex items-center justify-between bg-gray rounded-3xl">
    <div class="main--full-width__boxed-section flex flex-col justify-center items-center py-5 w-full">
      <h2 class="text-center pt-10 pb-8 uppercase text-dark-gray">Plongez dans l’univers de Flow</h2>
<!--Section 1 avec animation-->
    <div class="w-[75%] mb-8">
      <img 
          src="/src/assets/img/Video3.gif"
          alt="Description du gif" 
          class="w-full h-auto object-contain rounded-xl border-1 border-dark-gray">
          
      </img>
    </div>
<!--Section 1 avec animation OPTION VIDEO SUR YOUTUBE-->
    <div class="w-[75%] mb-8">
      <iframe 
          src="https://www.youtube.com/embed/wLYpcMbNKq4?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0" 
          width="100%"
          height="auto"
          style="aspect-ratio: 16/9;"
          class="rounded-xl border-1 border-dark-gray">
          
        </iframe>
    </div>
        
<!--Section 2-->
      <div class="flex md:flex-row flex-col w-[75%] justify-between pb-10">
        <div class="md:w-[55%] w-[100%]">
          <img class="rounded-xl border-1 border-dark-gray" src="../../assets/img/renseignements.png" alt="Renseignement">
        </div>
        <div class="md:w-[41%] w-[100%] flex flex-col justify-between">
          <img class="w-[80px] sm:w-[170px]" src="../../assets/img/LogoNom-White.svg" alt="Logo">
          <p class="text-xs md:text-base text-dark-gray text-center bg-accent2 md:p-2 md:mb-3 rounded">Utilisation simple et efficace</p>
          <p class="text-xs md:text-base text-dark-gray text-center bg-accent1 md:p-2 md:mb-3 rounded">Entièrement gratuit</p>
          <img class="rounded-xl border-1 border-dark-gray" src="../../assets/img/profil.png" alt="Profil">
        </div>
      </div>
    </div>

  </section>
</template>

<style></style>