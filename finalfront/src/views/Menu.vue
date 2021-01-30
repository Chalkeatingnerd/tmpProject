<template>
  <div class="container">
    <a class="menu" @click="goPage('/UserRegister')">会員登録</a>
    <a class="menu" @click="goPage('/ReserveSearch')">新規予約</a>
    <a class="menu" @click="goPage('/ReserveDetail')">予約検索</a>
  </div>
</template>

<script>
export default {
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
  .menu
    font-size 2rem
    text-decoration none
    margin-bottom 3rem
    cursor pointer
</style>
