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
        label="Datakeeper Credential"
        description="The Datakeeper type to associate with the new credential type."
      >
        <b-form-select
          v-model="idaCredentialTypeId"
          :options="idaTypeChoices"
          :disabled="!idaTypesLoaded"
        ></b-form-select>
      </b-form-group>

      <div v-if="idaType" class="text-muted">
        <h6>Name</h6>
        <p v-text="idaType.name"></p>

        <h6>Context</h6>
        <p v-text="idaType.context"></p>

        <h6>Attributes</h6>
        <p v-text="idaType.attributes"></p>
      </div>

      <b-form-group
        label="Irma Credential"
        description="The Irma type to associate with the new credential type."
      >
        <b-form-input v-model="irmaType"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Indy Credential"
        description="The Indy schema to associate with the new credential type."
      >
        <b-form-select
          v-model="indySchemaId"
          :options="indySchemaChoices"
          :disabled="!indySchemasLoaded"
        ></b-form-select>
      </b-form-group>

      <div v-if="indySchema" class="text-muted">
        <h6>Schema ID</h6>
        <p v-text="indySchema.indySchemaId"></p>

        <h6>CredDef ID</h6>
        <p v-text="indySchema.indyCredentialDefinitionId"></p>

        <h6>Attributes</h6>
        <p v-text="indySchema.attributes"></p>
      </div>

      <b-form-group
        label="Trinsic Credential"
        description="The Trinsic schema to associate with the new credential type."
      >
        <b-form-select
          v-model="trinsicSchemaId"
          :options="trinsicSchemaChoices"
          :disabled="!trinsicSchemasLoaded"
        ></b-form-select>
      </b-form-group>

      <div v-if="trinsicSchema" class="text-muted">
        <h6>Schema ID</h6>
        <p v-text="trinsicSchema.trinsicSchemaId"></p>

        <h6>CredDef ID</h6>
        <p v-text="trinsicSchema.trinsicCredentialDefinitionId"></p>

        <h6>Attributes</h6>
        <p v-text="trinsicSchema.attributeNames"></p>
      </div>

      <b-button type="submit" variant="primary" :disabled="busy">
        <div v-if="busy">
          <b-spinner small></b-spinner>
          Processing...
        </div>
        <div v-else>Submit</div>
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
      indySchemaId: "",
      trinsicSchemaId: "",
      definitionResponse: null,
      organizationsLoaded: false,
      organizations: [],
      jolocomTypesLoaded: false,
      jolocomTypes: [],
      credentialTypeExists: null,
      indySchemasLoaded: false,
      indySchemas: [],
      idaCredentialTypeId: "",
      idaTypesLoaded: false,
      idaTypes: [],
      trinsicSchemasLoaded: false,
      trinsicSchemas: [],
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
    idaTypeChoices() {
      if (!this.idaTypesLoaded) {
        return [{ value: null, text: "Loading Datakeeper types..." }];
      }
      return this.idaTypes.map((jt) => {
        return { value: jt.id, text: `${jt.name} (${jt.id})` };
      });
    },
    idaType() {
      if (!this.idaCredentialTypeId) {
        return null;
      }

      return this.idaTypes.find(
        (jt) => jt.id === this.idaCredentialTypeId
      );
    },
    indySchemaChoices() {
      if (!this.indySchemasLoaded) {
        return [{ value: null, text: "Loading Indy schemas..." }];
      }
      return this.indySchemas.map((is) => {
        return { value: is.id, text: `${is.name}:${is.version} (${is.id})` };
      });
    },
    indySchema() {
      if (!this.indySchemaId) {
        return null;
      }

      return this.indySchemas.find((is) => is.id === this.indySchemaId);
    },
    trinsicSchemaChoices() {
      if (!this.trinsicSchemasLoaded) {
        return [{ value: null, text: "Loading Trinsic schemas..." }];
      }
      return this.trinsicSchemas.map((is) => {
        return { value: is.id, text: `${is.name}:${is.version} (${is.id})` };
      });
    },
    trinsicSchema() {
      if (!this.trinsicSchemaId) {
        return null;
      }
      
      return this.trinsicSchemas.find((is) => is.id === this.trinsicSchemaId);
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

    try {
      const result = await axios.get("/api/connectors/ida");
      console.log(result);
      this.idaTypes = result.data;
      this.idaTypesLoaded = true;
    } catch (e) {
      console.error(e);
    }

    try {
      const result = await axios.get("/api/connectors/indy");
      console.log(result);
      this.indySchemas = result.data;
      this.indySchemasLoaded = true;
    } catch (e) {
      console.error(e);
    }

    try {
      const result = await axios.get("/api/connectors/trinsic");
      console.log(result);
      this.trinsicSchemas = result.data;
      this.trinsicSchemasLoaded = true;
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

        if (this.idaCredentialTypeId) {
          data.idaCredentialTypeId = this.idaCredentialTypeId;
        }

        if (this.irmaType) {
          data.irmaType = this.irmaType;
        }

        if (this.indySchemaId) {
          data.indySchemaId = this.indySchemaId;
        }

        if (this.trinsicSchemaId) {
          data.trinsicSchemaId = this.trinsicSchemaId;
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
