<template>
  <div class="verify">
    {{ token }}
  </div>
</template>

<script>
export default {
  name: "Verify",
  props: {
    token: {
      type: String,
      required: true,
    },
  },
};
</script>
