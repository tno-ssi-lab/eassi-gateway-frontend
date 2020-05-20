<template>
  <div class="status-header">
    <p v-if="notification" class="lead notification" v-text="notification"></p>
  </div>
</template>

<script>
const notificationMap = {
  started: "Starting session...",
  handling: "Handling data...",
  error: "Something went wrong, you will be redirected shortly.",
  cancelled: "You cancelled the request, you will be redirected shortly.",
  success: "Success! We'll redirect you shortly.",
};

export default {
  name: "StatusHeader",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    notification() {
      return notificationMap[this.status];
    },
  },
};
</script>
