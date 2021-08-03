<template>
  <h1>{{ pageTitle }}</h1>
</template>
<script>
export default {
  props: ["pageTitle"],
};
</script>


<style scoped>
h1 {
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding: 15px 0 0 0;
  margin: 0;
}
</style>