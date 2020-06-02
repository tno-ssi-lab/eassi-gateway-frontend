<template>
  <div>
    <h1>Register Organization</h1>
    <register-organization-form></register-organization-form>
    <!-- <create-token-form></create-token-form>

    <hr />

    <h1>Debug token</h1>
    <create-request-form></create-request-form>
    <hr />-->
  </div>
</template>

<script>
import RegisterOrganizationForm from "../../components/utils/RegisterOrganizationForm.vue";

export default {
  name: "RegisterOrganization",
  components: {
    RegisterOrganizationForm,
  },
};
</script>
