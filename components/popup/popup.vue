<template>
  <transition name="fade" appear>
    <div class="popup" v-on:click.self="closePopup">
      <div v-if="image.url" class="content">
        <span class="content__close" @click="closePopup">×</span>
        <div class="content__wrap">
          <ModalImage :image="image.url" />
          <CommentsSubmit :image="image" :imgId="imgId" />
          <Comments :comments="image.comments" />
        </div>
      </div>
      <Loader v-else :loader="loader" />
    </div>
  </transition>
</template>

<script>
export default {
  props: ["imgId"],
  data: () => ({
    image: {},
    text: null,
    name: null,
    loading: "Отправить комментарий",
    errorMessage: null,
    loader: true,
  }),
  async mounted() {
    this.image = await this.$axios.$get(
      `https://boiling-refuge-66454.herokuapp.com/images/${this.imgId}`
    );
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style>
.modal-open {
  overflow: hidden;
}
</style>

<style scoped>
.popup {
  position: fixed;
  z-index: 50;
  left: 50%;
  top: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}
.popup__close {
  position: relative;
  z-index: 40;
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255, 1);
}
.content {
  width: 619px;
  height: 425px;
  background: rgb(255, 255, 255);
}
.content__close {
  float: right;
  font-size: 42px;
  font-weight: lighter;
  color: #000;
  height: 38px;
  width: 38px;
  cursor: pointer;
  line-height: 1em;
}

.content__wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 30px;
  width: 54%;
  height: 395px;
}

@media (max-height: 430px) {
  .popup {
    height: calc(100vh - 50vh);
    padding-top: 50vh;
  }
}

@media (max-width: 600px) {
  .popup {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    display: block;
    overflow-x: hidden;
    transform: translate(0%, 0%);
    width: 100%;
    height: 100vh;
    padding-top: 0;
    background-color: rgb(255, 255, 255);
  }
  .content {
    width: 100vw;
    height: 100vh;
    background: rgb(255, 255, 255);
  }
  .content__close {
    position: absolute;
    top: 0;
    right: 0px;
    color: #ccc;
  }

  .content__wrap {
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
  }
}
</style>