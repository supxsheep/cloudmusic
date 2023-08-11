<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="200px"
  >
    <el-carousel-item
      v-for="item in bannerList"
      :key="item.targetId"
    >

      <img
        :src="item.imageUrl"
        alt=""
      >
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { bannerApi } from "@/api/foundMusic/recommendation";

/**
 * 轮播图获取
 */
let bannerList = ref([]);
const getBanner = async () => {
  let res = await bannerApi();
  bannerList.value = res.banners;
  // console.log(bannerList.value);
};

onMounted(() => {
  getBanner();
});
</script>

<style scoped lang="scss">
.el-carousel {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>