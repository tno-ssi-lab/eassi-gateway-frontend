<template>
  <div class="trinsic-verify">
    <trinsic-connection-modal
      v-if="!connectionId"
      @connection-id="handleVerifyRequest"
      v-on="{ cancel }"
    ></trinsic-connection-modal>
  </div>
</template>

<script>
import axios from "axios";
import TrinsicConnectionModal from "./TrinsicConnectionModal.vue";

export default {
  name: "TrinsicVerify",
  components: {
    TrinsicConnectionModal,
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
          `/api/verify/trinsic/verify`,
          { identifier: connectionId },
          {
            params: {
              verifyRequestId: this.requestId,
            },
          }
        )
        .then((response) => {
          this.$emit("update", "ready");
          console.log(response);

          axios
            .post(
              `/api/verify/trinsic/disclose`,
              { response },
              {
                params: {
                  verifyRequestId: this.requestId,
                },
              }
            )
            .then((response) => {
              console.log("Backend handled trinsic verify", response);
            })
            .catch(() => this.$emit("error"));
        })
        .catch(() => this.$emit("error"));
    },
    cancel() {
      console.log("cancel()");
      this.$emit("cancel");
    },
  },
};
</script>
