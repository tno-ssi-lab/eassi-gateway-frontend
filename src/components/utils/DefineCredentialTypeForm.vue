<template>
  <div>
    <b-form @submit.prevent="defineCredentialType">
      <b-form-group
        label="App ID"
        description="The app for which you want to define the credential type."
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
        description="The app specific credential type."
      >
        <b-form-input v-model="credentialType" required></b-form-input>
        <b-alert v-if="credentialTypeExists" show variant="primary">
          A credential type with this name already exists
        </b-alert>
      </b-form-group>

      <b-form-group
        label="Jolocom Credential"
        description="The Jolocom type to associate with the new credential type."
      >
        <b-form-select
          v-model="jolocomCredentialTypeId"
          :options="jolocomTypeChoices"
          :disabled="!jolocomTypesLoaded"
        ></b-form-select>
      </b-form-group>

      <div v-if="jolocomType" class="text-muted">
        <h6>Context</h6>
        <p v-text="jolocomType.context"></p>

        <h6>Claim interface</h6>
        <p v-text="jolocomType.claimInterface"></p>
      </div>

      <b-form-group
        label="Irma Credential"
        description="The Irma type to associate with the new credential type."
      >
        <b-form-input v-model="irmaType"></b-form-input>
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

    <b-card class="mt-3" header="Definition Response">
      <pre class="definition-output">{{ definitionResponse }}</pre>
      <p v-if="definitionResponse" class="m-0"></p>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DefineCredentialTypeForm",
  data() {
    return {
      organizationId: 1,
      credentialType: "",
      irmaType: "irma-demo.MijnOverheid.fullName",
      jolocomCredentialTypeId: "",
      definitionResponse: null,
      organizationsLoaded: false,
      organizations: [],
      jolocomTypesLoaded: false,
      jolocomTypes: [],
      credentialTypeExists: null,
      busy: false,
    };
  },
  computed: {
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
    jolocomTypeChoices() {
      if (!this.jolocomTypesLoaded) {
        return [{ value: null, text: "Loading Jolocom types..." }];
      }
      return this.jolocomTypes.map((jt) => {
        return { value: jt.id, text: `${jt.name} (${jt.id})` };
      });
    },
    jolocomType() {
      if (!this.jolocomCredentialTypeId) {
        return null;
      }

      return this.jolocomTypes.find(
        (jt) => jt.id === this.jolocomCredentialTypeId
      );
    },
  },
  watch: {
    credentialType(value) {
      this.credentialType = value;
      this.checkTypeExists(value);
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

    try {
      const result = await axios.get("/api/connectors/jolocom");
      console.log(result);
      this.jolocomTypes = result.data;
      this.jolocomTypesLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    checkTypeExists(value) {
      if (
        this.organization &&
        this.organization.credentialTypes.find((ct) => ct.type === value)
      ) {
        console.log("This credential type already exists");
        this.credentialTypeExists = true;
      } else {
        this.credentialTypeExists = false;
      }
    },
    async defineCredentialType() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          organizationId: this.organizationId,
          type: this.credentialType,
        };

        if (this.jolocomCredentialTypeId) {
          data.jolocomCredentialTypeId = this.jolocomCredentialTypeId;
        }

        if (this.irmaType) {
          data.irmaType = this.irmaType;
        }

        const result = await axios.post("/api/types", data);
        console.log(result.data);
        this.definitionResponse = result.data;
      } catch (e) {
        console.error(e);
      }
      setTimeout(() => {
        this.busy = false;
      }, 300);
    },
  },
};
</script>

<style scoped>
.definition-output {
  white-space: pre-wrap;
}
</style>
