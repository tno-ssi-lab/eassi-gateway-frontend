<template>
  <div class="utils-home">
    <h1>Utils overview</h1>
    <p>We currently offer the following utilities:</p>
    <ul>
      <li>
        <router-link :to="{ name: 'CreateToken' }"
          ><strong>Create token</strong></router-link
        >
        <br />
        <p>
          Create tokens for testing the issuance and verification of
          credentials.
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'RegisterOrganization' }"
          ><strong>Apps</strong></router-link
        >
        <br />
        <p>
          Register your app. This allows you to issue and verify credentials
          using our SSI service.
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'DefineCredentialType' }"
          ><strong>Credential types</strong></router-link
        >
        <br />
        <p>
          Define a mapping of app specific credential types to general
          credential types (e.g. Irma, Jolocom, ...).
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'DefineJolocomType' }"
          ><strong>Jolocom types</strong></router-link
        >
        <br />
        <p>
          Define Jolocom credential types.
        </p>
      </li>
    </ul>
    <p>
      A more detailed description on how to work with the service can be found
      <a href="https://github.com/peterlangenkamp/SSI-Service-Provider"
        >here</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: "UtilsHome",
};
</script>
