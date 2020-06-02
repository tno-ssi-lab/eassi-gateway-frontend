<template>
  <div>
    <h1>Register Organization</h1>
    <register-organization-form></register-organization-form>
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
