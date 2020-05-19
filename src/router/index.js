import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Utils from "../views/Utils.vue";
import Issue from "../views/Issue.vue";
import Verify from "../views/Verify.vue";
import WalletSelect from "../components/WalletSelect.vue";

Vue.use(VueRouter);

/**
 * @type {import("vue-router").RouteConfig[]}
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/utils",
    name: "Utils",
    component: Utils,
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: WalletSelect,
  },
  {
    path: "/issue/:token",
    name: "Issue",
    component: Issue,
    props: true,
  },
  {
    path: "/verify/:token",
    name: "Verify",
    component: Verify,
    props: true,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
