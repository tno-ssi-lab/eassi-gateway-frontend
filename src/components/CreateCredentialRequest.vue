<template>
  <div class="create-credential-request">
    <slot></slot>

    <b-overlay :show="status === 'loading'">
      <connector-select
        :enabled-connectors="availableConnectors"
        @choice="emitChoice"
      />
    </b-overlay>
  </div>
</template>

<script>
import axios from "axios";

import ConnectorSelect from "./ConnectorSelect.vue";

const WAIT_TIME = 1000;

export default {
  name: "CredentialRequest",
  components: {
    ConnectorSelect,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["issue", "verify"].includes(value),
    },
  },
  data() {
    return {
      status: "loading",
      request: null,
      availableConnectors: [],
    };
  },
  computed: {
    requestId() {
      // TODO: get from request
      if (!this.request) {
        return null;
      }
      return `credential-${this.type}-request:${this.request.uuid}`;
    },
  },
  created() {
    setTimeout(this.performRequest.bind(this), WAIT_TIME);
  },
  methods: {
    async performRequest() {
      try {
        const result = await axios.get(`/api/${this.type}`, {
          params: {
            token: this.token,
          },
        });
        console.log(result.data);
        this.request = result.data[`${this.type}Request`];
        this.availableConnectors = result.data.availableConnectors;
        this.status = "ready";
        this.$emit("request", this.request);
      } catch (e) {
        this.$emit("error", e);
        this.status = "error";
        console.error(e);
      }
    },
    emitChoice(connector) {
      if (!connector) {
        this.$emit("error", "No connector selected");
        return;
      }

      if (!this.request) {
        this.$emit("error", "Got no request");
        return;
      }

      this.$emit("choice", {
        connector,
        request: this.request,
        requestId: this.requestId,
      });
    },
  },
};
</script>
