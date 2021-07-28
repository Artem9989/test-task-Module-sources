<template>
  <transition name="fade" appear>
    <div class="popup">
      <div class="content">
        <span class="content__close" @click="closePopup">×</span>

        <div class="content__wrap">
          <div class="content__img">
            <img
              v-if="image.url"
              class="content__img"
              :src="image.url"
              alt="Тут была картинка, потерялась"
              title="Картинка"
            />
            <div v-else class="preload">
              <img class="preload__img" src="@/static/spinner.gif" />
            </div>

          </div>
          <form class="submit" @submit.prevent="onSubmit">
                        <div class="error" v-if="errorMessage">
              {{ errorMessage }}
            </div><input
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
          <div class="container-comments">
            <div
              class="comments"
              v-for="comment of image.comments"
              :key="comment.id"
            >
              <span
                v-if="comment.date < new Date().setHours(0, 0, 0, 0)"
                class="comments__date"
              >
                {{ comment.name }}
                {{ new Date(comment.date).toLocaleDateString() }}
              </span>
              <span v-else class="comments__date">
                {{ comment.name }}
                {{ new Date(comment.date).toLocaleTimeString() }}</span
              >

              <span class="comments__text" :title="comment.text">
                {{ comment.text }}</span
              >
            </div>
            <span v-if="image.comments == false" class="comments__text">
              Коментарии отсутствуют</span
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["imgId"],
  data: () => ({
    image: [],
    text: null,
    name: null,
    loading: "Отправить комментарий",
    errorMessage: null,
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
.preload {
  text-align: center;
}
.preload__img {
  height: 80px;
}

.error {
  color: red;
  font-size: 1rem;
  margin: 0px;
}
.popup {
  position: fixed;
  z-index: 1;
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
.submit__info {
  margin: 10px 0;
  height: 30px;
  width: 100%;
  max-width: 331px;
  padding: 7px 11px 8px 11px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 3px;
}
.submit__info--btn {
  background: #4997d0;
  cursor: pointer;
  color: #fff;
}

.content__wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 30px;
  width: 54%;
  height: 395px;
}
.content__img {
  width: 100%;
  height: 205px;
  object-fit: cover;
  border-radius: 3px;
  max-width: 331px;
}

.comments__text {
  margin: 5px 0 20px 0;
  overflow-wrap: break-word;
}

.comments__date {
  color: #999;

  margin: 0;
  word-wrap: break-word;
}
.container-comments {
  width: 60%;
  margin-top: 5px;
  line-height: 15px;
  font-size: 13px;
  overflow: auto;
  padding: 0 3px 0 0;
  margin-left: 14px;
  height: 365px;
}
.container-comments::-webkit-scrollbar {
  width: 5px;
  background-color: #f9f9fd;
}
.container-comments::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #ececec;
}
.comments {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.submit {
  margin-top: 20px;
}
@media (max-height: 430px) {
  .popup {
    height: calc(100vh - 50vh);
    padding-top: 50vh;
  }
}

@media (max-width: 600px) {
  .error {
    color: red;
    font-size: 1rem;
    margin: 10px 22px 10px 22px;
  }

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
  .submit__info {
    margin: 10px 22px;
    width: calc(100% - 44px);
    max-width: 100%;
  }
  .submit__info--btn {
    background: #4997d0;
    cursor: pointer;
  }

  .content__wrap {
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
  }
  .content__img {
    height: auto;
    max-width: 100%;
  }
  form {
    margin: 1px;
  }

  .container-comments {
    order: 0;
    width: 100%;
    max-height: 50vh;
    margin: 22px 0px 0px 22px;
    padding: 0 17px 0 0;
    height: auto;
  }
 
  .submit {
    order: 1;
    margin-top: 10px;
  }
}
</style>