<template>
    <div>
      <h1>Define Walt.id Schema</h1>
      <define-waltid-schema-form></define-waltid-schema-form>
    </div>
  </template>
  
  <script>
  import DefineWaltidSchemaForm from "../../components/utils/DefineWaltidSchemaForm.vue";
  
  export default {
    name: "DefineWaltidSchema",
    components: {
        DefineWaltidSchemaForm,
    },
  };
  </script>
  