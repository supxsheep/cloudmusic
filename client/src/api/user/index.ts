import { getApi } from "@/utils/http";

/**
 * 获取歌单所有标签
 * @returns
 */
export const catlistApi = (data?: object) => getApi("/comment/playlist", data);
