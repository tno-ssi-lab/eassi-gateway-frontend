<template>
  <div class="jolocom-verify">
    <div v-if="status === 'started'" class="text-center">
      <b-spinner variant="secondary" />
    </div>

    <b-modal
      :visible="showModal"
      title="Please scan the QR code with your Jolocom Wallet"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @cancel="$emit('cancel')"
    >
      <p class="text-center">
        <img :src="qr" alt="Could not render QR code..." />
      </p>

      <template #modal-footer="{ cancel }">
        <b-button variant="danger" @click="cancel">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
const WAIT_TIME = 1000;

export default {
  name: "JolocomVerify",
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
