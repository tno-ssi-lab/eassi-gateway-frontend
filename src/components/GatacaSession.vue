<template>
  <div class="gataca-session-stub">
    <gataca-qr
      callback-server="https://ssip3.dev.innopsi.xantav.com/connect"
      ref="gatacaQr"
      qr-modal-title="Please scan the QR code"
      qr-modal-description="Scan with your Gataca Wallet app"
      button-text="Start process"
      as-button="true"
    >
    </gataca-qr>
  </div>
</template>

<script>
const RESULT_STATUS = {
  ONGOING: 0,
  SUCCESS: 1,
  FAILED: 2,
};

const appName = "TNOApp";
const tenant = "TNO";
const appPassword = "TNOApp";
const connectServer = "https://ssip3.dev.innopsi.xantav.com/connect";

export default {
  name: "GatacaSession",
  props: {},
  data() {
    return {
      appToken: null,
      sessionToken: null,
    };
  },
  mounted() {
    console.log("Mounted, binding", this.$refs.gatacaQr);
    [
      "createSession",
      "checkStatus",
      "successCallback",
      "errorCallback",
    ].forEach((method) => {
      console.log("Binding", method);
      this.$refs.gatacaQr[method] = this[method].bind(this);
      console.log("Bound", this.$refs.gatacaQr[method]);
    });
  },
  methods: {
    async getAppToken() {
      console.log("Getting App Token");
      if (!this.appToken) {
        let response = await fetch(connectServer + "/admin/v1/login/basic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Tenant: tenant,
            Authorization: "Basic " + btoa(appName + ":" + appPassword),
          },
          body: "{}",
        });
        this.appToken = response.headers.get("Token");

        return this.appToken;
      }

      return this.appToken;
    },
    processData(data) {
      let result = {};
      for (let vc of data?.verifiableCredential) {
        for (let key of Object.keys(vc.credentialSubject)) {
          if (key != "id") {
            result[key] = vc.credentialSubject[key];
          }
        }
      }
      return result;
    },
    async createSession() {
      console.log("Setting up session");

      let endpoint = connectServer + "/api/v1/sessions";
      let response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "jwt " + (await this.getAppToken()),
        },
        body: "{}",
      });
      let data = await response.json();
      this.sessionToken = response.headers.get("Token");

      return data.id;
    },
    async checkStatus(id) {
      console.log("Checking session status");

      let endpoint = connectServer + "/api/v1/sessions/" + id;
      let response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "jwt " + this.sessionToken,
        },
      });

      let data = response.status === 200 ? (await response.json()).data : null;

      if (data) {
        this.$refs.gatacaQr.sessionData = this.processData(data);
      }

      return response.status === 200
        ? RESULT_STATUS.SUCCESS
        : response.status === 204
        ? RESULT_STATUS.ONGOING
        : RESULT_STATUS.FAILED;
    },
    // eslint-disable-next-line no-unused-vars
    async successCallback() {
      console.log("Got result")
      this.$emit("result", this.$refs.gatacaQr.sessionData);
    },
    async errorCallback(...errors) {
      console.log("Got error");
      this.$emit("error", errors);
    },
  },
};
</script>
