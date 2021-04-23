<template>
  <div>
    <b-form @submit.prevent="defineIdaType">
      <b-form-group
        label="IDA Type Name"
        description="User-friendly name for the new IDA type."
      >
        <b-form-input v-model="idaTypeName" required></b-form-input>
        <b-alert v-if="idaTypeNameExists" show variant="primary"
          >An IDA type with this name already exists</b-alert
        >
      </b-form-group>

      <b-form-group
        label="IDA Type Context"
        description="Context for the new IDA type."
      >
        <b-form-input v-model="idaTypeContext" required></b-form-input>
        <b-alert v-if="idaTypeContextExists" show variant="primary"
          >An IDA type with this context already exists</b-alert
        >
      </b-form-group>

      <b-form-group
        label="Attributes"
        description="'Attributes' is an 'example' of your credential
      payload, with empty strings, 0 for numbers, and false for booleans"
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
  name: "DefineIdaTypeForm",
  data() {
    return {
      idaTypeName: "",
      idaTypeContext: "",
      attributes: {},
      attributesState: null,
      definitionResponse: null,
      idaTypesLoaded: false,
      idaTypes: [],
      idaTypeNameExists: null,
      idaTypeContextExists: null,
      busy: false,
    };
  },
  watch: {
    idaTypeName(value) {
      this.idaTypeName = value;
      this.checkTypeNameExists(value);
    },
    idaTypeContext(value) {
      this.idaTypeContext = value;
      this.checkTypeExists(value);
    },
  },
  async created() {
    try {
      const result = await axios.get("/api/connectors/ida");
      console.log(result);
      this.idaTypes = result.data;
      this.idaTypesLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    checkTypeNameExists(value) {
      if (this.idaTypes.find((jt) => jt.name === value)) {
        console.log("An IDA type with this name already exists");
        this.idaTypeNameExists = true;
      } else {
        this.idaTypeNameExists = false;
      }
    },
    checkTypeExists(value) {
      if (this.idaTypes.find((jt) => jt.type === value)) {
        console.log("This IDA type already exists");
        this.idaTypeExists = true;
      } else {
        this.idaTypeExists = false;
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
    async defineIdaType() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          name: this.idaTypeName,
          context: this.idaTypeContext,
          attributes: this.attributes,
        };
        console.log(data);
        const result = await axios.post("/api/connectors/ida", data);
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
