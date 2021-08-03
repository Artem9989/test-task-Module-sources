<template>
  <form class="submit" @submit.prevent="onSubmit">
    <div class="error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <input
      required
      v-model="name"
      class="submit__info"
      type="text"
      placeholder="Ваше имя"
    />

    <input
      v-model="text"
      class="submit__info"
      type="text"
      placeholder="Ваш коментарий"
    />
    <input
      class="submit__info submit__info--btn"
      type="submit"
      :value="loading"
    />
  </form>
</template>

<script>
export default {
  props: ["image", "imgId"],
  data: () => ({
    text: null,
    name: null,
    loading: "Отправить комментарий",
    errorMessage: null,
  }),
  methods: {
    async addReview(photoOverview) {
      this.loading = "Отправляется...";
      await this.$axios
        .$post(
          `https://boiling-refuge-66454.herokuapp.com/images/${this.imgId}/comments`,
          { comment: photoOverview.text, name: photoOverview.name }
        )
        .then((response) => {
          this.loading = "Отправить комментарий";
          this.image.comments.push(photoOverview);
        })
        .catch((error) => {
          setTimeout(() => (this.errorMessage = null), 3000);
          this.loading = "Отправить комментарий";
          const errors = error.response.data.errors;
          this.errorMessage = errors
            ? errors.name || errors.comment
            : `Ошибка: ${errors}`;
        });
    },
    onSubmit() {
      let photoOverview = {
        name: this.name,
        text: this.text,
        id: Date.parse(new Date()),
        date: Date.parse(new Date()),
      };
      this.addReview(photoOverview);
      this.name = null;
      this.text = null;
    },
  },
};
</script>

<style scoped>
input {
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
  margin: 0px;
}
.submit__info {
  margin: 10px 0;
  height: 30px;
  width: 100%;
  max-width: 331px;
  padding: 6px 11px 8px 11px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 3px;
}
.submit__info--btn {
  background: #4997d0;
  cursor: pointer;
  color: #fff;
}
.submit {
  margin-top: 20px;
}

@media (max-width: 600px) {
  .error {
    color: red;
    font-size: 1rem;
    margin: 10px 22px 10px 22px;
  }

  .submit__info {
    margin: 10px 22px;
    width: calc(100% - 44px);
    max-width: 100%;
  }
  .submit__info--btn {
    background: #4997d0;
    cursor: pointer;
  }

  form {
    margin: 1px;
  }

  .submit {
    order: 1;
    margin-top: 10px;
  }
}
</style>