<template>
  <div class="content__img">
    <img
      class="content__img"
      :src="image"
      alt="Тут была картинка, потерялась"
      title="Картинка"
    />
  </div>
</template>

<script>
export default {
  props: ["image"],
  data: () => ({}),
};
</script>

<style scoped>
.content__img {
  width: 100%;
  height: 205px;
  object-fit: cover;
  border-radius: 3px;
  max-width: 331px;
}
@media (max-width: 600px) {
  .content__img {
    height: auto;
    max-width: 100%;
  }
}
</style>