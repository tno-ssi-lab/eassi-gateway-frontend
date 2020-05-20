<template>
  <div class="perform-verify">
    <perform-credential-request
      :request-id="requestId"
      :connector="connector"
      type="verify"
    >
    </perform-credential-request>
  </div>
</template>

<script>
import PerformCredentialRequest from "../components/PerformCredentialRequest.vue";

export default {
  name: "PerformVerifyRequest",
  components: {
    PerformCredentialRequest,
  },
  props: {
    requestId: {
      type: String,
      required: true,
    },
    connector: {
      type: String,
      required: true,
    },
  },
};
</script>
