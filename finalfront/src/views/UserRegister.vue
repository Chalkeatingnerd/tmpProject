<template>
  <div>
    <div>
      <ErrorMessage :errorMsg="this.errorMsg"></ErrorMessage>
    </div>
    <div class="searchContainer">
      <form>
        <div>
          氏名 :
          <input type="text" name="name" v-model="registUserData.name" />
        </div>
        <div>
          年齢 :
          <input type="text" name="age" v-model="registUserData.age" />
        </div>
        <div>
          性別 :
          <select name="sex" v-model="registUserData.sex">
            <option value="m">男性</option>
            <option value="f">女性</option>
          </select>
        </div>
        <div>
          郵便番号 :
          <input type="text" name="zip" v-model="registUserData.zip" />
        </div>
        <div>
          住所 :
          <input type="textarea" name="address" v-model="registUserData.address" />
        </div>
        <div>
          電話番号 :
          <input type="text" name="tel" v-model="registUserData.tel" />
        </div>
        <button @click.prevent="goPage('/')">戻る</button>
        <button type="reset" @click.prevent="clear">クリア</button>
        <button @click.prevent="confirm">確認</button>
      </form>
    </div>
  </div>
</template>
<script>
import ErrorMessage from '../components/common/ErrorMessage.vue';

export default {
  components: {
    ErrorMessage,
  },
  name: 'UserRegister',
  data() {
    return {
      mode: 'insert',
      registUserData: {
        name: '',
        age: '',
        sex: '',
        zip: '',
        address: '',
        tel: '',
      },
      errorMsg: '',
    };
  },
  mounted() {
    this.registUserData = this.$store.state.registUserData;
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
    clear() {
      Object.keys(this.registUserData).forEach((x) => {
        this.registUserData[x] = '';
      });
    },
    confirm() {
      const errorFlg = this.validation();

      if (!errorFlg) {
        this.$store.commit('updateRegistUserData', this.registUserData);
        this.goPage('/UserRegistConfirm');
      }
    },
    validation() {
      let errorFlg = false;
      this.errorMsg = '';

      if (this.registUserData.name === '') {
        errorFlg = true;
        this.errorMsg = '名前は必須入力です';
      } else if (this.registUserData.name.length > 20) {
        errorFlg = true;
        this.errorMsg = '名前は20字以内に入力してください';
      }
      if (this.registUserData.age === '') {
        errorFlg = true;
        this.errorMsg = '年齢は必項入力です';
      } else if (!this.registUserData.age.match(/^[0-9]*$/)) {
        errorFlg = true;
        this.errorMsg = '年齢は数字で入力してください';
      } else if (this.registUserData.age < 0 || this.registUserData.age > 150) {
        errorFlg = true;
        this.errorMsg = '年齢は1~150の中で入力してください';
      }
      if (this.registUserData.sex === '') {
        errorFlg = true;
        this.errorMsg = '性別は必項入力です';
      }
      if (this.registUserData.zip.length > 8 || !this.registUserData.zip.match(/^[0-9]*$/)) {
        errorFlg = true;
        this.errorMsg = '郵便番号は数字のみ8字以内でしてください';
      }
      if (this.registUserData.address.length > 50) {
        errorFlg = true;
        this.errorMsg = '住所は50字以内に入力してください';
      }
      if (this.registUserData.tel === '') {
        errorFlg = true;
        this.errorMsg = '電話番号は必項入力です';
      } else if (!this.registUserData.tel.match(/^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}/)) {
        errorFlg = true;
        this.errorMsg = '電話番号は半角数字とハイフンを使って入力してください';
      }
      return errorFlg;
    },

  },
};
</script>
