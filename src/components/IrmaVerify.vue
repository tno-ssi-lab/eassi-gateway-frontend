<template>
  <div class="irma-verify">
    <irma-session
      v-once
      :jwt="jwt"
      :server="server"
      @result="handleResult"
      @cancel="$emit('cancel')"
      @error="$emit('error')"
    ></irma-session>
  </div>
</template>

<script>
import axios from "axios";
import IrmaSession from "./IrmaSession.vue";

export default {
  name: "IrmaVerify",
  components: {
    IrmaSession,
  },
  props: {
    jwt: {
      type: String,
      required: true,
    },
    server: {
      type: String,
      required: true,
    },
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
