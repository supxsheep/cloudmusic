<template>
  <div class="main">
    <h2 class="title">
      推荐MV
      <el-icon>
        <ArrowRight />
      </el-icon>
    </h2>
    <div class="item">
      <div
        class="list"
        v-for="item in MVList"
        :key="item.id"
      >
        <div class="list-img">
          <img
            :src="item.picUrl"
            alt=""
          >
          <p class="count">
            <el-icon>
              <VideoPlay />
            </el-icon>
            <span>{{item.playCount}}</span>
          </p>
        </div>
        <div class="title">
          <p>{{item.name}}</p>
          <p>{{item.artistName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRight, VideoPlay } from "@element-plus/icons-vue";
import { mvApi } from "@/api/foundMusic/recommendation";

/**
 * 推荐MV资源获取
 */
let MVList = ref([]);
const getMVList = async () => {
  let res = await mvApi();
  MVList.value = res.result;
  // console.log(MVList.value);
};

onMounted(() => {
  getMVList();
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.main {
  margin-bottom: 50px;
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    @include theme(color, "font-color");
  }
  .item {
    display: flex;
    // justify-content: space-between;
    .list {
      width: 245px;
      height: 175px;
      cursor: pointer;
      margin-right: 10px;

      .list-img {
        height: 135px;
        margin-bottom: 10px;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .count {
          top: 5px;
          right: 5px;
          display: flex;
          color: white;
          align-items: center;
          position: absolute;
          .el-icon {
            margin-right: 5px;
          }
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