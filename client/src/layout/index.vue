<template>
  <div class="music">
    <div class="head">
      <Nav />
    </div>
    <div class="body">
      <Main />
    </div>
    <div class="bottom-player">
      <Player />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Nav from "@/views/nav";
import Main from "@/views/main";
import Player from "@/views/player";

/**
 * 主题换肤功能
 */
//主题更换
const value = ref(true);
const switchTheme = (e: boolean) => {
  if (e) {
    // console.log(e);
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "red");
  }
};
switchTheme(value.value);
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.music {
  width: 1020px;
  height: 670px;
  position: relative;
  .head {
    height: 60px;
    border-bottom: 2px solid #ad2121;
    @include theme(background-color, "nav-background-color");
  }
  .body {
    height: 540px;
    @include theme(background-color, "body-background-color");
  }
  .bottom-player {
    bottom: 0;
    width: 100%;
    height: 70px;
    z-index: 999;
    position: absolute;
    @include theme(background-color, "player-background-color");
  }
}
</style>