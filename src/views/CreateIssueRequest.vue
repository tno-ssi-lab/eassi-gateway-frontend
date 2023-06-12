<template>
  <div class="issue">
    <create-credential-request
      :token="token"
      type="issue"
      @choice="handleChoice"
    >
      <div class="py-5 text-center">
        <h2>Select your Wallet app</h2>
        <p>
          Please choose the wallet app you want to use to issue your
          credentials.
        </p>
      </div>
    </create-credential-request>
  </div>
</template>

<script lang="ts">
import CreateCredentialRequest from "../components/CreateCredentialRequest.vue";
import { CHAPI } from "../constants";

export default {
  name: "CreateIssueRequest",
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
      if (connector == CHAPI) {
        this.$router.push({
          name: "ChapiIssueHandler",
          params: { requestId },
        });
        return;
      }

      this.$router.push({
        name: "PerformIssueRequest",
        params: { connector, requestId },
      });
    },
  },
};
</script>
