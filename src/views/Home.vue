<template>
  <div class="home">
    <h1>TNO SSI Provider</h1>
    <p>
      Welcome! We strive to improve the usability of SSI in real life by
      providing basic functionality that assists in issuing and verifying
      credentials to and from multiple wallets.
    </p>
    <p>
      Specifically, getting up and running with issuing and verifying
      credentials in a way that is compatible with existing implementations
      (e.g. Irma, Jolocom, ...) can be quite a hastle. With this service we
      strive to offload (most of) this burdon from issuing and verifying
      parties, to help increase the adoption of SSI technology.
    </p>

    <h2>Getting started</h2>
    <p>
      For information on how to integrate with our service, please refer to our
      documentation
      <a href="https://ci.tno.nl/gitlab/ssi-lab/developer-docs">here</a>.
    </p>
    <p>
      To quickly try out different aspects of the service, we encourage you to
      go to the utils page. Here, you can register a new organization, define
      credential types, and manually create issue and verify requests for
      testing purposes. If you know what you are doing, you can go to the issue
      or verify page directly.
    </p>
    <ul>
      <li>
        <router-link to="/utils">Utils</router-link>
      </li>
      <li>
        <router-link to="/issue/someToken">Issue</router-link>
      </li>
      <li>
        <router-link to="/verify/someToken">Verify</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
