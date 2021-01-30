<template>
  <div>
  <h1>予約が感慮しました。</h1>
  <h3>予約NOは{{this.$store.state.rentalNo}}です</h3>
  <button @click="goPage('/ReserveSearch')">続けて予約</button>
  <button @click="goPage('/ReserveDetail')">予約情報照会</button>
  </div>
</template>
<script>
export default {
  name: 'ReserveNo',
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
  },
};
</script>
