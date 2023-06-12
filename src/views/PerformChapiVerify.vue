<template>
  <div class="perform-chapi-verify">
    <chapi-handler :request-id="requestId" type="verify"> </chapi-handler>
  </div>
</template>

<script>
import ChapiHandler from "../components/ChapiHandler.vue";

export default {
  name: "PerformChapiVerify",
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
