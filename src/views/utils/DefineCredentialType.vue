<template>
  <div>
    <h1>Define Credential Type</h1>
    <define-credential-type-form></define-credential-type-form>
  </div>
</template>

<script>
import DefineCredentialTypeForm from "../../components/utils/DefineCredentialTypeForm.vue";

export default {
  name: "DefineCredentialType",
  components: {
    DefineCredentialTypeForm,
  },
};
</script>
