<template>
  <div>
    <b-form @submit.prevent="defineIndySchema">
      <b-form-group
        label="Indy Schema Name"
        description="A CamelCased name for this Indy Schema without any spaces."
        invalid-feedback="An Indy schema with this name and version already exists"
        :state="schemaState"
      >
        <b-form-input
          v-model="indySchemaName"
          :state="schemaState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Indy Schema Version"
        description="A version identifier in this format: 0.0.1"
        invalid-feedback="An Indy schema with this name and version already exists"
        :state="schemaState"
      >
        <b-form-input
          v-model="indySchemaVersion"
          :state="schemaState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Attributes"
        description='A json formatted array of attributes, format: ["attr1", "attr2"]'
        invalid-feedback="Please enter valid JSON"
        :state="attributesState"
      >
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(attributes, null, 2)"
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
  name: "DefineIndySchemaForm",
  data() {
    return {
      indySchemaName: "",
      indySchemaVersion: "",
      schemaState: null,
      attributes: [],
      attributesState: null,
      definitionResponse: null,
      indySchemasLoaded: false,
      indySchemas: [],
      busy: false,
    };
  },
  watch: {
    indySchemaName(value) {
      this.indySchemaName = value;
      this.checkTypeExists();
    },
    indySchemaVersion(value) {
      this.indySchemaVersion = value;
      this.checkTypeExists();
    },
  },
  async created() {
    try {
      const result = await axios.get("/api/connectors/indy");
      console.log(result);
      this.indySchemas = result.data;
      this.indySchemasLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    checkTypeExists() {
      if (
        this.indySchemas.find(
          (is) =>
            is.name === this.indySchemaName &&
            is.version === this.indySchemaVersion
        )
      ) {
        console.log("This indy type already exists");
        this.schemaState = false;
      } else {
        this.schemaState = null;
      }
    },
    updateAttributes(newAttributes) {
      console.log("Got attributes", newAttributes);
      try {
        const attributes = JSON.parse(newAttributes);
        console.log(this.attributes, attributes);
        if (attributes) {
          console.log(attributes);
          this.attributesState = null;
          this.attributes = attributes;
        }
      } catch (e) {
        this.attributesState = false;
        return;
      }
    },
    async defineIndySchema() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          name: this.indySchemaName,
          version: this.indySchemaVersion,
          attributes: this.attributes,
        };
        console.log(data);
        const result = await axios.post("/api/connectors/indy", data);
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
