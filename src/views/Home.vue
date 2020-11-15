<template>
  <div class="home">
    <h1>TNO SSI Provider</h1>

    <h3>About SSI as a Service</h3>
    <p>
      Welcome! We facilitate the adoption of SSI by providing an easy to use API,
      that allows you as issuing and/or verifying organization to integrate multiple
      SSI wallets with a single interface.

      Do you want to issue or verify credentials, but lack either the time, manpower,
      interest, or experience to implement this yourself? Or do you simply want to avoid
      the hastle of implementing support for multiple different wallets, and dealing with
      (breaking) changes on their end? Then you may want to consider this SSI service!

      Similar to a payment service provider allowing webshops to easilly support payment
      with MasterCard, Visa, PayPal, iDeal, bitcoin, and you name it, our objective is to
      faciliatate issuing and verifying to and from any of the popular SSI wallets. We
      currently support the wallet apps as shown below, with more to come.
    </p>

    <h3>Getting started</h3>
    <p>
      For information on how to integrate with our service, please refer to our
      documentation
      <a href="https://gitlab.com/digicampus/ssi/ssi-service-provider/developer-docs">here</a>.
    </p>
    <p>
      To quickly try out different aspects of the service, we encourage you to experiment with the
      SSI service by using the link below. Here, you can register a new app, define credential
      types, and manually create issue and verify requests for testing purposes.
      If you know what you are doing, you can go to the issue or verify page
      directly.
    </p>
    <ul>
      <li>
        <router-link to="/utils">Experiment with SSI service</router-link>
      </li>
      <li>
        <router-link to="/issue/someToken">Issue credential API</router-link>
      </li>
      <li>
        <router-link to="/verify/someToken">Verify credential API</router-link>
      </li>
      <li>
        <a href="https://catalogue.ssi-lab.nl">Credential Catalogue service</a>
      </li>
    </ul>

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

  </div>
</template>

<script>
import ConnectorCard from "../components/ConnectorCard.vue";
import { CONNECTORS } from "../constants";

export default {
  name: "Home",

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
