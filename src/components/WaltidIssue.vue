<template>
    <div class="waltid-issue">
      <waltid-connection-modal
        v-if="!connectionId"
        @connection-id="handleIssueRequest"
        v-on="{ cancel }"
      ></waltid-connection-modal>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import WaltidConnectionModal from "./WaltidConnectionModal.vue";
  
  export default {
    name: "WaltidIssue",
    components: {
      WaltidConnectionModal,
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
            `/api/issue/waltid/issue`,
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
                `/api/issue/waltid/issuereponse`,
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
                    connector: "waltid",
                  });
                } else {
                  this.$emit("cancel");
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
  