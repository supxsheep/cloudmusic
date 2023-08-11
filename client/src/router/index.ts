import { createRouter, createWebHistory } from "vue-router";
import { start, close } from "@/plugins";

const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/foundMusic",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/foundMusic",
        name: "FoundMusic",
        component: () => import("@/views/foundMusic/index.vue"),
        children: [
          {
            path: "/foundMusic/playlist/:cate?",
            name: "Playlist",
            component: () =>
              import("@/components/foundMusic/playlist/Playlist.vue"),
          },
          {
            path: "/foundMusic/boutiquePlaylist/:cate",
            name: "BoutiquePlaylist",
            component: () =>
              import("@/components/foundMusic/playlist/BoutiquePlaylist.vue"),
          },
        ],
      },
      {
        path: "/podcast",
        name: "Podcast",
        component: () => import("@/views/podcast/index.vue"),
      },
      {
        path: "/video",
        name: "Video",
        component: () => import("@/views/video/index.vue"),
      },
      {
        path: "/attention",
        name: "Attention",
        component: () => import("@/views/attention/index.vue"),
      },
      {
        path: "/live",
        name: "Live",
        component: () => import("@/views/live/index.vue"),
      },
      {
        path: "/privateFM",
        name: "PrivateFM",
        component: () => import("@/views/privateFM/index.vue"),
      },
      {
        path: "/loveMusic",
        name: "LoveMusic",
        component: () => import("@/views/loveMusic/index.vue"),
      },
      {
        path: "/download",
        name: "Download",
        component: () => import("@/views/download/index.vue"),
      },
      {
        path: "/recentlyPlayed",
        name: "RecentlyPlayed",
        component: () => import("@/views/recentlyPlayed/index.vue"),
      },
      {
        path: "/playlistDetail/:id",
        name: "PlaylistDetail",
        component: () => import("@/views/playlistDetail/index.vue"),
      },
      {
        path: "/user/:id",
        name: "User",
        component: () => import("@/views/userDetail/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//路由前置守卫
router.beforeEach((to, from, next) => {
  start(); //开启进度条
  next();
});
//路由后置守卫
router.afterEach((to, from) => {
  close(); //完成进度条
});

// 导出路由
export default router;
