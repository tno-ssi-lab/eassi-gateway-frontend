<template>
  <div class="create-token-form">
    <b-form @submit.prevent="createToken">
      <b-form-group
        label="App ID"
        description="The app for which you want to create a credential request."
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
        description="The app specific credential type you want to perform."
      >
        <b-form-select
          v-model="credentialType"
          required
          :options="typeChoices"
          :disabled="!anyTypeChoices"
          @input="setDataFromType"
        ></b-form-select>
      </b-form-group>

      <div v-if="type" class="text-muted">
        <div v-if="type.jolocomType">
          <h5>Jolocom credential</h5>
          <h6>Context</h6>
          <p v-text="type.jolocomType.context"></p>

          <h6>Claim interface</h6>
          <p v-text="type.jolocomType.claimInterface"></p>
        </div>

        <div v-if="type.idaType">
          <h5>Datakeeper credential</h5>
          <h6>Attributes</h6>
          <p v-text="type.idaType.attributes"></p>
        </div>

        <div v-if="type.irmaType">
          <h5>IRMA credential</h5>
          <p v-text="type.irmaType"></p>
        </div>

        <div v-if="type.indySchema">
          <h5>Indy credential</h5>
          <h6>Schema</h6>
          <p v-text="type.indySchema.indySchemaId"></p>
          <h6>Credential Definition</h6>
          <p v-text="type.indySchema.indyCredentialDefinitionId"></p>
          <h6>Attributes</h6>
          <p v-text="type.indySchema.attributes"></p>
        </div>
      </div>

      <b-form-group
        label="Callback URL"
        description="Url to redirect the user to with the response. The response
      JWT is appended directly to the URL."
      >
        <b-form-input v-model="callbackUrl" required></b-form-input>
      </b-form-group>

      <b-form-group label="Request type">
        <b-form-radio-group>
          <b-form-radio v-model="requestType" value="credential-verify-request">
            CredentialVerifyRequest
          </b-form-radio>
          <b-form-radio v-model="requestType" value="credential-issue-request">
            CredentialIssueRequest
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-form-group
        v-show="requestType == 'credential-verify-request'"
        label="Request predicates"
        description="Credential predicates used for verify requests."
        invalid-feedback="Please enter valid JSON"
        :state="predicatesState"
      >
        <b-form-textarea
          class="predicates-input"
          :value="JSON.stringify(predicates, null, 2)"
          required
          rows="6"
          :state="predicatesState"
          @input="updatePredicates"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        v-show="requestType == 'credential-issue-request'"
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
      callbackUrl: "http://jwt.io?token=",
      requestType: "",
      predicates: {
        old_enough: {
          name: "Date_of_birth",
          p_type: "<=",
          p_value: 20010101,
        },
      },
      data: {},
      token: "",
      organizationsLoaded: false,
      organizations: [],
      predicatesState: null,
      dataState: null,
      busy: false,
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
    anyTypeChoices() {
      return this.organization
        ? this.organization.credentialTypes.length > 0
        : false;
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
      this.busy = true;
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

        if (!this.isIssueRequest) {
          data.predicates = this.predicates;
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
      setTimeout(() => {
        this.busy = false;
      }, 300);
    },
    updatePredicates(newPredicates) {
      console.log("Got predicates", newPredicates);
      try {
        const predicates = JSON.parse(newPredicates);
        console.log(this.predicates, predicates);
        if (predicates) {
          this.predicatesState = null;
          this.predicates = predicates;
        }
      } catch (e) {
        this.predicatesState = false;
        return;
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

      if (type && type.jolocomType && type.jolocomType.claimInterface) {
        this.data = type.jolocomType.claimInterface;
      }
    },
  },
};
</script>

<style scoped>
.data-input,
.predicates-input {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.token-output {
  white-space: pre-wrap;
}
</style>
