<template>
  <div class="home">
    <h1>
      <!-- <strong>TNO EASSI</strong>
      SSI Wallet Gateway -->
      TNO EASSI
      <strong>SSI Wallet Gateway</strong>
    </h1>

    <br>

    <h3>About SSI as a Service</h3>
    <p>
      Welcome! We facilitate the adoption of SSI by providing an easy to use API,
      that allows you as issuing and/or verifying organization to integrate multiple
      SSI wallets with a single interface.
    </p>
    <p>
      Do you want to issue or verify credentials, but lack either the time, manpower,
      interest, or experience to implement this yourself? Or do you simply want to avoid
      the hastle of implementing support for multiple different wallets, and dealing with
      (breaking) changes on their end? Then you may want to consider this SSI service!
    </p>
    <p>
      Similar to a payment service provider allowing webshops to easilly support payment
      with MasterCard, Visa, PayPal, iDeal, bitcoin, and you name it, our objective is to
      faciliatate issuing and verifying to and from any of the popular SSI wallets. We
      currently support the wallet apps as shown below, with more to come.
    </p>

    <h3>Getting started</h3>
    <p>
      For information on how to integrate with our service, please refer to our
      documentation
      <a href="https://ssi-lab.nl/docs/about">here</a>.
    </p>
    <p>
      To quickly try out different aspects of the service, we encourage you to experiment with TNO
      EASSI <router-link to="/utils">here</router-link>. At this page you can register a new app,
      define credential types, and manually create issue and verify requests for testing purposes.
    </p>

    <h3>SSI wallet apps we support</h3>
    <p>
      <b-card-group class="connector-select">
        <connector-card
          v-for="connector in connectorConfigs"
          :key="connector.name"
          :connector="connector"
          @click="openUrl(connector.walletProviderUrl)"
        />
      </b-card-group>
    </p>

    <hr>

    <h3>Related work</h3>
    <ul>
      <li><a href="https://credcat.ssi-lab.nl">Credential Catalogue service</a> <em>(demonstrator)</em></li>
    </ul>

  </div>
</template>

<script>
import ConnectorCard from "../components/ConnectorCard.vue";
import { CONNECTORS } from "../constants";

export default {
  name: "Home", // eslint-disable-line vue/multi-word-component-names

  components: {
    ConnectorCard,
  },
  props: {
  },
  computed: {
    connectorConfigs() {
      return CONNECTORS.map((config) => {
        return {
          ...config,
          enabled: true,
        };
      });
    },
  },
  methods: {
    openUrl: function (url) {
      window.location.href = url;
    }
  },
};
</script>

<style scoped>
  h1 strong {
    display: block;
    font-size: 50%;
    opacity: 0.75;
  }
</style>
