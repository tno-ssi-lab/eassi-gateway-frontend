<template>
  <div class="gataca-session-stub">
    <gataca-qr
      :callback-server="connectServer"
      :qr-role="qrRole"
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

const CONNECTION_PARAMS = {
  verify: {
    qrRole: "scan",
    appName: "TNOApp",
    tenant: "TNO",
    appPassword: "TNOApp",
    connectServer: "https://ssip3.dev.innopsi.xantav.com/connect",
    endpoint: "sessions",
  },
  issue: {
    qrRole: "credential",
    appName: "TNOApp",
    tenant: "tno",
    appPassword: "TNOApp",
    connectServer: "https://ssip3.dev.innopsi.xantav.com/certify",
    endpoint: "issuanceRequests"
  },
};

export default {
  name: "GatacaSession",
  props: {
    requestType: {
      type: String,
      default: "verify",
    },
  },
  data() {
    return {
      appToken: null,
      sessionToken: null,
      sessionData: null,
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
  computed: {
    qrRole() {
      return CONNECTION_PARAMS[this.requestType].qrRole;
    },
    appName() {
      return CONNECTION_PARAMS[this.requestType].appName;
    },
    tenant() {
      return CONNECTION_PARAMS[this.requestType].tenant;
    },
    appPassword() {
      return CONNECTION_PARAMS[this.requestType].appPassword;
    },
    connectServer() {
      return CONNECTION_PARAMS[this.requestType].connectServer;
    },
    endpoint() {
      return CONNECTION_PARAMS[this.requestType].endpoint;
    },
  },
  methods: {
    async getAppToken() {
      console.log("Getting App Token");
      if (!this.appToken) {
        let response = await fetch(
          `${this.connectServer}/admin/v1/login/basic`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Tenant: this.tenant,
              Authorization:
                "Basic " + btoa(`${this.appName}:${this.appPassword}`),
            },
            body: "{}",
          }
        );
        this.appToken = response.headers.get("Token");

        return this.appToken;
      }

      return this.appToken;
    },
    processData(data) {
      // This can be removed.
      let result = {};
      console.log(data);
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

      let endpoint = `${this.connectServer}/api/v1/${this.endpoint}`;
      let response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "jwt " + (await this.getAppToken()),
        },
        body: this.requestType === "issue" ? '{"group":"tno"}' : "{}",
      });
      let data = await response.json();
      this.sessionToken = response.headers.get("Token");

      console.log(data);

      return data.id;
    },
    async checkStatus(id) {
      console.log("Checking session status");

      let endpoint = `${this.connectServer}/api/v1/${this.endpont}/${id}${this.requestType === "issue" ? "/credentials": ""}`;
      let response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "jwt " + this.sessionToken,
        },
      });

      let data = response.status === 200 ? (await response.json()).data : null;

      if (data) {
        this.sessionData = data;
        this.$refs.gatacaQr.sessionData = this.processData(data);
      }

      return response.status === 200
        ? RESULT_STATUS.SUCCESS
        : response.status === 204
        ? RESULT_STATUS.ONGOING
        : RESULT_STATUS.FAILED;
    },
    async successCallback() {
      console.log("Got result");
      this.$emit("result", this.sessionData);
    },
    async errorCallback(...errors) {
      console.log("Got error");
      this.$emit("error", errors);
    },
  },
};
</script>
