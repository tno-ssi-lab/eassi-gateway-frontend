<template>
  <div class="create-token-form">
    <b-form @submit.prevent="createToken">
      <h1>Create request token</h1>

      <b-form-group label="Credential type">
        <b-form-input v-model="credentialType" required></b-form-input>
      </b-form-group>

      <b-form-group label="Callback URL">
        <b-form-input v-model="callbackUrl" required></b-form-input>
      </b-form-group>

      <b-form-group label="Organization ID">
        <b-form-select
          v-model="organizationId"
          required
          :options="organizations"
          :disabled="!organizationsLoaded"
        ></b-form-select>
      </b-form-group>

      <b-form-radio-group label="Request type">
        <b-form-radio v-model="requestType" value="credential-verify-request">
          CredentialVerifyRequest
        </b-form-radio>
        <b-form-radio v-model="requestType" value="credential-issue-request">
          CredentialIssueRequest
        </b-form-radio>
      </b-form-radio-group>

      <b-form-group label="Request data">
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(data, null, 2)"
          required
          @input="(val) => (data = JSON.parse(val))"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-card class="mt-3" header="Created Token">
      <pre class="token-output">{{ token }}</pre>
      <p v-if="token" class="m-0">
        <router-link :to="tokenLink">{{ tokenLinkText }}</router-link>
      </p>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTokenForm",
  data() {
    return {
      credentialType: "NameCredential",
      organizationId: 1,
      callbackUrl: "http://httpbin.org/get",
      requestType: "",
      data: {},
      token: "",
      organizationsLoaded: false,
      organizations: [{ value: null, text: "Loading organizations..." }],
    };
  },
  computed: {
    tokenLink() {
      if (!this.token) {
        return;
      }

      const name = this.isIssueRequest ? "Issue" : "Verify";

      return {
        name,
        params: {
          token: this.token,
        },
      };
    },
    tokenLinkText() {
      const dest = this.isIssueRequest ? "issue" : "verify";
      return `Go to ${dest} page`;
    },
    isIssueRequest() {
      return this.requestType === "credential-issue-request";
    },
  },
  async created() {
    try {
      const result = await axios.get("/api/organizations");
      console.log(result);
      this.organizations = result.data.map((o) => {
        return { value: o.id, text: `${o.name} (${o.id})` };
      });
      this.organizationsLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async createToken() {
      try {
        const data = {
          type: this.credentialType,
          callbackUrl: this.callbackUrl,
          aud: this.requestType,
        };

        if (this.isIssueRequest) {
          data.data = this.data;
        }

        const result = await axios.post(
          `/api/utils/jwt/${this.organizationId}`,
          data
        );
        console.log(result.data);
        this.token = result.data;
      } catch (e) {
        console.error(e);
      }
    },
    updateData(newData) {
      try {
        const data = JSON.parse(newData);
        if (data) {
          this.data = data;
        }
      } catch {
        console.log("Could not decode", newData);
      }
    },
  },
};
</script>

<style scoped>
.data-input {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.token-output {
  white-space: pre-wrap;
}
</style>
