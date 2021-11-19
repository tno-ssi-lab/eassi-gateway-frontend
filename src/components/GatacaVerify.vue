<template>
  <div class="gataca-verify">
    <gataca-session v-once></gataca-session>
  </div>
</template>

<script>
// :jwt="jwt"
// :server="server"
// @result="handleResult"
// @cancel="$emit('cancel')"
// @error="$emit('error')"

import axios from "axios";
import GatacaSession from "./GatacaSession.vue";

export default {
  name: "GatacaVerify",
  components: {
    GatacaSession,
  },
  props: {
    // jwt: {
    //   type: String,
    //   required: true,
    // },
    // server: {
    //   type: String,
    //   required: true,
    // },
    requestId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleResult(resultJwt) {
      this.$emit("update", "handling");
      console.log(resultJwt);

      axios
        .post(
          `/api/verify/irma/disclose`,
          { jwt: resultJwt },
          {
            params: {
              verifyRequestId: this.requestId,
            },
          }
        )
        .then((response) => {
          console.log("Backend handled jwt", response);
        })
        .catch(() => this.$emit("error"));
    },
  },
};
</script>
