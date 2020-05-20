<template>
  <b-card-group class="connector-select">
    <connector-card
      v-for="connector in connectorConfigs"
      :key="connector.name"
      :connector="connector"
      @choice="$emit('choice', connector.name)"
    />
  </b-card-group>
</template>

<script>
import ConnectorCard from "./ConnectorCard.vue";
import { CONNECTORS } from "../constants";

export default {
  name: "ConnectorSelect",
  components: {
    ConnectorCard,
  },
  props: {
    enabledConnectors: {
      type: Array,
      required: false,
      default: () => CONNECTORS.map((w) => w.name),
    },
  },
  computed: {
    connectorConfigs() {
      return CONNECTORS.map((config) => {
        return {
          ...config,
          enabled: this.enabledConnectors.includes(config.name),
        };
      });
    },
  },
};
</script>
