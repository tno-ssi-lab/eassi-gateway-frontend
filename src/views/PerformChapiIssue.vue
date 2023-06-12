<template>
  <div class="perform-chapi-issue">
    <chapi-handler :request-id="requestId" type="issue"> </chapi-handler>
  </div>
</template>

<script>
import ChapiHandler from "../components/ChapiHandler.vue";

export default {
  name: "PerformChapiIssue",
  components: {
    ChapiHandler,
  },
  props: {
    requestId: {
      type: String,
      required: true,
    },
  },
};
</script>
