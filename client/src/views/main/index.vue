<template>
  <div class="main">
    <div class="sidebar">
      <div class="wrap wrap1">
        <div class="item active">
          <router-link
            to="/foundMusic"
            @click="setActive"
          >发现音乐</router-link>
        </div>
        <div class="item">
          <router-link to="/podcast">播客</router-link>

        </div>
        <div class="item">
          <router-link to="/video">视频</router-link>

        </div>
        <div class="item">
          <router-link to="/attention">关注</router-link>

        </div>
        <div class="item">
          <router-link to="/live">直播</router-link>

        </div>
        <div class="item">
          <router-link to="/privateFM">私人FM</router-link>
        </div>
      </div>
      <div class="wrap wrap2">
        <div class="header my-music">我的音乐</div>
        <div class="item">
          <router-link to="/loveMusic">我喜欢的音乐</router-link>

        </div>
        <div class="item">
          <router-link to="/download">本地预下载</router-link>

        </div>
        <div class="item">
          <router-link to="/recentlyPlayed">最近播放</router-link>
        </div>
      </div>
      <div class="wrap wrap3">
        <div class="header">创建的歌单</div>
        <div class="item">
          <router-link to="">我喜欢的音乐</router-link>
        </div>
      </div>
      <div class="wrap wrap4">
        <div class="header">创建的歌单</div>
      </div>
    </div>
    <div class="showRoute">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

//点击 发现音乐 将索引初始化
import { useGlobalStore } from "@/store/global";
const useGlobal = useGlobalStore();
useGlobal.setActiveName("first");

onMounted(() => {
  let items = document.querySelectorAll(".item");
  let wraps = document.querySelectorAll(".wrap");
  Array.from(items).forEach((item) => {
    item.onclick = function (e) {
      Array.from(wraps).forEach((wrap) => {
        Array.from(wrap.children).forEach((child) => {
          child.classList.remove("active");
        });
      });
      this.classList.add("active");
    };
  });
});
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.main {
  height: 100%;
  display: flex;
  ::-webkit-scrollbar {
    display: none;
  }
  .sidebar {
    width: 240px;
    height: 100%;
    padding-right: 10px;
    overflow-y: scroll;
    border-right: 1px solid #454545;
    @include theme(background-color, "body-background-color");
    .wrap {
      padding: 15px 5px 0 15px;
      > div {
        padding-left: 5px;
      }
      > div:not(.header) {
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          @include theme(color, "font-color");
          text-decoration: none;
        }
      }
      > div:not(.my-music) {
        cursor: pointer;
        transition: 0.3s;
      }
      > div.active:not(.header) {
        a {
          @include theme(color, "font-color");
          text-decoration: none;
        }
        font-weight: 900;
        @include theme(color, "nav-list-hover-color");
        @include theme(background-color, "nav-list-hover-background-color");
      }
      > div:not(.header):hover {
        font-weight: 900;
        @include theme(background-color, "nav-list-hover-background-color");
        a {
          @include theme(color, "nav-list-hover-color");
          text-decoration: none;
        }
      }
      > div.header {
        font-size: 12px;
        @include theme(color, "header-color");
      }
    }
  }
  .showRoute {
    width: 100%;
    height: 100%;
    padding: 20px 20px 0;
    overflow-y: scroll;
  }
}
</style>