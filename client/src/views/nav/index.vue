<template>
  <div class="nav">
    <div class="logo">网易云音乐</div>
    <div class="search">
      <Search />
    </div>
    <div class="settings">
      <Settings />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Search from "@/components/nav/Search";
import Settings from "@/components/nav/Settings";
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.nav {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 20px;
  @include theme(color, "font-color");

  .search {
    margin-left: 70px;
  }
  .settings {
    position: absolute;
    right: 0;
    margin-right: 20px;
  }
}
</style>