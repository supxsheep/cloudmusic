<template>
  <Carousel />
  <RecomPlaylist />
  <PrivateContent />
  <NewSong />
  <MV />
</template>

<script setup lang="ts">
import Carousel from "@/components/foundMusic/recommendation/components/Carousel.vue";
import RecomPlaylist from "@/components/foundMusic/recommendation/components/RecomPlaylist.vue";
import PrivateContent from "@/components/foundMusic/recommendation/components/PrivateContent";
import NewSong from "@/components/foundMusic/recommendation/components/NewSong";
import MV from "@/components/foundMusic/recommendation/components/MV";
</script>

<style scoped lang="scss">
</style>