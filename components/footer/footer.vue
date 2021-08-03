<template>
  <footer class="footer">© 2018-{{ new Date().getFullYear() }}</footer>
</template>

<style scoped>
.footer {
  position: relative;
  width: calc(100% - 40px);
  left: 50%;
  top: calc(50% - 12px);
  transform: translate(-50%, -50%);
  text-align: center;
  border-top: #ccc 1px solid;
  padding-top: 18px;
  font-size: 14px;
  color: #ccc;
}

@media (max-width: 767px) {
  .footer {
    height: 35px;
    top: calc(50% - 40px);
  }
}
</style>