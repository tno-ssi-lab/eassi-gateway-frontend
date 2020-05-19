<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="/utils">Utils</router-link>
      </li>
      <li>
        <router-link to="/issue/someToken">Issue</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
