<template>
  <div class="create-token-form">
    <b-form @submit.prevent="createRequest">
      <h1>Create request</h1>

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

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-card class="mt-3" header="Request">
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
    };
  },
  methods: {
    async createRequest() {
      try {
        const path =
          this.requestType === "credential-issue-request" ? "issue" : "verify";

        const result = await axios.get(`/api/${path}`, {
          params: {
            token: this.token,
          },
        });
        console.log(result.data);
        this.result = result.data;
      } catch (e) {
        console.error(e);
      }
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
