<template>
  <div class="create-request-form">
    <b-form @submit.prevent="createRequest">
      <b-form-radio-group label="Request type">
        <b-form-radio v-model="requestType" value="credential-verify-request">
          CredentialVerifyRequest
        </b-form-radio>
        <b-form-radio v-model="requestType" value="credential-issue-request">
          CredentialIssueRequest
        </b-form-radio>
      </b-form-radio-group>

      <b-form-group label="Request token">
        <b-form-textarea
          v-model="token"
          class="token-input"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="busy">
        <div v-if="busy">
          <b-spinner small></b-spinner>
          Processing...
        </div>
        <div v-else>
          Submit
        </div>
      </b-button>
    </b-form>

    <b-card class="mt-3" header="Request" :border-variant="borderVariant">
      <pre class="m-0">{{ JSON.stringify(result, null, 2) }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateRequestForm",
  data() {
    return {
      requestType: "",
      token: "",
      result: null,
      error: null,
      busy: false,
    };
  },
  computed: {
    borderVariant() {
      if (this.error === true) {
        return "danger";
      } else if (this.error === false) {
        return "success";
      }

      return "";
    },
  },
  methods: {
    async createRequest() {
      this.busy = true;
      try {
        const path =
          this.requestType === "credential-issue-request" ? "issue" : "verify";

        const result = await axios.get(`/api/${path}`, {
          params: {
            token: this.token,
          },
        });
        console.log(result.data);
        this.error = false;
        this.result = result.data;
      } catch (e) {
        this.error = true;
        this.result = e.response?.data;
      }
      setTimeout(() => {
        this.busy = false;
      }, 300);
    },
  },
};
</script>

<style scoped>
.token-input {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}
</style>
