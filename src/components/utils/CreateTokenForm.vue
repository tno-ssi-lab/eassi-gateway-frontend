<template>
  <div class="create-token-form">
    <b-form @submit.prevent="createToken">
      <b-form-group
        label="Organization ID"
        description="The organization for which you want to create a credential request."
      >
        <b-form-select
          v-model="organizationId"
          required
          :options="organizationChoices"
          :disabled="!organizationsLoaded"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label="Credential Type"
        description="The organization specific credential type you want to perform."
      >
        <b-form-select
          v-model="credentialType"
          required
          :options="typeChoices"
          :disabled="!organization"
          @input="setDataFromType"
        ></b-form-select>
      </b-form-group>

      <div v-if="type" class="text-muted">
        <h5>Jolocom credential</h5>
        <h6>Context</h6>
        <p v-text="type.jolocomType.context"></p>

        <h6>Claim interface</h6>
        <p v-text="type.jolocomType.claimInterface"></p>

        <h5>IRMA credential</h5>
        <p v-text="type.irmaType"></p>
      </div>

      <b-form-group
        label="Callback URL"
        description="Url to redirect the user to with the response. The response
      JWT is appended directly to the URL."
      >
        <b-form-input v-model="callbackUrl" required></b-form-input>
      </b-form-group>

      <b-form-radio-group label="Request type">
        <b-form-radio v-model="requestType" value="credential-verify-request">
          CredentialVerifyRequest
        </b-form-radio>
        <b-form-radio v-model="requestType" value="credential-issue-request">
          CredentialIssueRequest
        </b-form-radio>
      </b-form-radio-group>

      <b-form-group
        label="Request data"
        description="Credential data used for issue requests."
        invalid-feedback="Please enter valid JSON"
        :state="dataState"
      >
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(data, null, 2)"
          required
          rows="6"
          :state="dataState"
          @input="updateData"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-card class="mt-3" header="Created Token">
      <pre class="token-output">{{ token }}</pre>
      <p v-if="token" class="m-0">
        <router-link
          :to="tokenLink"
          target="_blank"
          v-text="tokenLinkText"
        ></router-link>
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
      callbackUrl: "http://httpbin.org/get?response=",
      requestType: "",
      data: {},
      token: "",
      organizationsLoaded: false,
      organizations: [],
      dataState: null,
    };
  },
  computed: {
    tokenLink() {
      if (!this.token) {
        return;
      }

      const name = this.isIssueRequest
        ? "CreateIssueRequest"
        : "CreateVerifyRequest";

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
    organization() {
      if (!this.organizationId || !this.organizationsLoaded) {
        return null;
      }

      return this.organizations.find((o) => o.id === this.organizationId);
    },
    organizationChoices() {
      if (!this.organizationsLoaded) {
        return [{ value: null, text: "Loading organizations..." }];
      }
      return this.organizations.map((o) => {
        return { value: o.id, text: `${o.name} (${o.id})` };
      });
    },
    typeChoices() {
      if (!this.organization) {
        return [{ value: null, text: "Loading types..." }];
      }

      return this.organization.credentialTypes.map((ct) => ct.type);
    },
    type() {
      if (!this.organization || !this.credentialType) {
        return null;
      }

      return this.organization.credentialTypes.find(
        (ct) => ct.type === this.credentialType
      );
    },
  },
  async created() {
    try {
      const result = await axios.get("/api/organizations");
      console.log(result);
      this.organizations = result.data;
      this.organizationsLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async createToken() {
      this.token = "";
      try {
        const data = {
          type: this.credentialType,
          callbackUrl: this.callbackUrl,
          sub: this.requestType,
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
      console.log("Got data", newData);
      try {
        const data = JSON.parse(newData);
        console.log(this.data, data);
        if (data) {
          this.dataState = null;
          this.data = data;
        }
      } catch (e) {
        this.dataState = false;
        return;
      }
    },
    setDataFromType(val) {
      const type = this.organization.credentialTypes.find(
        (ct) => ct.type === val
      );

      if (type && type.jolocomType.claimInterface) {
        this.data = type.jolocomType.claimInterface;
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
