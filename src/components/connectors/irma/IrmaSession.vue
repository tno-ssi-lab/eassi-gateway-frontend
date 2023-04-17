<template>
  <div class="irma-session-stub"></div>
</template>

<script>
import * as irma from "@privacybydesign/irmajs";

export default {
  name: "IrmaSession",
  props: {
    jwt: {
      type: String,
      required: true,
    },
    server: {
      type: String,
      required: true,
    },
  },
  mounted() {
    irma
      .startSession(this.server, this.jwt, "publickey")
      .then(({ sessionPtr, token }) =>
        irma.handleSession(sessionPtr, {
          token,
          server: this.server,
          resultJwt: true,
        })
      )
      .then((resultJwt) => {
        console.log("Got result from IRMA server", resultJwt);
        this.$emit("result", resultJwt);
      })
      .catch((err) => {
        console.log(err);
        if (err === irma.SessionStatus.Cancelled) {
          this.$emit("cancel");
        } else {
          this.$emit("error");
        }
      });
  },
};
</script>
