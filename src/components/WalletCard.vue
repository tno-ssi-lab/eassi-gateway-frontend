<template>
  <b-card
    :title="wallet.title"
    class="wallet-card text-center"
    :class="{
      'wallet-enabled': wallet.enabled,
      'wallet-disabled': !wallet.enabled,
      'text-muted': !wallet.enabled,
    }"
    body-class="d-flex flex-column"
    @click="wallet.enabled && $emit('choice')"
  >
    <div class="flex-grow-1 d-flex align-items-center">
      <div class="flex-grow-1 p-5">
        <b-img class="wallet-image my-1" :src="wallet.imageUrl" fluid-grow />
        <div class="enabled-notice text-muted" :aria-hidden="wallet.enabled">
          Unavailable
        </div>
      </div>
    </div>

    <template #footer>
      <div class="d-inline-flex mx-1">
        <a :href="wallet.appleDownloadUrl" target="_blank" @click.stop>
          <b-img
            class="store-badge"
            src="../assets/app-store-badge.svg"
            fluid
          />
        </a>
      </div>
      <div class="d-inline-flex mx-1">
        <a :href="wallet.googleDownloadUrl" target="_blank" @click.stop>
          <b-img
            class="store-badge"
            alt="Get it on Google Play"
            src="../assets/google-play-badge.svg"
            fluid
          />
        </a>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "WalletCard",
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.store-badge {
  height: 40px;
}

.wallet-enabled:hover {
  /* background: rgba(0, 0, 0, 0.05); */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
  cursor: pointer;
}

.wallet-enabled .enabled-notice {
  opacity: 0;
}

.wallet-disabled {
  background: rgba(0, 0, 0, 0.05);
}

.wallet-disabled img {
  opacity: 0.6;
}
</style>
