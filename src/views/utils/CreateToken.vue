<template>
  <div class="create-request-token">
    <h1>Create request token</h1>
    <create-token-form></create-token-form>

    <hr />

    <h1>Debug token</h1>
    <create-request-form></create-request-form>
    <hr />
  </div>
</template>

<script>
import CreateTokenForm from "../../components/utils/CreateTokenForm.vue";
import CreateRequestForm from "../../components/utils/CreateRequestForm.vue";

export default {
  name: "CreateToken",
  components: {
    CreateTokenForm,
    CreateRequestForm,
  },
};
</script>
