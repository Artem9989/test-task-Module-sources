<template>
  <section class="container">
    <h1>{{ pageTitle }}</h1>
    <ul class="content">
      <li class="content__item" v-for="img of images" :key="img.id">
        <img
          v-if="img.url"
          class="content__item-img"
          :id="img.id"
          :src="img.url"
          @click.prevent="showModalInfo(img.id)"
          alt="Картинка потерялась"
          title="Картинка"
        />
        <div v-else class="preload">
            <img class="preload__img" src="@/static/spinner.gif" />
          </div>
      </li>
    </ul>
    <Popup v-if="showModal" @closePopup="closePopup" :imgId="imgId"> </Popup>
    <Footer> </Footer>
  </section>

</template>

<script>
import Footer from '../components/footer/footer.vue'
export default {
  async fetch({ store }) {
    if (store.getters["images/images"].length === 0) {
      await store.dispatch("images/fetch");
    }
  },
  data: () => ({
    pageTitle: "Test APP",
    showModal: false,
    imgId: null,
  }),
  computed: {
    images() {
      return this.$store.getters["images/images"];
    },
  },
  methods: {
    async showModalInfo(imgId) {
      this.imgId = imgId;
      this.showModal = true;
      document.documentElement.style.overflow = 'hidden'
    },
    closePopup() {
      this.showModal = false;
      document.documentElement.style.overflow = 'auto'
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Roboto;
}
h1{
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.preload {
  text-align: center;
  width: 230px;
}
.preload__img{
  height: 115px;
}
h1 {
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding: 15px 0 0 0;
  margin: 0;
}
.container {
  max-width: 768px;
  height: 100vh;
  margin: 0 auto;
}
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
  .content__item-img{
    max-width: 300px;

  }
  .content__item{
    margin: 15px 20px;
  }
}
@media (max-width: 767px) {
  .content__item-img{
    max-width: 300px;

  }
  .content__item{
    margin: 15px 20px;
  }
}
</style>