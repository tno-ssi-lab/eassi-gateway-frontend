<template>
  <div class="verify">
    <create-credential-request
      :token="token"
      type="verify"
      @choice="handleChoice"
    >
      <div class="py-5 text-center">
        <h2>Select your Wallet app</h2>
        <p>
          Please choose the wallet app you want to use to verify your
          credentials.
        </p>
      </div>
    </create-credential-request>
  </div>
</template>

<script>
import CreateCredentialRequest from "../components/CreateCredentialRequest.vue";

export default {
  name: "CreateVerifyRequest",
  components: {
    CreateCredentialRequest,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleChoice({ connector, requestId }) {
      this.$router.push({
        name: "PerformVerifyRequest",
        params: { connector, requestId },
      });
    },
  },
};
</script>
