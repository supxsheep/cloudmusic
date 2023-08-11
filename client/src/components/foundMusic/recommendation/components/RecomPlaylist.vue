<template>
  <div class="recom-playlist">
    <h2 class="title">
      推荐歌单
      <el-icon>
        <ArrowRight />
      </el-icon>
    </h2>
    <div class="playlist">
      <div class="list recom">
        <div class="list-img">
          <span>{{12}}</span>
        </div>
        <div class="title">"每日歌曲推荐"</div>
      </div>
      <div
        class="list"
        v-for="item in personalizedList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <div class="list-img">
          <img
            :src="item.picUrl"
            alt=""
          >
          <span class="playCount">{{item.playCount}}</span>
        </div>
        <div class="title">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { personalizedApi } from "@/api/foundMusic/recommendation";
import router from "@/router";
/**
 * 轮播图获取
 */
let personalizedList = ref([]);
const getPersonalized = async () => {
  let res = await personalizedApi();
  personalizedList.value = res.result.slice(0, 9);
  // console.log(personalizedList.value);
};

//去歌单详情
const goDetail = (id) => {
  router.push({
    name: "PlaylistDetail",
    params: {
      id,
    },
  });
};

onMounted(() => {
  getPersonalized();
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.recom-playlist {
  margin-bottom: 50px;
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    @include theme(color, "font-color");
  }
  .playlist {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    .recom {
      .list-img {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .list {
      width: 140px;
      height: 200px;
      cursor: pointer;
      .list-img {
        height: 140px;
        margin-bottom: 10px;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .playCount {
          position: absolute;
          top: 5px;
          right: 5px;
        }
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>