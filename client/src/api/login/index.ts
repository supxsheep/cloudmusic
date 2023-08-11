import { getApi } from "@/utils/http";

/**
 * 二维码key生成
 * @returns
 */
export const qrKeyApi = () => getApi("/login/qr/key");

/**
 * 二维码生成
 */
export const qrApi = (data: object) => getApi("/login/qr/create", data);

/**
 * 游客登录
 */
export const touristsApi = () => getApi("/register/anonimous");

/**
 * 手机登录--发送验证码
 */
export const sendVerificationCodeApi = (data: object) =>
  getApi("/captcha/sent", data);

/**
 * 手机登录--验证验证码
 */
export const verifyCodeApi = (data: object) => getApi("/captcha/verify", data);

/**
 * 退出登录
 */
export const loginOutApi = () => getApi("/logout");

/**
 * 登录状态
 */
export const loginStatusApi = () => getApi("/login/status");
