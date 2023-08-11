import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

//引入pinia 全局状态管理
import pinia from "./store";
//引入路由
import router from "./router";
//引入组件 element plus
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

//Prime vue //theme//core//icons
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
//引入Remix Icon样式
import "remixicon/fonts/remixicon.css";

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  // .use(Vuesax)
  .use(PrimeVue)
  .mount("#app");
