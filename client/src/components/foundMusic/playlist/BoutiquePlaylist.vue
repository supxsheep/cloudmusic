<template>
  <div class="main">
    <div class="title">
      <h2>
        精品歌单
      </h2>
      <div
        class="all"
        @click="showAllTags = !showAllTags"
      >
        <div class="all-btn">
          {{selectTag}}
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
        <div
          class="tags-cat"
          v-show="showAllTags"
        >
          <div class="wrap">
            <span
              :class="{'allsonglist':true,'tagActive':'全部歌单' == selectTag}"
              @click="handleSelectTag('全部歌单')"
            >全部歌单</span>
          </div>
          <div class="wrap1">
            <span
              :class="{'tagActive':cate.name == selectTag}"
              @click="handleSelectTag(cate.name)"
              v-for="(cate,index) in tags"
              :key="index"
            >{{cate.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div
        class="list"
        v-for="item in songList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <div class="list-img">
          <el-image
            style="width: 100%; height: 100%;"
            :src="item.coverImgUrl"
            lazy
          >
          </el-image>
          <p class="count">
            <el-icon>
              <VideoPlay />
            </el-icon>
            <span>{{item.playCount}}</span>
          </p>
        </div>
        <div class="desc">
          <p class="playlist-name">{{item.name}}</p>
          <p class="nickname">{{'by '+item.creator.nickname}}</p>
          <div class="tags">
            <span
              v-for="(tag,index) in item.tags"
              :key="index"
            >
              {{tag}} {{index==item.tags.length-1?"":"."}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { VideoPlay, ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { songListApi, boutiqueTagsApi } from "@/api/foundMusic/playlist";

//路由
const route = useRoute();
let showAllTags = ref(false);
let selectTag = ref("全部歌单");

//切换标签
const handleSelectTag = (cate) => {
  console.log(cate);
  selectTag.value = cate;
  getSongList(cate);
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

/**
 * 精品歌单标签
 */
let tags = ref([]);
const getBoutiqueTags = async () => {
  let res = await boutiqueTagsApi();
  tags.value = res.tags;
  // console.log(tags.value);
};

/**
 * 精品歌单
 */
let songList = ref([]);
const getSongList = async (cat) => {
  let res = await songListApi({ cat });
  songList.value = res.playlists;
  // console.log(songList.value);
};
onMounted((e) => {
  getSongList(route.params.cate);
  getBoutiqueTags();
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.main {
  font-size: 14px;
  @include theme(color, "font-color");
  .title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .all {
      position: relative;
      .all-btn {
        height: 30px;
        display: flex;
        padding: 0 10px;
        cursor: pointer;
        text-align: center;
        align-items: center;
        border-radius: 15px;
        justify-content: center;
        border: 1px solid grey;
      }
      .all-btn:hover {
        background-color: #363636;
      }
      .tags-cat {
        width: 600px;
        height: 300px;
        background-color: #363636;
        box-shadow: 0 0 5px #181818;
        position: absolute;
        top: 40px;
        right: 0;
        z-index: 99;
        .wrap {
          height: 50px;
          border-bottom: 1px solid #4a4a4a;
          display: flex;
          align-items: center;
          padding: 0 40px 0;
          .allsonglist {
            padding: 5px;
            cursor: pointer;
            border-radius: 15px;
            border: 1px solid transparent;
          }
        }
        .wrap1 {
          display: flex;
          padding: 0 40px 0;
          margin-bottom: 10px;
          flex-wrap: wrap;
          span {
            font-size: 12px;
            display: inline-block;
            width: 100px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list {
      width: 350px;
      height: 135px;
      display: flex;
      margin-bottom: 20px;
      .list-img {
        width: 135px;
        height: 135px;
        background-color: plum;
        border-radius: 7px;
        overflow: hidden;
        margin-right: 10px;
      }
      .desc {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .nickname {
          color: #6b6b6b;
        }
        .playlist-name:hover {
          cursor: pointer;
          color: #ffffff;
        }
        .nickname:hover {
          cursor: pointer;
          color: #8b8b8b;
        }
        .tags {
          color: #ec4141;
          border: 1px solid #9f3838;
        }
      }
    }
  }
}
</style>