<template>
  <div class="issue">
    {{ token }}
  </div>
</template>

<script>
export default {
  name: "Issue",
  props: {
    token: {
      type: String,
      required: true,
    },
  },
};
</script>
