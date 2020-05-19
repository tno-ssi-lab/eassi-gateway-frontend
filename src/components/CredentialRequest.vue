<template>
  <div class="credential-request">
    <slot></slot>

    <b-overlay :show="status === 'loading'">
      <wallet-select
        :enabled-wallets="availableWallets"
        @choice="(wallet) => (selectedWallet = wallet)"
      />
    </b-overlay>

    <p v-if="status === 'error'" class="text-danger">Something went wrong :(</p>
  </div>
</template>

<script>
import axios from "axios";

import WalletSelect from "./WalletSelect.vue";
import IrmaVerify from "./IrmaVerify.vue";
import JolocomVerify from "./JolocomVerify.vue";
import JolocomIssue from "./JolocomIssue.vue";

const WAIT_TIME = 1000;

const componentMap = {
  jolocom: {
    verify: JolocomVerify,
    issue: JolocomIssue,
  },
  irma: {
    verify: IrmaVerify,
  },
};

export default {
  name: "CredentialRequest",
  components: {
    WalletSelect,
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
      availableWallets: [],
      selectedWallet: null,
    };
  },
  computed: {
    requestComponent() {
      if (this.request && this.selectedWallet) {
        return componentMap[this.selectedWallet][this.type];
      }
      return null;
    },
    requestId() {
      // TODO: get from request
      if (!this.request) {
        return null;
      }
      return `credential-${this.type}-request:${this.request.uuid}`;
    },
  },
  sockets: {
    // connect() {
    //   console.log("Connecting to backend");
    //   this.$socket.emit("started", this.requestId);
    // },
    // update(status) {
    //   console.log("Received new status from backend");
    //   this.status = status;
    // },
    redirect({ status, redirectUrl }) {
      // TODO: Maybe we don't need to show received data?
      console.log("Received redirect", status);
      this.status = status;
      setTimeout(() => (window.location = redirectUrl), WAIT_TIME);
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
        this.availableWallets = result.data.availableConnectors;
        this.status = "ready";
        this.$emit("request", this.request);
      } catch (e) {
        this.$emit("error", e);
        this.status = "error";
        console.error(e);
      }
    },
  },
};
</script>
