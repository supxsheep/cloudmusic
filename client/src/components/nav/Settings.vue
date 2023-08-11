<template>
  <div class="setting-view">
    <div class="left">
      <div class="login">
        <el-avatar
          @click="handleLogin"
          class="mr-3"
          :size="24"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span>未登录</span>
      </div>
      <el-icon>
        <Operation />
      </el-icon>
      <el-icon>
        <Setting />
      </el-icon>
      <el-icon>
        <Message />
      </el-icon>
    </div>
    <el-divider direction="vertical" />
    <div class="right">
      <el-icon>
        <Notification />
      </el-icon>
      <el-icon>
        <SemiSelect />
      </el-icon>
      <el-icon>
        <FullScreen />
      </el-icon>
      <el-icon>
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Operation,
  Setting,
  Message,
  Notification,
  SemiSelect,
  FullScreen,
  Close,
} from "@element-plus/icons-vue";

/**
 * 登录
 */
const handleLogin = () => {};
</script>

<style scoped lang="scss">
.setting-view {
  display: flex;
  height: 100%;
  align-items: center;
  .left {
    width: 170px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 15px;
    justify-content: space-between;
    .login {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
      .el-avatar {
        margin-right: 5px;
      }
    }
  }
  .right {
    width: 100px;
    height: 100%;
    display: flex;
    margin-left: 15px;
    align-items: center;
    justify-content: space-between;
  }
  .el-icon {
    cursor: pointer;
  }
}
</style>