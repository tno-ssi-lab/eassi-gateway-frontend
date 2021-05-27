<template>
  <div class="trinsic-verify">
    <trinsic-connection-modal
      v-if="!connectionId"
      @connection-id="handleVerifyRequest"
    ></trinsic-connection-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TrinsicVerify",
  props: {
    requestId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      connectionId: null,
    };
  },
  methods: {
    handleVerifyRequest(connectionId) {
      this.connectionId = connectionId;
      axios
        .post(
          `/api/connectors/trinsic/verify`,
          { identifier: connectionId },
          {
            params: {
              verifyRequestId: this.requestId,
            },
          }
        )
        .then(() => {
          this.$emit("update", "ready");
        })
        .catch(() => this.$emit("error"));
    },
  },
};
</script>
