<template>
  <div class="container">
      <div>
        氏名 :
        {{this.$store.state.registUserData.name}}
      </div>
      <div>
        年齢 :
        {{this.$store.state.registUserData.age}}
      </div>
      <div>
        性別 :
        <span v-if="this.$store.state.registUserData.sex=='m'">男</span>
        <span v-if="this.$store.state.registUserData.sex=='f'">女</span>
      </div>
      <div>
        郵便番号 :
        {{this.$store.state.registUserData.zip}}
      </div>
      <div>
        住所 :
        {{this.$store.state.registUserData.address}}
      </div>
      <div>
        電話番号 :
        {{this.$store.state.registUserData.tel}}
      </div>
      <button @click="goPage('/UserRegister')">戻る</button>
      <button @click="confirm()">実行</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegistConfirm',
  data() {
    return {
      registUserData: {
        name: '',
        age: '',
        sex: '',
        zip: '',
        address: '',
        tel: '',
      },
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
    confirm() {
      const url = 'http://localhost:8080/member';

      this.registUserData = this.$store.state.registUserData;
      const requestParam = new URLSearchParams();
      requestParam.append('name', this.registUserData.name);
      requestParam.append('age', this.registUserData.age);
      requestParam.append('sex', this.registUserData.sex);
      requestParam.append('zip', this.registUserData.zip);
      requestParam.append('address', this.registUserData.address);
      requestParam.append('tel', this.registUserData.tel);

      axios
        .post(url, requestParam)
        .then(
          (res) => {
            this.$store.commit('updateMemberNo', res.data.memberNo);
            this.goPage('/UserRegistNo');
          },
        )
        .catch(
          () => {
            this.goPage('/Error');
          },
        );
    },
  },
};
</script>
