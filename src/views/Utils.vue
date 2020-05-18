<template>
  <div class="utils">
    <create-token-form></create-token-form>
  </div>
</template>

<script>
import CreateTokenForm from "../components/CreateTokenForm.vue";

export default {
  name: "Utils",
  components: {
    CreateTokenForm,
  },
};
</script>
