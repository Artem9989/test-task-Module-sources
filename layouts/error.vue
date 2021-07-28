<template>
    <section> 
        <h1> 
            Error 404
        </h1>
        <nuxt-link to="/">
            Home
        </nuxt-link>
    </section>
</template>

<style scoped>
section{
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    width: 768px;
    margin: 0 auto;
    padding-top: 5rem;
}
h1{
    color: red;
}
</style>