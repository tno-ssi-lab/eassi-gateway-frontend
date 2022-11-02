<template>
  <div class="utils-home">
    <h1>Service Guide</h1>
    <p>
      Here, you can manually set up and use TNO EASSI to create issue and verify requests for
      testing purposes. To get started, please follow these steps to use custom credentials, or
      check out the demo flows below for issuing or verifying a predefined credential.
    </p>
    <ol>
      <li>Register your organization in the <router-link :to="{ name: 'RegisterOrganization' }">Organizations</router-link><sup><a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/register-organization">[?]</a></sup> tab.</li>
      <li>Create wallet/protocol-specific credential definitions of the credential(s) you want to issue. This can be done for <router-link :to="{ name: 'DefineJolocomType' }">Jolocom</router-link><sup><a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/define-jolocom-types">[?]</a></sup>, <router-link :to="{ name: 'DefineIndySchema' }">Esatus</router-link><sup><a href="https://ssi-lab.nl/docs/service-instructions/utils/define-indy-schemas">[?]</a></sup>, <router-link :to="{ name: 'DefineIdaType' }">Datakeeper</router-link><sup><a href="https://ssi-lab.nl/docs/service-instructions/utils/define-datakeeper-types">[?]</a></sup>, <router-link :to="{ name: 'DefineTrinsicSchema' }">Trinsic</router-link><sup><a href="https://ssi-lab.nl/docs/service-instructions/utils/define-trinsic-schemas">[?]</a></sup>, and <router-link :to="{ name: 'DefineWaltidType' }">Walt.id</router-link><sup><a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/define-waltid-types">[?]</a></sup>.</li>
      <li>Define the <router-link :to="{ name: 'DefineCredentialType' }">Credential types</router-link><sup><a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/define-credential-mapping">[?]</a></sup> you want to use. These are mappings of organization-specific credential types to wallet/protocol-specific ones, basically telling the service which wallets are allowed for any particular request.</li>
      <li>Finally, test the issuing and/or verifying of credentials in the <router-link :to="{ name: 'CreateToken' }">Create token</router-link><sup><a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/create-token">[?]</a></sup> tab. Here, a JWT can be generated that will relay to the service all information required to handle the issue/verify request when the user is redirected to the portal.</li>
    </ol>
    <p>
      A more detailed description on how to work with the service can be found
      <a href="https://ssi-lab.nl/docs/about"
        >here</a
      >.
    </p>
   
    <hr />
    <h2>Short Demo</h2>
    <p>Go to the <router-link :to="{ name: 'CreateToken' }">create token</router-link> tab. Here you can issue credentials to, or verify credentials from a user. We will now show step by step how to perform each of these actions.</p>

    <h3>Issuing of Credentials</h3>
    <p>The issue request is made based on the following fields:</p>
    <ol>
      <li><i>Organization ID</i>: this is the name of an organization for which the credential issue request is made. Pick "namecredentialdemo (22)" here.</li>
      <li><i>Credential type:</i> the type of credential you want to issue. Choose "FullnameCredential" here. This credential is defined for the Jolocom, Datakeeper, Esatus, IRMA and Trinsic wallet.</li>
      <li><i>Callback URL:</i> the website where you are redirected to after completion of the issuing process. You can leave this as is.</li>
      <li>Pick <i>CredentialIssueRequest</i>, as we are issuing a credential.</li>
      <li><i>Request data:</i> the information that is needed for the credential. Fill in your information here.</li>
      <li>Click <i>submit</i>.</li>
      <li>Click on <i>go to issue page</i> on the bottom. </li>
      <li>Pick the wallet you want to store the credential in. Note that any wallets that are unavailable will be greyed out (this is the case for IRMA despite it being included in the credential definition, because at this time we can only verify IRMA credentials). A QR-code will be shown that you can scan with the corresponding wallet on your phone.</li>
      <li>Now, the issued credential will be shown in your wallet.</li>
    </ol>

    <h3>Verification of Credentials</h3>
    <p>The verification request is made based on the following fields:</p>
    <ol>
      <li><i>Organization ID</i>: this is the name of an organization for which the credential issue request is made. Pick "namecredentialdemo (22)" here.</li>
      <li><i>Credential type:</i> the type of credential you want to issue. Choose "FullnameCredential" here. This credential is defined for the Jolocom, Datakeeper, Esatus, IRMA and Trinsic wallet.</li>
      <li><i>Callback URL:</i> the website where you are redirected to after completion of the issuing process. You can leave this as is.</li>
      <li>Pick <i>CredentialVerifyRequest</i>, as we are verifying a credential.</li>
      <li>Click <i>submit</i>.</li>
      <li>Click on <i>go to issue page</i> on the bottom. </li>
      <li>Pick a wallet you want to use to provide the credential (any unavailable wallets will be greyed out). A QR-code will be shown that you can scan with the corresponding wallet on your phone.</li>
    </ol>

    <hr />
    <h2>Utils overview</h2>
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
          ><strong>Organizations</strong></router-link
        >
        <br />
        <p>
          Register your organization. This allows you to issue and verify credentials
          using our SSI service.
        </p>
      </li>
      <li>
        <router-link :to="{ name: 'DefineCredentialType' }"
          ><strong>Credential types</strong></router-link
        >
        <br />
        <p>
          Define a mapping of organization specific credential types to general
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
      <li>
        <router-link :to="{ name: 'DefineWaltidSchema' }"
          ><strong>Walt.id schemas</strong></router-link
        >
        <br />
        <p>
          Define Walt.id credential schemas.
        </p>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: "UtilsHome",
};
</script>
