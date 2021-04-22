import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

import Utils from "../views/Utils.vue";
import UtilsHome from "../views/utils/UtilsHome.vue";
import CreateToken from "../views/utils/CreateToken.vue";
import RegisterOrganization from "../views/utils/RegisterOrganization.vue";
import DefineCredentialType from "../views/utils/DefineCredentialType.vue";
import DefineJolocomType from "../views/utils/DefineJolocomType.vue";
import DefineIndySchema from "../views/utils/DefineIndySchema.vue";
import DefineTrinsicSchema from "../views/utils/DefineTrinsicSchema.vue";

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
        path: "",
        name: "UtilsHome",
        component: UtilsHome,
      },
      {
        path: "/utils/create-token",
        name: "CreateToken",
        component: CreateToken,
      },
      {
        path: "/utils/organizations",
        name: "RegisterOrganization",
        component: RegisterOrganization,
      },
      {
        path: "/utils/credential-types",
        name: "DefineCredentialType",
        component: DefineCredentialType,
      },
      {
        path: "/utils/jolocom-types",
        name: "DefineJolocomType",
        component: DefineJolocomType,
      },
      {
        path: "/utils/indy-schemas",
        name: "DefineIndySchema",
        component: DefineIndySchema,
      },
      {
        path: "/utils/trinsic-types",
        name: "DefineTrinsicType",
        component: DefineTrinsicType,
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
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === "development" ? "hash" : "history", // FIXME history in production.
  base: process.env.BASE_URL,
  routes,
});

export default router;
