<template>
    <div class="waltid-verify">
      <walt-connection-modal
        v-if="!connectionId"
        @connection-id="handleVerifyRequest"
        v-on="{ cancel }"
      ></walt-connection-modal>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import WaltidConnectionModal from "./WaltidConnectionModal.vue";
  
  export default {
    name: "WaltidVerify",
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
      handleVerifyRequest(connectionId) {
        this.connectionId = connectionId;
        axios
          .post(
            `/api/verify/waltid/verify`,
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
  