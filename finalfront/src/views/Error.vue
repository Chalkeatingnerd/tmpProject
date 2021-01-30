<template>
  <div>
    <h1>予期せぬエラーが発生しました。管理者にお問い合わせください</h1>
    <button @click="goPage('/')">メニューへ</button>
  </div>
</template>

<script>
export default {
  name: 'error',
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
  },
};
</script>
