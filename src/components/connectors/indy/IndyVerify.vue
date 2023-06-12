<template>
  <div class="indy-verify">
    <indy-connection-modal
      v-if="!connectionId"
      @connection-id="handleVerifyRequest"
      v-on="{ cancel }"
    ></indy-connection-modal>
  </div>
</template>

<script>
import axios from "axios";
import IndyConnectionModal from "./IndyConnectionModal.vue";

export default {
  name: "IndyVerify",
  components: {
    IndyConnectionModal,
  },
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
          `/api/verify/indy/verify`,
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
    cancel() {
      console.log('cancel()');
      this.$emit('cancel');
    },
  },
};
</script>
