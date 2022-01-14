<template>
  <div class="utils">
    <b-navbar>
      <b-navbar-brand :to="{ name: 'Home' }">TNO SSI Provider</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'UtilsHome' }">Service Guide</b-nav-item>
        <b-nav-item :to="{ name: 'CreateToken' }">Create token</b-nav-item>
        <b-nav-item :to="{ name: 'RegisterOrganization' }">Apps</b-nav-item>
        <b-nav-item :to="{ name: 'DefineCredentialType' }">
          Credential types
        </b-nav-item>
        <b-nav-item :to="{ name: 'DefineJolocomType' }">
          Jolocom types
        </b-nav-item>
        <b-nav-item :to="{ name: 'DefineIndySchema' }">
          Indy schemas
        </b-nav-item>
        <b-nav-item :to="{ name: 'DefineIdaType' }">
          Datakeeper types
        </b-nav-item>
        <b-nav-item :to="{ name: 'DefineTrinsicSchema' }">
          Trinsic schemas
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// export default {
//   mounted() {
//     this.$router.push("/utils/create-token");
//   },
// };
</script>
