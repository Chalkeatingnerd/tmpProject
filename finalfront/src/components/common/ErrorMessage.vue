<template>
  <div class="errorMessage">
    <span>{{errorMsg}}</span>
  </div>
</template>
<script>
export default {
  name: 'ErrorMessage',
  props: {
    errorMsg: {
      type: String,
    },
  },
};
</script>
<style lang="stylus" scoped>
  .errorMessage
    color red
    margin-bottom 1rem
</style>
