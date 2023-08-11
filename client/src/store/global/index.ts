import { defineStore } from "pinia";
import { ref } from "vue";
export const useGlobalStore = defineStore("global", {
  state: () => ({
    activeName: ref("first"),
  }),
  getters: {
    getActiveName: (state) => state.activeName,
  },
  actions: {
    setActiveName(value: string) {
      this.activeName = value;
    },
  },
});
