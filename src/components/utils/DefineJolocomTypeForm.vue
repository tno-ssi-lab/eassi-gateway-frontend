<template>
  <div>
    <b-form @submit.prevent="defineJolocomType">
      <b-form-group
        label="Jolocom Type Name"
        description="User-friendly name for the new Jolocom type."
      >
        <b-form-input v-model="jolocomTypeName" required></b-form-input>
        <b-alert v-if="jolocomTypeNameExists" show variant="primary"
          >A Jolocom type with this name already exists</b-alert
        >
      </b-form-group>

      <b-form-group
        label="Jolocom Type"
        description="Identifier for the new Jolocom type."
      >
        <b-form-input v-model="jolocomType" required></b-form-input>
        <b-alert v-if="jolocomTypeExists" show variant="primary"
          >A Jolocom type with this identifier already exists</b-alert
        >
      </b-form-group>

      <b-form-group
        label="Claim Interface"
        description=""
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
        description="The context is used to map terms so that all keys used within the claim interface can have unambigious meaning"
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
  name: "DefineJolocomTypeForm",
  data() {
    return {
      jolocomTypeName: "",
      jolocomType: "",
      claimInterface: {},
      context: {},
      claimInterfaceState: null,
      contextState: null,
      definitionResponse: null,
      jolocomTypesLoaded: false,
      jolocomTypes: [],
      jolocomTypeNameExists: null,
      jolocomTypeExists: null,
      busy: false,
    };
  },
  watch: {
    jolocomTypeName(value) {
      this.jolocomTypeName = value;
      this.checkTypeNameExists(value);
    },
    jolocomType(value) {
      this.jolocomType = value;
      this.checkTypeExists(value);
    },
  },
  async created() {
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
    checkTypeNameExists(value) {
      if (this.jolocomTypes.find((jt) => jt.name === value)) {
        console.log("A jolocom type with this name already exists");
        this.jolocomTypeNameExists = true;
      } else {
        this.jolocomTypeNameExists = false;
      }
    },
    checkTypeExists(value) {
      if (this.jolocomTypes.find((jt) => jt.type === value)) {
        console.log("This jolocom type already exists");
        this.jolocomTypeExists = true;
      } else {
        this.jolocomTypeExists = false;
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
    async defineJolocomType() {
      this.busy = true;
      this.definitionResponse = "";
      try {
        const data = {
          name: this.jolocomTypeName,
          type: this.jolocomType,
          claimInterface: this.claimInterface,
          context: [this.context],
        };
        console.log(data);
        const result = await axios.post("/api/connectors/jolocom", data);
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
