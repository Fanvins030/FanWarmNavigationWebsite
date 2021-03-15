import Vue from "vue";
import Website from "./Website.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

import "@assets/css/base.css";

import FanUI from "@components";
Vue.use(FanUI);

import { MY_BASEURL } from "../secret.config";
import axios from "axios";
axios.defaults.baseURL = MY_BASEURL;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(Website)
}).$mount("#website");