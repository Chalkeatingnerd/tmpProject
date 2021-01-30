<template>
  <div>
  <h1>会員登録が完了しました</h1>
  <h3>あなたの会員NOは{{this.$store.state.memberNo}}です</h3>
  <button @click="goPage('/ReserveDetail')">予約メニュー</button>
  <button @click="goPage('/ReserveSearch')">新規予約</button>
  </div>
</template>
<script>
export default {
  name: 'UserRegistNo',
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
  },
};
</script>
