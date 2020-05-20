<template>
  <b-img
    class="d-block mx-auto mb-4"
    :src="connector.imageUrl"
    :alt="connector.title"
    width="150"
  />
</template>

<script>
export default {
  name: "ConnectorImage",
  props: {
    connector: {
      type: Object,
      required: true,
    },
  },
};
</script>
