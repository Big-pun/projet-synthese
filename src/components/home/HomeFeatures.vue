<script>
</script>

<template scoped>
 <div class="flex justify-center">

  <section class="m-auto md:w-[50%] w-[90%] pt-10">
    <!--SECTION TITRE-->
    <div class="flex items-center justify-center">
      <img src="@/assets/img/logo.svg" alt="Flow icon" class="w-[25px] pb-8 md:pb-0 hover:animate-spin" > <!--Je me suis amusé ;), c'est peut-être trop-->
      <h3 class="text-black font-roboto p-[6px] text-center uppercase">Avantages</h3>
    </div>

    <!--SECTION FEATURES-->
    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px]">01</h5>
      <div class="flex flex-col justify-center items-left sm:pl-3">
        <h4 class="font-roboto uppercase pb-2">Interface fluide et intuitive</h4>  <!--le css ne ressemble pas à la maquette, ça devrait être du roboto-->
        <p class="text-sm md:text-base">Parce que votre temps est précieux, nous avons conçu un outil qui simplifie la gestion de vos finances, pour que vous puissiez vous concentrer sur ce qui compte vraiment.</p>
      </div>
    </div>

    <hr class="block w-full border-accent1 border-2 opacity-35 my-8">

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">02</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="font-roboto uppercase pb-2">Ajout rapide de transactions</h4>
        <p class="text-sm md:text-base">Enregistrement ultra rapide des revenus et dépenses, avec possibilité de catégories et de notes pour une gestion optimisée de tes finances.</p>
      </div>
    </div>

    <hr class="block w-full border-accent1 border-2 opacity-35 my-8">

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">03</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="font-roboto uppercase pb-2">Calcul automatique de la balance</h4>
        <p class="text-sm md:text-base">L’application met à jour ta balance en temps réel après chaque ajout ou suppression de transaction, offrant une vue précise et immédiate de tes finances.</p>
      </div>
    </div>

    <hr class="block w-full border-accent1 border-2 opacity-35 my-8">

    <div class="flex md:items-center item-left flex-col sm:flex-row">
      <h5 class="text-accent1 text-[130px] opacity-35 hover:text-accent2 sm:mb-[0px] sm:mt-[0px] mb-[-25px] mt-[-35px]">04</h5>
      <div class="flex flex-col justify-center items-left pl-3">
        <h4 class="font-roboto uppercase pb-2">Organisation par catégories</h4>
        <p class="text-sm md:text-base">Organise tes transactions en catégories telles qu’alimentation, transports, loisirs, etc., pour avoir une vision claire de la répartition de tes dépenses.</p>
      </div>
    </div>

    <hr class="block w-full border-accent1 border-2 opacity-35 my-8">

  </section>

 </div>
 

</template>

<style>

  hr {
    margin-top: 30px;
  }


</style>