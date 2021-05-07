import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home/Home.vue";
import Detail from "../pages/Detail/Detail.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:name",
    name: "Detail",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
