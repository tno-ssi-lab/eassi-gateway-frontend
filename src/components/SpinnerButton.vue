<template>
  <b-button type="submit" variant="primary" :disabled="processingState">
    <div v-if="processingState">
      <b-spinner small></b-spinner>
      {{ processingLabel }}
    </div>
    <div v-else>
      {{ label }}
    </div>
  </b-button>
</template>

<script>
export default {
  name: "SpinnerButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    processingState: {
      type: Boolean,
      required: true,
    },
    processingLabel: {
      type: String,
      required: false,
      default: "Processing...",
    },
  },
};
</script>
