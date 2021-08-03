<template>
  <section>
    <div>
      <h1>Error 404</h1>
      <nuxt-link to="/"> Home </nuxt-link>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  height: 100vh;
}
div {
  margin: auto;
  display: flex;
  flex-direction: column;
}
h1 {
  color: red;
}
</style>