<template>
  <div class="ida-issue">
    <b-modal
      :visible="showModal"
      title="Please scan the QR code with your IDA Wallet"
      size="lg"
      cancel-variant="danger"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @cancel="(status = 'cancelled') && $emit('cancel')"
      @ok="handleOk"
    >
      <p class="text-center">
        <img :src="qr" alt="Could not render QR code..." />
      </p>
    </b-modal>
  </div>
</template>

<script>
const WAIT_TIME = 200;

export default {
  name: "IdaIssue",
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
      status: "loading",
    };
  },
  computed: {
    showModal() {
      return this.status === "started";
    },
  },
  mounted() {
    const that = this;
    setTimeout(() => that.showQR(), WAIT_TIME);
  },
  methods: {
    showQR() {
      this.status = "started";
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
