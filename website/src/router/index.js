import Vue from "vue";
import VueRouter from "vue-router";
import Website from "@/Website";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "开发者",
    component: Website
  },
  {
    path: "/pm",
    name: "产品经理",
    component: Website
  },
  {
    path: "/designer",
    name: "设计师",
    component: Website
  },
  {
    path: "/developer",
    name: "开发者",
    component: Website
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0;
  next()
})

export default router;
