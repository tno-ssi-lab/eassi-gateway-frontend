<template>
  <div class="ida-verify">
    <b-modal
      :visible="showModal"
      title="Please scan the QR code with your IDA Wallet"
      size="lg"
      cancel-variant="danger"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @cancel="$emit('cancel')"
      @ok="handleOk"
    >
      <p class="text-center">
        <img :src="qr" alt="Could not render QR code..." />
      </p>

      <!-- <template #modal-footer="{ cancel }">
        <b-button variant="danger" @click="cancel">
          Cancel
        </b-button>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
const WAIT_TIME = 1000;

export default {
  name: "IdaVerify",
  props: {
    qr: {
      type: String,
      required: true,
    },
    requestId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: "started",
      modal: false,
    };
  },
  computed: {
    showModal() {
      return this.status === "started" && this.modal;
    },
  },
  mounted() {
    const that = this;
    setTimeout(() => that.showQR(), WAIT_TIME);
  },
  methods: {
    showQR() {
      this.modal = true;
    },
    handleOk() {
      this.status = "success";
      this.$emit("success", {
        requestId: this.requestId,
        connector: "ida",
      });
    },
  },
};
</script>
