<template>
  <div class="container-comments">
    <div class="comments" v-for="comment of comments" :key="comment.id">
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
    <span v-if="comments == false" class="comments__text">
      Коментарии отсутствуют</span
    >
  </div>
</template>

<script>
export default {
  props: ["comments"],
};
</script>

<style scoped>
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
@media (max-width: 600px) {
  .content__wrap {
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
  }
  .content__img {
    height: auto;
    max-width: 100%;
  }

  .container-comments {
    order: 0;
    width: 100%;
    max-height: 50vh;
    margin: 22px 0px 0px 22px;
    padding: 0 17px 0 0;
    height: auto;
  }
}
</style>