<template>
  <b-card-group class="wallet-select">
    <wallet-card
      v-for="wallet in walletConfigs"
      :key="wallet.name"
      :wallet="wallet"
      @choice="$emit('choice', wallet.name)"
    />
  </b-card-group>
</template>

<script>
import WalletCard from "./WalletCard.vue";

const WALLETS = [
  {
    name: "jolocom",
    title: "Jolocom",
    imageUrl: require("../assets/wallet-jolocom-logo.svg"),
    appleDownloadUrl:
      "https://apps.apple.com/us/app/jolocom-smartwallet/id1223869062",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.jolocomwallet",
  },
  {
    name: "irma",
    title: "IRMA",
    imageUrl: require("../assets/wallet-irma-logo.svg"),
    appleDownloadUrl:
      "https://apps.apple.com/nl/app/irma-authenticatie/id1294092994",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=org.irmacard.cardemu",
  },
  {
    name: "sovrin",
    title: "Connect.Me",
    imageUrl: "http://placekitten.com/300/200",
    appleDownloadUrl: "https://apps.apple.com/us/app/connect-me/id1260651672",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=me.connect",
  },
];

export default {
  name: "WalletSelect",
  components: {
    WalletCard,
  },
  props: {
    enabledWallets: {
      type: Array,
      required: false,
      default: () => WALLETS.map((w) => w.name),
    },
  },
  computed: {
    walletConfigs() {
      return WALLETS.map((config) => {
        return {
          ...config,
          enabled: this.enabledWallets.includes(config.name),
        };
      });
    },
  },
};
</script>
