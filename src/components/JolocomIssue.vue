<template>
  <div class="jolocom-issue">
    <div v-if="status === 'started'" class="text-center">
      <b-spinner variant="secondary" />
    </div>

    <b-modal
      :visible="showModal"
      title="Please scan the QR code with your Jolocom Wallet"
      size="lg"
      cancel-variant="danger"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @cancel="$emit('cancel')"
      @ok="$emit('done')"
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
    status: {
      type: String,
      required: true,
    },
    qr: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
