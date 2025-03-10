<script setup>
</script>

<template> <!--ATTENTION LES FONTES NE CORRESPONT PAS À LA MAQUETTE, AJUSTEMENT REQUIS POUR LE H4-->
  <section class="mx-auto md:w-[60%] w-[90%] pt-10">
    <!--SECTION TITRE-->
    <div class="flex items-center justify-center">
      <img src="@/assets/img/logo.svg" alt="Flow icon" class="w-[25px] pb-8 md:pb-0 hover:animate-spin" > <!--Je me suis amusé ;), c'est peut-être trop-->
      <h3 class="text-black font-roboto p-[6px] text-center">FEATURES</h3>
    </div>

    <!--SECTION FEATURES-->
    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-20px] mt-[-25px]">01</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="uppercase pb-2">Interface fluide et intuitive</h4>  <!--le css ne ressemble pas à la maquette, ça devrait être du roboto-->
        <p class="font-(family-name:--font-roboto) text-sm md:text-base">Parce que votre temps est précieux, nous avons conçu un outil qui simplifie la gestion de vos finances, pour que vous puissiez vous concentrer sur ce qui compte vraiment.</p>
      </div>
    </div>

    <div class="w-full border-accent1 mb-2 mt-2 border-2 opacity-35"></div>

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">02</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="uppercase pb-2">Ajout rapide de transactions</h4>
        <p class="font-(family-name:--font-roboto) text-sm md:text-base">Enregistrement ultra rapide des revenus et dépenses, avec possibilité de catégories et de notes pour une gestion optimisée de tes finances.</p>
      </div>
    </div>

    <div class="w-full border-accent1 mb-2 mt-2 border-2 opacity-35"></div>

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">03</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="uppercase pb-2">Calcul automatique de la balance</h4>
        <p class="font-(family-name:--font-roboto) text-sm md:text-base">L’application met à jour ta balance en temps réel après chaque ajout ou suppression de transaction, offrant une vue précise et immédiate de tes finances.</p>
      </div>
    </div>

    <div class="w-full border-accent1 mb-2 mt-2 border-2 opacity-35"></div>

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">04</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="uppercase pb-2">Organisation par catégories</h4>
        <p class="font-(family-name:--font-roboto) text-sm md:text-base">Organise tes transactions en catégories telles qu’alimentation, transports, loisirs, etc., pour avoir une vision claire de la répartition de tes dépenses.</p>
      </div>
    </div>

    <div class="w-full border-accent1 mb-2 mt-2 border-2 opacity-35"></div>

    

  </section>

</template>

<style></style>