<template>
  <div v-if="loader">
    <Loader title="Добро пожаловать" :loader="loader"> </Loader>
  </div>
  <section v-bind:class="{ active: showModal }" v-else class="container">
    <div class="container-inside">
      <Title :pageTitle="pageTitle" />
      <Content :images="images" :showModalInfo="showModalInfo" />
      <Footer> </Footer>
    </div>
    <Popup v-if="showModal" @closePopup="closePopup" :imgId="imgId"> </Popup>
  </section>
</template>

<script>
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
    loader: true,
  }),
  computed: {
    images() {
      return this.$store.getters["images/images"];
    },
  },
  mounted() {
    this.showLoader();
  },
  methods: {
    async showModalInfo(imgId) {
      this.imgId = imgId;
      this.showModal = true;
    },
    closePopup() {
      this.showModal = false;
    },
    showLoader() {
      this.loader = false;
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  font-family: Roboto;
  width: 100%;
}
h1 {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.active {
  overflow-x: hidden;
}

.container-inside {
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
}
.container {
  overflow: auto;
  height: 100vh;
}
</style>