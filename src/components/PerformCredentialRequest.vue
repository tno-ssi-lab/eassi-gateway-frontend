<template>
  <div class="perform-credential-request py-5 text-center">
    <connector-image v-if="connectorConfig" :connector="connectorConfig" />

    <h2>{{ title }} {{ connectorConfig.title }} credentials</h2>

    <p v-if="notice" v-text="notice"></p>

    <slot></slot>

    <div v-if="status === statuses.loading" class="py-5 text-center">
      <b-spinner variant="secondary" />
    </div>

    <component
      :is="component"
      v-if="
        status !== statuses.loading && status !== statuses.error && component
      "
      v-bind="connectorData"
      :request-id="requestId"
      v-on="{ cancel, success, error, update }"
    ></component>
  </div>
</template>

<script>
import axios from "axios";

import { CONNECTORS } from "../constants";
import ConnectorImage from "./ConnectorImage.vue";
import JolocomIssue from "./JolocomIssue.vue";
import JolocomVerify from "./JolocomVerify.vue";
import IrmaVerify from "./IrmaVerify.vue";

const componentMap = {
  jolocom: {
    issue: JolocomIssue,
    verify: JolocomVerify,
  },
  irma: {
    verify: IrmaVerify,
  },
};

const statuses = {
  loading: "loading",
  ready: "ready",
  handling: "handling",
  error: "error",
  cancelled: "cancelled",
  success: "success",
};

const noticeMap = {
  loading: "Starting session...",
  handling: "Handling data...",
  error: "Something went wrong, you will be redirected shortly.",
  cancelled: "You cancelled the request, you will be redirected shortly.",
  success: "Success! We'll redirect you shortly.",
};

const WAIT_TIME = 1000;

export default {
  name: "PerformCredentialRequest",
  components: {
    ConnectorImage,
  },
  props: {
    requestId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["issue", "verify"].includes(value),
    },
    connector: {
      type: String,
      required: true,
      validator: (value) => Object.keys(componentMap).includes(value),
    },
  },
  data() {
    return {
      socketConnected: false,
      status: statuses.loading,
      connectorData: null,
    };
  },
  computed: {
    component() {
      const c = componentMap[this.connector][this.type];
      if (!c) {
        throw new Error("Component is unavailable");
      }

      return c;
    },
    connectorConfig() {
      return CONNECTORS.find((c) => c.name == this.connector);
    },
    title() {
      let initial = `${this.type[0]}`.toLocaleUpperCase();
      return `${initial}${this.type.slice(1)}`;
    },
    statuses() {
      return statuses;
    },
    notice() {
      return noticeMap[this.status];
    },
  },
  sockets: {
    connect() {
      this.setupSocketConnection();
    },
    update(status) {
      console.log("Received new status from backend");
      this.status = status;
    },
    redirect({ status, redirectUrl }) {
      console.log("Received redirect", status, redirectUrl);
      this.status = status;
      setTimeout(() => (window.location = redirectUrl), WAIT_TIME);
    },
  },
  created() {
    setTimeout(this.performRequest.bind(this), WAIT_TIME);
  },
  mounted() {
    if (!this.socketConnected) {
      console.log("Socket not set up, trying again.");
      this.setupSocketConnection();
    }
  },
  methods: {
    setupSocketConnection() {
      console.log("Connecting to socket", this.requestId);
      this.$socket.client.emit("request-started", this.requestId);
    },
    async performRequest() {
      try {
        const result = await axios.get(`/api/${this.type}/${this.connector}`, {
          params: {
            [`${this.type}RequestId`]: this.requestId,
          },
        });
        console.log(result.data);
        this.connectorData = result.data;
        const that = this;
        setTimeout(() => (that.status = "ready"), WAIT_TIME);
      } catch (e) {
        console.error(e);
        this.error();
      }
    },
    update(status) {
      console.log("Received status update from child");
      this.status = status;
    },
    cancel() {
      this.$socket.client.emit("request-cancelled", this.requestId);
      this.status = "cancelled";
    },
    error() {
      this.$socket.client.emit("request-error", this.requestId);
      this.status = "error";
    },
    success() {
      this.$socket.client.emit("request-success", this.requestId);
      this.status = "success";
    },
  },
};
</script>
