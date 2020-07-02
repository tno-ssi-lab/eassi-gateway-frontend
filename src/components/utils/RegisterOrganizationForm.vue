<template>
  <div>
    <b-form @submit.prevent="registerOrganization">
      <b-form-group label="Name:">
        <b-form-input
          v-model="organization.name"
          name="organization[name]"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="busy">
        <div v-if="busy">
          <b-spinner small></b-spinner>
          Registering...
        </div>
        <div v-else>
          Submit
        </div>
      </b-button>
      <small v-if="busy" class="form-text text-muted"
        >Registration may take up to a minute.</small
      >
    </b-form>

    <b-card class="mt-3" header="Registration Response">
      <pre class="registration-output">{{ registrationResponse }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterOrganizationForm",
  data() {
    return {
      organization: {
        name: "",
      },
      registrationResponse: null,
      busy: false,
    };
  },
  methods: {
    async registerOrganization() {
      this.busy = true;
      this.registrationResponse = null;
      try {
        const data = this.organization;

        const response = await axios.post("/api/organizations", data);

        console.log(response.data);
        this.registrationResponse = response.data;
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
.registration-output {
  white-space: pre-wrap;
}
</style>
