<template>
  <div>
    <b-form @submit.prevent="defineTrinsicSchema">
      <b-form-group
        label="Trinsic Schema Name"
        description="A CamelCased name for this Trinsic Schema without any spaces."
        invalid-feedback="An Trinsic schema with this name and version already exists"
        :state="schemaState"
      >
        <b-form-input
          v-model="trinsicSchemaName"
          :state="schemaState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Trinsic Schema Version"
        description="A version identifier in this format: 0.0.1"
        invalid-feedback="An Trinsic schema with this name and version already exists"
        :state="schemaState"
      >
        <b-form-input
          v-model="trinsicSchemaVersion"
          :state="schemaState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label=" names"
        description='A json formatted array of attribute names, format: ["attr1", "attr2"]'
        invalid-feedback="Please enter valid JSON"
        :state="attributesState"
      >
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(attributeNames, null, 2)"
          required
          rows="6"
          :state="attributesState"
          @input="updateAttributes"
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

    <b-card class="mt-3" header="Definition Response">
      <pre class="definition-output">{{ definitionResponse }}</pre>
      <p v-if="definitionResponse" class="m-0"></p>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DefineTrinsicSchemaForm",
  data() {
    return {
      trinsicSchemaName: "",
      trinsicSchemaVersion: "",
      schemaState: null,
      attributeNames: [],
      attributesState: null,
      definitionResponse: null,
      trinsicSchemasLoaded: false,
      trinsicSchemas: [],
      busy: false,
    };
  },
  watch: {
    trinsicSchemaName(value) {
      this.trinsicSchemaName = value;
      this.checkTypeExists();
    },
    trinsicSchemaVersion(value) {
      this.trinsicSchemaVersion = value;
      this.checkTypeExists();
    },
  },
  async created() {
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
    checkTypeExists() {
      if (
        this.trinsicSchemas.find(
          (is) =>
            is.name === this.trinsicSchemaName &&
            is.version === this.trinsicSchemaVersion
        )
      ) {
        console.log("This trinsic type already exists");
        this.schemaState = false;
      } else {
        this.schemaState = null;
      }
    },
    updateAttributes(newAttributes) {
      console.log("Got attribute names", newAttributes);
      try {
        const attributeNames = JSON.parse(newAttributes);
        console.log(this.attributeNames, attributeNames);
        if (attributeNames) {
          console.log(attributeNames);
          this.attributesState = null;
          this.attributeNames = attributeNames;
        }
      } catch (e) {
        this.attributesState = false;
        return;
      }
    },
    async defineTrinsicSchema() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          name: this.trinsicSchemaName,
          version: this.trinsicSchemaVersion,
          attributeNames: this.attributeNames,
        };
        console.log(data);
        const result = await axios.post("/api/connectors/trinsic", data);
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
.data-input {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.definition-output {
  white-space: pre-wrap;
}
</style>
