<template>
  <div v-if="loader" class="preload">
    <img class="preload__img" src="@/static/spinner.gif" />
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "loader"],
};
</script>

<style scoped>
.preload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>