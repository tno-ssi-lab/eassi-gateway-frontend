<template>
  <div class="indy-issue">
    <indy-connection-modal
      v-if="!connectionId"
      @connection-id="handleIssueRequest"
    ></indy-connection-modal>
  </div>
</template>

<script>
import axios from "axios";
import IndyConnectionModal from "./IndyConnectionModal.vue";

export default {
  name: "IndyIssue",
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
    handleIssueRequest(connectionId) {
      this.connectionId = connectionId;
      axios
        .post(
          `/api/connectors/indy/issue`,
          { identifier: connectionId },
          {
            params: {
              issueRequestId: this.requestId,
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
