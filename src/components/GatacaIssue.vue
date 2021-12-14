<template>
  <div class="gataca-issue">
    <gataca-session
      requestType="issue"
      @error="$emit('error')"
      @result="handleResult"
      v-once
    ></gataca-session>
  </div>
</template>

<script>
// import axios from "axios";
import GatacaSession from "./GatacaSession.vue";

export default {
  name: "GatacaIssue",
  components: {
    GatacaSession,
  },
  props: {
    requestId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleResult(result) {
      this.$emit("update", "handling");
      console.log(result);

      //   axios
      //     .post(
      //       `/api/verify/gataca/disclose`,
      //       result,
      //       {
      //         params: {
      //           verifyRequestId: this.requestId,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log("Backend handled result", response);
      //     })
      //     .catch(() => this.$emit("error"));
    },
  },
};
</script>
