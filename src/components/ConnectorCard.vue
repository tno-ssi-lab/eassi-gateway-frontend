<template>
  <b-card
    :title="connector.title"
    class="connector-card text-center"
    :class="{
      'connector-enabled': connector.enabled,
      'connector-disabled': !connector.enabled,
      'text-muted': !connector.enabled,
    }"
    body-class="d-flex flex-column"
    @click="connector.enabled && $emit('choice')"
  >
    <div class="flex-grow-1 d-flex align-items-center">
      <div class="flex-grow-1 p-5">
        <b-img
          class="connector-image my-1"
          :src="connector.imageUrl"
          fluid-grow
        />
        <div class="enabled-notice text-muted" :aria-hidden="connector.enabled">
          Unavailable
        </div>
      </div>
    </div>

    <template #footer>
      <div class="d-inline-flex mx-1">
        <a :href="connector.appleDownloadUrl" target="_blank" @click.stop>
          <b-img
            class="store-badge"
            src="../assets/app-store-badge.svg"
            fluid
          />
        </a>
      </div>
      <div class="d-inline-flex mx-1">
        <a :href="connector.googleDownloadUrl" target="_blank" @click.stop>
          <b-img
            class="store-badge"
            alt="Get it on Google Play"
            src="../assets/google-play-badge.svg"
            fluid
          />
        </a>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "ConnectorCard",
  props: {
    connector: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.store-badge {
  height: 40px;
}

.connector-enabled:hover {
  /* background: rgba(0, 0, 0, 0.05); */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
  cursor: pointer;
}

.connector-enabled .enabled-notice {
  opacity: 0;
}

.connector-disabled {
  background: rgba(0, 0, 0, 0.05);
}

.connector-disabled img {
  opacity: 0.6;
}
</style>
