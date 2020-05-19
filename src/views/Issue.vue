<template>
  <div class="issue">
    <credential-request :token="token" type="issue">
      <div class="py-5 text-center">
        <h2>Select your Wallet app</h2>
        <p id="loading" class="lead notification">
          Please choose the wallet app you want to use to issue your
          credentials.
        </p>
      </div>
    </credential-request>
  </div>
</template>

<script>
import CredentialRequest from "../components/CredentialRequest.vue";

export default {
  name: "Issue",
  components: {
    CredentialRequest,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      request: null,
    };
  },
};
</script>
