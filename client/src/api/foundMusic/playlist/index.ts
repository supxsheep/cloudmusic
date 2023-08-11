import { getApi } from "@/utils/http";

/**
 * 获取歌单所有标签
 * @returns
 */
export const catlistApi = () => getApi("/playlist/catlist");

/**
 * 热门歌单分类
 */
export const hotCatlistApi = () => getApi("/playlist/hot");

/**
 * 网友精选歌单
 */
export const selectSongApi = (data?: object) => getApi("/top/playlist", data);

/**
 * 精品歌单
 */
export const songListApi = (data?: object) =>
  getApi("/top/playlist/highquality", data);

/**
 * 精品歌单标签
 */
export const boutiqueTagsApi = () => getApi("/playlist/highquality/tags");

/**
 * 获取歌单详情
 */
export const playlistDetailApi = (data?: object) => getApi("/playlist/detail",data);
/**
 * 获取歌单详情中的评论
 * @params id
 */
export const commentApi = (data?: object) => getApi("/comment/playlist",data);
