<template>
  <div class="utils-home">
    <h1>Utils overview</h1>
    <p>Here, you can register a new organization, define credential types, and manually create issue and verify requests for testing purposes. To get started with issuing and verifying credentials you need the following:</p>
    <ol>
      <li>Registration with the service</li>
      <li>Wallet/protocol-specific credential definitions of the credential(s) you want to issue</li>
      <li>A mapping of organization-specific credential types to wallet/protocol-specific ones</li>
    </ol>

    <hr />

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
      <li>
        <router-link :to="{ name: 'DefineIndySchema' }"
          ><strong>Indy schemas</strong></router-link
        >
        <br />
        <p>
          Define Indy credential schemas.
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'DefineIdaType' }"
          ><strong>Datakeeper types</strong></router-link
        >
        <br />
        <p>
          Define Datakeeper credential types.
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'DefineTrinsicSchema' }"
          ><strong>Trinsic schemas</strong></router-link
        >
        <br />
        <p>
          Define Trinsic credential schemas.
        </p>
      </li>
    </ul>
    <p>
      A more detailed description on how to work with the service can be found
      <a href="https://ssi-lab.nl/docs/about"
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
