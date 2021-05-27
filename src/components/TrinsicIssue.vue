<template>
  <div class="trinsic-issue">
    <trinsic-connection-modal
      v-if="!connectionId"
      @connection-id="handleIssueRequest"
    ></trinsic-connection-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TrinsicIssue",
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
          `/api/connectors/trinsic/issue`,
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
