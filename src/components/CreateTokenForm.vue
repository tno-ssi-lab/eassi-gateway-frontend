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
          :value="JSON.stringify(data, null, 2)"
          :options="[1]"
          required
          @input="(val) => (this.data = JSON.parse(val))"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-card class="mt-3" header="Created Token">
      <pre class="m-0">{{ token }}</pre>
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
      organizations: [],
    };
  },
  sockets: {
    connect() {
      console.log("Connected in Home");
      this.$socket.client.emit("message", "New message", (response) => {
        console.log("Got response in connect", response, this);
        this.message = response;
      });
    },
  },
  methods: {
    async createToken() {
      try {
        const data = {
          type: this.credentialType,
          callbackUrl: this.callbackUrl,
          aud: this.requestType,
        };

        if (this.requestType === "credential-issue-request") {
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
  async mounted() {
    try {
      const result = await axios.get("/api/organizations");
      console.log(result);
      this.organizations = result.data.map((o) => {
        return { value: o.id, text: `${o.name} (${o.id})` };
      });
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
