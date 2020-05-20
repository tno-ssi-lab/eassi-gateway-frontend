<template>
  <div class="perform-issue">
    <perform-credential-request
      :request-id="requestId"
      :connector="connector"
      type="issue"
    >
    </perform-credential-request>
  </div>
</template>

<script>
import PerformCredentialRequest from "../components/PerformCredentialRequest.vue";

export default {
  name: "PerformIssueRequest",
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
