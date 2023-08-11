<template>
  <div class="detail">
    <div class="playlist-header">
      <div class="playlist-img">
        <el-image
          :src="playlist.coverImgUrl"
          lazy
        ></el-image>
      </div>
      <div class="playlist-desc">
        <div class="title">{{playlist.name}}</div>
        <div class="creator">
          <el-avatar
            :size="32"
            :src="playlist.creator?.avatarUrl"
            @click="goUser(playlist.id)"
          />
          <span
            class="nickname"
            @click="goUser(playlist.id)"
          >{{playlist.creator?.nickname}}</span>
          <span class="createTime">{{playlist.createTime+'创建'}}</span>
        </div>
        <div class="operation">
          <div class="playall">
            <el-icon>
              <CaretRight />
            </el-icon>
            <span>播放全部</span>
          </div>
          <div class="collection">
            <el-icon>
              <CirclePlus />
            </el-icon>
            <span>收藏{{`(${playlist.subscribedCount})`}}</span>
          </div>
          <div class="sharing">
            <el-icon>
              <Share />
            </el-icon>
            <span>分享{{`(${playlist.shareCount})`}}</span>
          </div>
          <div class="loadingAll">
            <el-icon>
              <Download />
            </el-icon>
            <span>下载全部</span>
          </div>
        </div>
        <div class="tags">
          标签: <span
            v-for="(tag,index) in playlist.tags"
            :key="index"
            @click="goPlaylist(tag)"
          >
            {{tag}}
            <template v-if="index !== playlist.tags.length-1">
              /
            </template>
          </span>
        </div>
        <div class="count">
          <span>歌曲：{{playlist.trackCount}}</span>
          <span>播放：{{playlist.playCount}}</span>
        </div>
        <div class="desc">
          简介: <span v-html="playlist.description"></span>
        </div>
      </div>
    </div>
    <div class="privileges">
      <div class="tabs">
        <div
          class="search"
          v-show="activeName=='first'"
        >
          <el-input
            v-model="searchMusicKey"
            size="small"
            placeholder="搜索歌单音乐"
            :prefix-icon="Search"
          />
        </div>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="歌曲列表"
            name="first"
          >
            <el-table
              :data="tracks"
              stripe
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="45"
              />
              <el-table-column
                prop="date"
                label="操作"
                width="70"
              >
                <template #default>
                  <i class="ri-heart-line"></i>
                  <i class="ri-download-2-line"></i>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="标题"
                width="250"
              />
              <el-table-column
                prop="ar[0].name"
                label="歌手"
                width="150"
              />
              <el-table-column
                prop="al.name"
                label="专辑"
                width="150"
              />
              <el-table-column
                prop="dt"
                label="时间"
              />
            </el-table>
          </el-tab-pane>

          <el-tab-pane
            label="评论"
            name="second"
          >
            <el-form
              class="richText"
              :model="form"
            >
              <el-form-item>
                <el-input
                  v-model="form.desc"
                  type="textarea"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">评论</el-button>
              </el-form-item>
            </el-form>
            <div class="comment-layou">
              <template
                v-for="(comment,index) in comments"
                :key="index"
              >
                <div class="comment">
                  <template v-if="index == 0">
                    <h4>精彩评论</h4>
                  </template>
                  <template v-else>
                    <h4>最新评论 ({{totalComments}})</h4>
                  </template>
                  <div
                    class="com"
                    v-for="item in comment"
                    :key="item.commentId"
                    :style="{'border-bottom':index != 0 ? '1px solid #363636':''}"
                  >
                    <div class="avatar">
                      <el-avatar
                        :size="40"
                        :src="item.user.avatarUrl"
                        @click="goUser(item.user.userId)"
                      />
                    </div>
                    <div class="content">
                      <div class="top">
                        <span
                          class="nickname"
                          @click="goUser(item.user.userId)"
                        >{{item.user.nickname}}
                          <template v-if="item.user.vipRights?.redVipLevel">
                            {{' (CVIP'+item.user.vipRights.redVipLevel+') '}}
                          </template>
                        </span>
                        <span>{{" : "}}</span>
                        <span>{{item.content}}</span>
                      </div>
                      <template v-if="item.beReplied.length">
                        <div class="reply">
                          <span class="nickname">@{{item.beReplied[0].user.nickname + ' : '}}</span>
                          <span>{{item.beReplied[0].content}}</span>
                        </div>
                      </template>
                      <div class="bottom">
                        <div class="time">
                          {{item.timeStr +' ' + item.time}}
                        </div>
                        <div class="operation">
                          <span class="like">
                            <el-icon
                              size="18"
                              :color="item.liked?'red':''"
                            >
                              <Pointer />
                            </el-icon>
                            {{item.likedCount}}
                          </span>
                          <el-divider direction="vertical" />
                          <el-icon size="18">
                            <Share />
                          </el-icon>
                          <el-divider direction="vertical" />
                          <el-icon size="18">
                            <ChatDotRound />
                          </el-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </el-tab-pane>

          <el-tab-pane
            label="收藏着"
            name="third"
          >
            <div class="collector-layout">
              <div
                class="collector"
                v-for="collector in subscribers"
                :key="collector.userId"
              >
                <el-avatar
                  :size="100"
                  :src="collector.avatarUrl"
                  @click="goUser(collector.userId)"
                />
                <div>
                  <div>
                    <span
                      class="nickName"
                      @click="goUser(collector.userId)"
                    >{{collector.nickname}}</span>
                    <template v-if="collector.gender == 1">
                      <span>
                        <el-icon>
                          <Male />
                        </el-icon>
                      </span>
                    </template>
                    <template v-else>
                      <span>
                        <el-icon>
                          <Female />
                        </el-icon>
                      </span>
                    </template>
                  </div>
                  <span
                    class="signature"
                    v-if="collector.signature"
                  >{{collector.signature}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//导入
import router from "@/router";
import { useRoute } from "vue-router";
import {
  CaretRight,
  CirclePlus,
  Share,
  Download,
  Search,
  Pointer,
  ChatDotRound,
  Male,
  Female,
} from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { playlistDetailApi, commentApi } from "@/api/foundMusic/playlist";
import type { TabsPaneContext } from "element-plus";

//使用仓库全局 变量
import { useGlobalStore } from "@/store/global";
const useGlobal = useGlobalStore();

//切换tab
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  activeName.value = tab.props.name;
};

//使用路由
const route = useRoute();
//跳转歌单页面
const goPlaylist = (tag) => {
  useGlobal.setActiveName("third");
  router.push({
    name: "Playlist",
    params: {
      cate: tag,
    },
  });
};
//跳转用户界面
const goUser = (id) => {
  router.push({
    name: "User",
    params: {
      id,
    },
  });
};

//搜索歌单--关键词
const searchMusicKey = ref("");

/**
 * 文本框输入评论
 */
const form = reactive({
  desc: "",
});

const onSubmit = (e) => {
  console.log(form.desc);
};

// 获取详情
const playlist = ref({}); //歌单详细
const tracks = ref([]); //歌曲
const subscribers = ref([]); //收藏者
const getPlaylistDetail = async (id) => {
  let res = await playlistDetailApi({ id });
  playlist.value = res.playlist;
  tracks.value = res.playlist.tracks;
  subscribers.value = res.playlist.subscribers;
  console.log(playlist.value);
};
/**
 * 获取歌单评论
 */
let comments = ref([]);
let totalComments = ref(0);
const getComment = async (id) => {
  let res = await commentApi({ id });
  totalComments.value = res.total;
  comments.value = [res.hotComments, res.comments];
  // console.log(comments.value);
};

//渲染
onMounted(() => {
  getPlaylistDetail(route.params.id);
  getComment(route.params.id);
});
</script>

<style scoped lang="scss">
@import "@/style/_themeMixin.scss";
.detail {
  @include theme(color, "font-color");
  .playlist-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .playlist-img {
      width: 185px;
      height: 185px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .playlist-desc {
      width: 565px;
      .title {
        font-size: 22px;
        margin-bottom: 10px;
      }
      .creator {
        display: flex;
        align-items: center;
        .el-avatar {
          cursor: pointer;
        }
        .nickname {
          margin: 0 10px;
          color: #85b9e6;
          cursor: pointer;
        }
        .createTime {
          color: #8b8b8b;
        }
      }
      .operation {
        display: flex;
        margin: 10px 0;
        div {
          padding: 5px 10px;
          border-radius: 15px;
          border: 1px solid #4b4b4b;
          margin-right: 15px;
          display: flex;
          align-items: center;
          cursor: pointer;
          span {
            margin: 0 5px;
          }
        }
        div:hover {
          background-color: #363636;
        }
        .playall {
          background-color: #ec4141;
        }
        .playall:hover {
          background-color: #d93f3f;
        }
      }
      .tags {
        span {
          color: #85b9e6;
        }
        span:hover {
          cursor: pointer;
        }
      }
      .count {
        span {
          margin-right: 10px;
        }
      }
      .desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .privileges {
    & ::v-deep(.el-tabs__item) {
      color: white;
    }
    & ::v-deep(.is-active) {
      font-size: 20px;
    }
    & ::v-deep(.el-tabs__active-bar) {
      background-color: #ec4141;
    }
    .tabs {
      position: relative;
      .search {
        height: 20px;
        position: absolute;
        top: 10px;
        right: 0;
        cursor: pointer;
        z-index: 99;
      }
      .search {
        & ::v-deep(.el-input) {
          .el-input__wrapper {
            border-radius: 15px;
            @include theme(background-color, "search-background-color");
            @include theme(border-color, "search-background-color");
          }
        }
      }
      .el-table {
        background-color: pink;
        & ::v-deep(.el-table__inner-wrapper) {
          background-color: pink;
        }
      }

      .collector-layout {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .collector {
          width: 380px;
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          .el-avatar {
            margin-right: 10px;
          }
        }
      }
      //精彩评论
      .comment-layou {
        font-size: 12px;
        .comment {
          width: 100%;
          .com {
            padding: 20px 0;
            display: flex;

            .avatar {
              margin-right: 10px;
              cursor: pointer;
            }
            .content {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .nickname {
                color: #85b9e6;
                cursor: pointer;
              }
              .top {
                margin-bottom: 10px;
              }
              .reply {
                padding: 10px 5px;
                margin-bottom: 15px;
                background-color: #333333;
              }
              .bottom {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .time {
                  color: #616b6b;
                }
                .operation {
                  display: flex;
                  align-items: center;
                  .like {
                    display: flex;
                    align-items: center;
                  }
                  .el-icon {
                    margin: 0 5px;
                    cursor: pointer;
                    color: #8b8b8b;
                  }
                  .el-icon:hover {
                    color: #b5b5b5;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>