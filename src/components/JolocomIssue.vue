<template>
  <div class="jolocom-issue">
    <b-modal
      :visible="showModal"
      title="Please scan the QR code with your Jolocom Wallet"
      size="lg"
      cancel-variant="danger"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @cancel="(status = 'cancelled') && $emit('cancel')"
      @ok="(status = 'success') && $emit('success')"
    >
      <p class="text-center">
        <img :src="qr" alt="Could not render QR code..." />
      </p>
    </b-modal>
  </div>
</template>

<script>
const WAIT_TIME = 1000;

export default {
  name: "JolocomIssue",
  props: {
    qr: {
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
  },
};
</script>
