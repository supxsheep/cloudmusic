<template>
  <div class="popula-podcasts">
    <h2 class="title">
      热门播客
      <el-icon>
        <ArrowRight />
      </el-icon>

    </h2>
    <div class="podcasts">
      <div
        class="list"
        v-for="item in personalizedList"
        :key="item.id"
      >
        <div class="list-img">
          <img
            :src="item.picUrl"
            alt=""
          >
          <el-icon>
            <VideoPlay />
          </el-icon>
        </div>
        <div class="description">
          <div class="title">
            {{}}
          </div>
          <div class="type"></div>
          <div class="detail"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  VideoPlay,
  CaretRight,
  Timer,
} from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.popula-podcasts {
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
     margin-bottom: 20px;
    @include theme(color, "font-color");
  }
  .podcasts {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    margin-bottom: 10px;
  }
}
</style>