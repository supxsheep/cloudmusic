<template>
  <div class="playlist">
    <div
      class="card"
      @click="turnBoutiquePlaylist(selectTag)"
    >
      <el-image
        class="bg-image"
        style="width: 100%; height: 100%;"
        :src="defaultSong.coverImgUrl"
        lazy
      >
      </el-image>
      <div class="songlist-img">
        <el-image
          style="width: 100%; height: 100%"
          :src="defaultSong.coverImgUrl"
        >
        </el-image>
      </div>
      <div class="songlist-desc">
        <div class="boutique-songlist">精品歌单</div>
        <p class="name">{{defaultSong.name}}</p>
      </div>
    </div>
    <div class="tags">
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
              :class="{'allsonglist':true,'tagActive':all.name == selectTag}"
              @click="handleSelectTag(all.name)"
            >{{all.name}}</span>
          </div>
          <div
            class="
              wrap1"
            v-for="(cate,index) in categories"
            :key="index"
          >
            <div class="cate">{{cate}}</div>
            <div class="tag">
              <span
                :class="{'tagActive':tag.name == selectTag}"
                v-for="(tag,index) in sub.filter(item=> item.category == index)"
                :key="index"
                @click="handleSelectTag(tag.name)"
              >{{tag.name}}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="hot">
        <span
          :class="{'hot-tags':true,'tagActive':tag.name == selectTag}"
          v-for="tag in hotCatList"
          :key="tag.id"
          @click="handleSelectTag(tag.name)"
        >{{tag.name}}</span>
      </div>
    </div>
    <div class="songlist">
      <SongItem :selectSongList="selectSongList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import {
  catlistApi,
  hotCatlistApi,
  songListApi,
  selectSongApi,
} from "@/api/foundMusic/playlist";
import SongItem from "@/components/foundMusic/playlist/components/SongItem";

//使用路由
const route = useRoute();

let showAllTags = ref(false);
let selectTag = ref("全部歌单");
let defaultSong = ref({});
//切换标签
const handleSelectTag = (cate) => {
  console.log(cate);
  selectTag.value = cate;
  getSelectSong(cate);
  getSongList(cate);
};

//转去 精品歌单
const turnBoutiquePlaylist = (selectTag) => {
  router.push({
    name: "BoutiquePlaylist",
    params: {
      cate: selectTag,
    },
  });
};
/**
 * 热门标签
 */
let hotCatList = ref([]);
const getHotCatlist = async () => {
  let res = await hotCatlistApi();
  hotCatList.value = res.tags;
  // console.log(hotCatList.value);
};

/**
 * 全部标签
 */
let all = ref({}); //全部
let categories = ref([]); //分类
let sub = ref([]); //标签
const getCatlist = async () => {
  let res = await catlistApi();
  all.value = res.all;
  for (const key in res.categories) {
    categories.value.push(res.categories[key]);
  }
  sub.value = res.sub;
};

/**
 * 精品歌单
 */
let songList = ref([]);
const getSongList = async (cat) => {
  let res = await songListApi({ cat });
  songList.value = res.playlists;
  defaultSong.value = res.playlists[0];
  console.log(defaultSong.value);
};

/**
 * 网友精选歌单
 */
let selectSongList = ref([]);
const getSelectSong = async (cat) => {
  let res = await selectSongApi({ cat });
  selectSongList.value = res.playlists;
  // console.log(res.playlists);
};

onMounted(() => {
  getHotCatlist();
  getCatlist();
  if (route.params.cate == "") {
    getSelectSong();
    getSongList();
  } else {
    console.log(route.params.cate);
    selectTag.value = route.params.cate;
    getSelectSong(route.params.cate);
    getSongList(route.params.cate);
  }
  let btn = document.querySelector(".all-btn");
  document.addEventListener("click", (e) => {
    if (e.target != btn) {
      showAllTags.value = false;
    }
  });
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.playlist {
  @include theme(color, "font-color");
  .card {
    width: 100%;
    height: 180px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    .bg-image {
      position: absolute;
      filter: blur(25px);
      z-index: 0;
    }
    .bg-image::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      background: rgba(0, 0, 0, 0.205);
    }
    .songlist-img {
      width: 150px;
      height: 150px;
      background-color: plum;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 15px;
    }
    .songlist-desc {
      z-index: 9;
      .boutique-songlist {
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        margin-bottom: 15px;
        color: #e6aa5b;
        border: 1px solid #e6aa5b;
      }
      .name {
        color: white;
        font-size: 20px;
      }
    }
  }
  .tags {
    width: 100%;
    height: 35px;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 20px;
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
        width: 700px;
        height: 500px;
        background-color: #363636;
        box-shadow: 0 0 5px #181818;
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 99;
        .wrap {
          height: 50px;
          border-bottom: 1px solid #4a4a4a;
          display: flex;
          align-items: center;
          padding: 0 10px 0;
          .allsonglist {
            padding: 5px;
            cursor: pointer;
            border-radius: 15px;
            border: 1px solid transparent;
          }
        }
        .wrap1 {
          display: flex;
          padding: 0 10px 0;
          margin-bottom: 10px;
          .cate {
            padding-left: 10px;
            width: 100px;
            height: 50px;
            display: flex;
          }
          .tag {
            width: 600px;
            display: flex;
            flex-wrap: wrap;
            span {
              font-size: 12px;
              display: inline-block;
              width: 90px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              cursor: pointer;
            }
          }
        }
      }
    }
    .hot {
      .hot-tags {
        color: #8b8b8b;

        padding: 0 5px;
        cursor: pointer;
        display: inline-block;
        transition: 0.4s;
      }
      .hot-tags:hover {
        color: white;
      }
    }
    .tagActive {
      color: #ec4141;
      background-color: #3f3636;
    }
  }
  .songlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>