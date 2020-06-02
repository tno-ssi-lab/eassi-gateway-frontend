import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Utils from "../views/Utils.vue";
import CreateToken from "../views/utils/CreateToken.vue";
import RegisterOrganization from "../views/utils/RegisterOrganization.vue";

import CreateIssueRequest from "../views/CreateIssueRequest.vue";
import CreateVerifyRequest from "../views/CreateVerifyRequest.vue";
import PerformIssueRequest from "../views/PerformIssueRequest.vue";
import PerformVerifyRequest from "../views/PerformVerifyRequest.vue";

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
    children: [
      {
        path: "/utils/create-token",
        name: "CreateToken",
        component: CreateToken,
      },
      {
        path: "/utils/register-organization",
        name: "RegisterOrganization",
        component: RegisterOrganization,
      },
    ],
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
  mode: "hash", // FIXME history in production.
  base: process.env.BASE_URL,
  routes,
});

export default router;
