<template>
  <ul class="content">
    <li class="content__item" v-for="img of images" :key="img.id">
      <img
        class="content__item-img"
        :id="img.id"
        :src="img.url"
        @click.prevent="showModalInfo(img.id)"
        alt="Картинка потерялась"
        title="Картинка"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: ["images", "showModalInfo"],
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
}

.content__item-img {
  transform: scale(1);
  width: 100%;
  border-radius: 3px;
  max-width: 230px;
}

.content__item:hover {
  box-shadow: 0 5px 5px #c0c0c0;
  border-radius: 3px;
  cursor: pointer;
  transform: scale(1.05);
  transition-duration: 0.2s;
}

.content__item {
  display: flex;
  list-style-type: none;
  margin: 15px 10px;
  transition-duration: 0.1s;
}

@media (max-width: 500px) {
  .content__item-img {
    max-width: 300px;
  }
  .content__item {
    margin: 15px 20px;
  }
}
@media (max-width: 767px) {
  .content__item-img {
    max-width: 300px;
  }
  .content__item {
    margin: 15px 20px;
  }
}
</style>