<template>
  <div class="utils">
    <create-token-form></create-token-form>
    <hr />
    <create-request-form></create-request-form>
  </div>
</template>

<script>
import CreateTokenForm from "../components/utils/CreateTokenForm.vue";
import CreateRequestForm from "../components/utils/CreateRequestForm.vue";

export default {
  name: "Utils",
  components: {
    CreateTokenForm,
    CreateRequestForm,
  },
};
</script>
