import { getApi } from "@/utils/http";

/**
 * banner
 * @returns
 */
export const bannerApi = () => getApi("/banner");

/**
 * 推荐歌单
 */
export const personalizedApi = (data?: object) => getApi("/personalized", data);

/**
 * 独家放送
 */
export const privateContentApi = (data?: object) =>
  getApi("/personalized/privatecontent", data);

/**
 * 最新音乐
 */

export const newsongApi = (data?: object) =>
  getApi("/personalized/newsong", data);

/**
 * 推荐MV
 */
export const mvApi = () => getApi("/personalized/mv");
