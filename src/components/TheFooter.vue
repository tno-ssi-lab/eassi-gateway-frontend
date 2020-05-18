<template>
  <footer class="footer">
    <b-container class="text-center">
      <span class="text-muted">SSI Service Provider &ndash; TNO</span>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  props: {
    myProp: String,
  },
};
</script>

<style>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
}
</style>
