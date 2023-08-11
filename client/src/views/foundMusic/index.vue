<template>
  <div class="found-music">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="个性推荐"
        name="first"
      >
        <Recommendation />
      </el-tab-pane>
      <el-tab-pane
        label="专属定制"
        name="second"
      >
        专属定制
      </el-tab-pane>
      <el-tab-pane
        label="歌单"
        name="third"
      >
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane
        label="排行榜"
        name="fourth"
      >
        排行榜
      </el-tab-pane>
      <el-tab-pane
        label="歌手"
        name="fifth"
      >
        歌手
      </el-tab-pane>
      <el-tab-pane
        label="最新音乐"
        name="sixth"
      >
        最新音乐
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import Recommendation from "@/components/foundMusic/recommendation/Recommendation.vue";
import Playlist from "@/components/foundMusic/playlist/Playlist";
import type { TabsPaneContext } from "element-plus";
import router from "@/router";

//使用仓库全局 变量
import { useGlobalStore } from "@/store/global";
const useGlobal = useGlobalStore();

const activeName = useGlobal.activeName;


const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
  console.log(tab.props.name);
  useGlobal.setActiveName(tab.props.name);

  if (tab.index == 2) {
    router.push("/foundMusic/playlist");
  }
};
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
::v-deep(.el-tabs) {
  .el-tabs__item {
    color: #d5d5d5;
    @include theme(color, "font-color");
  }
  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: #409eff;
  }
  .el-tabs__active-bar {
    @include theme(background-color, "font-color");
  }
}
</style>