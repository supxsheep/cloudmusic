<template>
  <div
    class="list"
    v-for="item in selectSongList"
    :key="item.id"
    @click="goDetail(item.id)"
  >
    <div class="song-img">
      <el-image
        :src="item.coverImgUrl"
        lazy
      />
      <span class="play-count">
        <el-icon>
          <ArrowRight />
        </el-icon>
        {{item.playCount}}
      </span>
      <span class="nickname">
        <el-icon>
          <ArrowRight />
        </el-icon>
        {{item.creator.nickname}}
      </span>
    </div>
    <div class="desc">
      {{item.name}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import router from "@/router";

const selectSongList = ref([]);
const props = defineProps(["selectSongList"]);

//去歌单详情
const goDetail = (id) => {
  router.push({
    name: "PlaylistDetail",
    params: {
      id,
    },
  });
};

watch(
  () => props.selectSongList,
  (newValue, oldValue) => {
    selectSongList.value = newValue;
  }
);
</script>

<style scoped lang="scss">
.list {
  width: 175px;
  height: 230px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  .song-img {
    width: 175px;
    height: 175px;
    position: relative;
    .el-image {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 5px;
      display: flex;
      align-items: center;
    }
    .nickname {
      position: absolute;
      bottom: 5px;
      display: flex;
      align-items: center;
    }
  }
  .desc {
    padding-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>