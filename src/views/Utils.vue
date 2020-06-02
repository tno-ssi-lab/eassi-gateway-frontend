<template>
  <div class="utils">
    <b-navbar>
      <b-navbar-brand>TNO SSI Provider</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'CreateToken' }">Create token</b-nav-item>
        <b-nav-item :to="{ name: 'RegisterOrganization' }"
          >Organizations</b-nav-item
        >
        <b-nav-item href="#" disabled>Credential types</b-nav-item>
        <b-nav-item href="#" disabled>Jolocom types</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
