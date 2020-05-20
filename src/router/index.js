import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Utils from "../views/Utils.vue";
import CreateIssueRequest from "../views/CreateIssueRequest.vue";
import CreateVerifyRequest from "../views/CreateVerifyRequest.vue";
import PerformIssueRequest from "../views/PerformIssueRequest.vue";
import PerformVerifyRequest from "../views/PerformVerifyRequest.vue";
import ConnectorSelect from "../components/ConnectorSelect.vue";

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
    path: "/connector",
    name: "Connector",
    component: ConnectorSelect,
  },
  {
    path: "/issue/:connector/:requestId",
    name: "PerformIssueRequest",
    component: PerformIssueRequest,
    props: true,
  },
  {
    path: "/issue/:token",
    name: "CreateIssueRequest",
    component: CreateIssueRequest,
    props: true,
  },
  {
    path: "/verify/:connector/:requestId",
    name: "PerformVerifyRequest",
    component: PerformVerifyRequest,
    props: true,
  },
  {
    path: "/verify/:token",
    name: "CreateVerifyRequest",
    component: CreateVerifyRequest,
    props: true,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
