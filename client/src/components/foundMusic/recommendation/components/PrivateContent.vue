<template>
  <div class="main">
    <h2 class="title">
      独家放送
      <el-icon>
        <ArrowRight />
      </el-icon>
    </h2>
    <div class="item">
      <div
        class="list"
        v-for="item in privateContent"
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
        <div class="title">
          {{item.copywriter}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRight, VideoPlay } from "@element-plus/icons-vue";
import { privateContentApi } from "@/api/foundMusic/recommendation";

/**
 * 独家放送资源获取
 */
let privateContent = ref([]);
const getPrivateContent = async () => {
  let res = await privateContentApi();
  privateContent.value = res.result;
  // console.log(privateContent.value);
};

onMounted(() => {
  getPrivateContent();
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
    justify-content: space-between;
    .list {
      width: 245px;
      height: 175px;
      cursor: pointer;
      .list-img {
        height: 135px;
        margin-bottom: 10px;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .el-icon {
          position: absolute;
          top: 5px;
          left: 5px;
          color: white;
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