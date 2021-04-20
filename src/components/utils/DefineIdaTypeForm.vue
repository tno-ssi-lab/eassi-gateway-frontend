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
        label="IDA Type"
        description="Identifier for the new IDA type."
      >
        <b-form-input v-model="idaType" required></b-form-input>
        <b-alert v-if="idaTypeExists" show variant="primary"
          >An IDA type with this identifier already exists</b-alert
        >
      </b-form-group>

      <b-form-group
        label="Claim Interface"
        description="The claim interface is an 'example' of your credential
      payload, with empty strings, 0 for numbers, and false for booleans"
        invalid-feedback="Please enter valid JSON"
        :state="claimInterfaceState"
      >
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(claimInterface, null, 2)"
          required
          rows="6"
          :state="claimInterfaceState"
          @input="updateClaimInterface"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        label="Context"
        description="The JSON-LD context is used to map terms so that all keys used within the claim interface can have unambigious meaning"
        invalid-feedback="Please enter valid JSON"
        :state="contextState"
      >
        <b-form-textarea
          class="data-input"
          :value="JSON.stringify(context, null, 2)"
          required
          rows="6"
          :state="contextState"
          @input="updateContext"
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
      idaType: "",
      claimInterface: {},
      context: {},
      claimInterfaceState: null,
      contextState: null,
      definitionResponse: null,
      idaTypesLoaded: false,
      idaTypes: [],
      idaTypeNameExists: null,
      idaTypeExists: null,
      busy: false,
    };
  },
  watch: {
    idaTypeName(value) {
      this.idaTypeName = value;
      this.checkTypeNameExists(value);
    },
    idaType(value) {
      this.idaType = value;
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
    updateClaimInterface(newClaimInterface) {
      console.log("Got claimInterface", newClaimInterface);
      try {
        const claimInterface = JSON.parse(newClaimInterface);
        console.log(this.claimInterface, claimInterface);
        if (claimInterface) {
          console.log(claimInterface);
          this.claimInterfaceState = null;
          this.claimInterface = claimInterface;
        }
      } catch (e) {
        this.claimInterfaceState = false;
        return;
      }
    },
    updateContext(newContext) {
      console.log("Got context", newContext);
      try {
        const context = JSON.parse(newContext);
        console.log(this.context, context);
        if (context) {
          this.contextState = null;
          this.context = context;
        }
      } catch (e) {
        this.contextState = false;
        return;
      }
    },
    async defineIdaType() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          name: this.idaTypeName,
          type: this.idaType,
          claimInterface: this.claimInterface,
          context: [this.context],
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
