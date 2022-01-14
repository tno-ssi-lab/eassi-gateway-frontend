<template>
  <div class="utils-home">
    <h1>Service Guide</h1>
    <p>To use the full functionality of the eassi service, the following steps should be walked through:</p>
    <ol>
      <li>Register your organization in the <a href="https://service.ssi-lab.nl/utils/organizations">Apps</a> tab, see the <a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/register-organization">documentation</a>.</li>
      <li>Define what information should be present in the request. This can be done for any of the supported wallets, Jolocom (<a href="https://service.ssi-lab.nl/utils/jolocom-types">service</a>, <a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/define-jolocom-types">documentation</a>), Esatus (<a href="https://service.ssi-lab.nl/utils/indy-schemas">service</a>, <a href="https://ssi-lab.nl/docs/service-instructions/utils/define-indy-schemas">documentation</a>, Datakeeper (<a href="https://service.ssi-lab.nl/utils/ida-types">service</a>, <a href="https://ssi-lab.nl/docs/service-instructions/utils/define-datakeeper-types">documentation</a>) and Trinsic (<a href="https://service.ssi-lab.nl/utils/trinsic-schemas">service</a>, <a href="https://ssi-lab.nl/docs/service-instructions/utils/define-trinsic-schemas">documentation</a>).</li>
      <li>Define what information the request is about for which wallet(s) in the <a href="https://service.ssi-lab.nl/utils/credential-types">Credential types</a> tab, see the <a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/define-credential-mapping">documentation</a>.</li>
      <li>Create a token for the request that can be scanned to open the wallet in the <a href="https://service.ssi-lab.nl/utils/create-token">Create token</a> tab, see the <a href="https://eassi.ssi-lab.nl/docs/service-instructions/utils/create-token">documentation</a>.</li>
    </ol>
   
    <hr />
    <h2>Short Demo</h2>
    <p>Go to the <a href="https://service.ssi-lab.nl/utils/create-token">create token</a> tab. Here you can issue and verify credentials of a user. We will now show step by step how to perform each of these actions.</p>

    <h3>Issuing of Credentials</h3>
    <p>The issue request is made based on the following fields:</p>
    <ol>
      <li><i>App ID</i>: this is the name of an organization for which the credential issue request is made. Pick "namecredentialdemo (22)" here.</li>
      <li><i>Credential type:</i> the type of credential you want to issue. Choose "FullnameCredential" here. This credential is defined for the Jolocom, Datakeeper, Esatus, IRMA and Trinsic wallet.</li>
      <li><i>Callback URL:</i> the website where you are redirected to after completion of the issuing process. You can leave this as is.</li>
      <li>Pick <i>CredentialIssueRequest</i>, as we are issuing a credential.</li>
      <li><i>Request data:</i> the information that is needed for the credential. Fill in your information here.</li>
      <li>Click <i>submit</i>.</li>
      <li>Click on <i>go to issue page</i> on the bottom. </li>
      <li>Pick a wallet you want to store the credential in. The wallets that are available (in white) are the wallets that the credential is defined for. Note that the credential is defined for IRMA, but we are not allowed to issue credentials for IRMA. A QR-code will be shown that you can scan with the wallet of your choice.</li>
      <li>Now, the issued credential will be shown in your wallet.</li>
    </ol>

    <h3>Verification of Credentials</h3>
    <p>The verification request is made based on the following fields:</p>
    <ol>
      <li><i>App ID</i>: this is the name of an organization for which the credential issue request is made. Pick "namecredentialdemo (22)" here.</li>
      <li><i>Credential type:</i> the type of credential you want to issue. Choose "FullnameCredential" here. This credential is defined for the Jolocom, Datakeeper, Esatus, IRMA and Trinsic wallet.</li>
      <li><i>Callback URL:</i> the website where you are redirected to after completion of the issuing process. You can leave this as is.</li>
      <li>Pick <i>CredentialVerifyRequest</i>, as we are verifying a credential.</li>
      <li>Click <i>submit</i>.</li>
      <li>Click on <i>go to issue page</i> on the bottom. </li>
      <li>Pick a wallet you want to use to provide the credential with. The wallets that are available (in white) are the wallets that the credential is defined for. A QR-code will be shown that you can scan with the wallet of your choice.</li>
    </ol>
    
  </div>
</template>

<script>
export default {
  name: "UtilsHome",
};
</script>
