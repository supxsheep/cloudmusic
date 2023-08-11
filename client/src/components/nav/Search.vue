<template>
  <div class="search-view">
    <div class="router">
      <el-icon @click="router.go(-1)">
        <ArrowLeft />
      </el-icon>
      <el-icon @click="router.go(1)">
        <ArrowRight />
      </el-icon>
    </div>
    <div class="search-fn">
      <el-input
        v-model="input1"
        size="small"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft, ArrowRight, Search } from "@element-plus/icons-vue";
import router from "@/router";
const input1 = ref("");
</script>

<style scoped lang="scss">
@import "@/style/themeMixin";
.search-view {
  height: 100%;
  display: flex;
  align-items: center;
  .router {
    width: 50px;
    display: flex;
    justify-content: space-around;
    .el-icon {
      cursor: pointer;
    }
  }
  .search-fn {
    & ::v-deep(.el-input) {
      .el-input__wrapper {
        border-radius: 15px;
        @include theme(background-color, "search-background-color");
        @include theme(border-color, "search-background-color");
      }
    }
  }
}
</style>