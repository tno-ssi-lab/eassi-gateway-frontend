<template>
    <div class="waltid-connection-modal">
      <b-modal
        title="Please enter your connection identifier"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        visible
        :ok-disabled="!connectionId"
        @cancel="$emit('cancel')"
        @ok="$emit('connection-id', connectionId)"
      >
        <b-form v-if="!fetchNewId">
          <b-form-group
            label="Connection ID"
            description="Please enter the connection ID you received before"
          >
            <b-form-input v-model="connectionId" required></b-form-input>
          </b-form-group>
  
          <div>
            <!-- <b-button block variant="primary" @click="getConnection"> -->
            <b-button block variant="primary" @click="fetchNewId = !fetchNewId">
              I don't have a connection id yet
            </b-button>
          </div>
        </b-form>
  
        <div v-if="fetchNewId">
          <h2>Please scan the QR code to setup a connection</h2>
          <p class="text-center">
            <img :src="qr" alt="Could not render QR code..." />
          </p>
  
          <p class="text-center">
            Your connection id is:
            <strong class="connection-id" v-text="connectionId"></strong>
          </p>
  
          <div>
            <b-button block variant="primary" @click="fetchNewId = !fetchNewId">
              I already have a connection id
            </b-button>
          </div>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "WaltidConnectionModal",
    data() {
      return {
        connectionId: null,
        fetchNewId: false,
        qr: null,
      };
    },
    methods: {
      getConnection() {
        axios
          .post(`/api/connectors/waltid/invitation`)
          .then((response) => {
            console.log("Backend created invitation", response);
            this.fetchNewId = true;
            this.connectionId = response.data.invitation.identifier;
            this.qr = response.data.qr;
          })
          .catch(() => this.$emit("error"));
      },
    },
    mounted() {
      // Default: assume that a new connection id is required
      this.getConnection()
    }
  };
  </script>
  
  <style scoped>
  .connection-id {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
  }
  </style>
  