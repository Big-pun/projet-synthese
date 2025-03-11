<script setup>
import ProfileBankingInfos from '@/components/profile/ProfileBankingInfos.vue';
import ProfilePersonnalInfos from '@/components/profile/ProfilePersonnalInfos.vue';
import ProfilePreview from '@/components/profile/ProfilePreview.vue';
import ProfileSchoolInfos from '@/components/profile/ProfileSchoolInfos.vue';
</script>

<template>
    <p class="font-bold">CONTENU PAGE PROFILE</p>
    <ProfilePreview></ProfilePreview>
    <ProfilePersonnalInfos></ProfilePersonnalInfos>
    
    <!-- Section avec informations scolaires et bancaires côte à côte -->
    <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 max-w-screen-lg mx-auto">
      <ProfileSchoolInfos></ProfileSchoolInfos>
      <ProfileBankingInfos></ProfileBankingInfos>
    </div>
  </template>

<style>
</style>