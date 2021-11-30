<template>
  <div class="trinsic-issue">
    <trinsic-connection-modal
      v-if="!connectionId"
      @connection-id="handleIssueRequest"
      v-on="{ cancel }"
    ></trinsic-connection-modal>
  </div>
</template>

<script>
import axios from "axios";
import TrinsicConnectionModal from "./TrinsicConnectionModal.vue";

export default {
  name: "TrinsicIssue",
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
    handleIssueRequest(connectionId) {
      this.connectionId = connectionId;
      axios
        .post(
          `/api/issue/trinsic/issue`,
          { identifier: connectionId },
          {
            params: {
              issueRequestId: this.requestId,
            },
          }
        )
        .then((response) => {
          this.$emit("update", "ready");

          console.log(response);
          axios
            .post(
              `/api/issue/trinsic/issuereponse`,
              { response },
              {
                params: {
                  issueRequestId: this.requestId,
                },
              }
            )
            .then((response) => {
              console.log(response);
              if (response.data === "Issued") {
                this.status = "success";
                this.$emit("success", {
                  requestId: this.requestId,
                  connector: "trinsic",
                });
              } else {
                //this.$emit("cancel");
              }
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
