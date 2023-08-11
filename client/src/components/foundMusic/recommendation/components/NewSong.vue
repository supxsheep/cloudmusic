<template>
  <div class="main">
    <h2 class="title">
      最新音乐
      <el-icon>
        <ArrowRight />
      </el-icon>
    </h2>
    <div class="item">
      <div
        class="list"
        v-for="item in newSongList"
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
        <div class="desc">
          <p class="song">
            {{`${item.name}`}}
            <template v-if="item.song.alias[0]">
              {{`(${item.song.alias[0]})`}}
            </template>
          </p>
          <p class="name">
            <span
              v-for="(artist,index) in item.song.artists"
              :key="artist.id"
            >
              {{artist.name}}
              <template v-if="index != item.song.artists.length-1">
                {{"/ "}}
              </template>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRight, VideoPlay } from "@element-plus/icons-vue";
import { newsongApi } from "@/api/foundMusic/recommendation";

/**
 * 最新音乐资源获取
 */
let newSongList = ref([]);
const getNewSong = async () => {
  let res = await newsongApi();
  newSongList.value = res.result;
  // console.log(newSongList.value);
};

onMounted(() => {
  getNewSong();
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.main {
  margin-bottom: 50px;
  @include theme(color, "font-color");
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list {
      width: 245px;
      height: 50px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .list-img {
        width: 50px;
        height: 50px;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .el-icon {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 28px;
          color: white;
        }
      }
      .desc {
        width: 180px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .song {
          width: 180px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>