<template>
  <div>
    <h1>Define Datakeeper Type</h1>
    <define-ida-type-form></define-ida-type-form>
  </div>
</template>

<script>
import DefineIdaTypeForm from "../../components/utils/DefineIdaTypeForm.vue";

export default {
  name: "DefineIdaType",
  components: {
    DefineIdaTypeForm,
  },
};
</script>
