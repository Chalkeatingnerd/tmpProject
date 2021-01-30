<template>
  <div>
    <div>
      <ErrorMessage :errorMsg="this.errorMsg"></ErrorMessage>
    </div>
    <hr>
    <div>
      <form>
        <div>
        会員NO：<input type="text" name="memberNo" v-model="searchForm.memberNo">
        </div>
        <div>
        車種タイプ：
          <select name="category" v-model="searchForm.category">
            <option value="1">輕車</option>
            <option value="2">小型車</option>
            <option value="3">中型車</option>
            <option value="4">大型車</option>
            <option value="5">トラック</option>
          </select>
        </div>
        <div>
        ご出発日：<input type="date" name="startDay" v-model="searchForm.startDay">
        </div>
        <div>
        ご返却日：<input type="date" name="endDay" v-model="searchForm.endDay">
        </div>
        <br>
        <div>
          <button @click.prevent="goPage('/')">戻る</button>
          <button type="reset" @click.prevent="clear">クリア</button>
          <button @click.prevent="search()">検索</button>
        </div>
      </form>
    </div>
    <hr>
    <!-- temporarily set false to be visible -->
    <div v-if="this.showMember">
      <h3>会員情報</h3>
      会員NO：{{this.memberInfo.memberNo}}<br>
      氏名：{{this.memberInfo.name}}<br>
      電話番号：{{this.memberInfo.tel}}<br>
    </div>
    <div v-if="this.showRes">
      <h3>予約条件</h3>
      ご出発日 ：{{this.resInfo.startDay}}<br>
      ご返却日：{{this.resInfo.endDay}}<br>
      車種タイプ ：{{this.resInfo.category}}<br>
    </div>
    <br>
    <div v-if="this.showCarContainer">
      <h3>予約車一覧</h3>
      <div>
        <button @click.prevent="toPrevious()">前へ</button>
        <button @click.prevent="toNext()">次へ</button>
      </div>
      <br>
      <table border="1" v-if="this.existCarList">
        <tr>
          <td>選択</td>
          <td>車登録コード</td>
          <td>車名</td>
          <td>メーカー</td>
          <td>排気量</td>
          <td>レンタル金額(1日毎)</td>
        </tr>
        <tr v-for="cars in carList" :key="cars.carCode">
          <td><input type="checkbox" v-model="cars.check"></td>
          <td>{{cars.carCode}}</td>
          <td>{{cars.carName}}</td>
          <td>{{cars.carMaker}}</td>
          <td>{{cars.engine}}</td>
          <td>{{cars.rentalMoney}}</td>
        </tr>
      </table>
      <br>
      <button @click.prevent="confirm()">確認</button>
    </div>
    <div v-else-if="!this.showCarContainer">
        条件に合った商品がありませんでした。
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ErrorMessage from '../components/common/ErrorMessage.vue';

export default {
  components: {
    ErrorMessage,
  },
  name: 'ReserveSearch',
  data() {
    return {
      searchForm: {
        memberNo: '',
        category: '',
        startDay: '',
        endDay: '',
      },
      memberInfo: {
        memberNo: '',
        name: '',
        tel: '',
      },
      resInfo: {
        startDay: '',
        endDay: '',
        category: '',
      },
      carList: [],
      showMember: false,
      showRes: false,
      showCarContainer: false,
      existCarList: false,
      errorMsg: '',
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
    clear() {
      Object.keys(this.searchForm).forEach((x) => {
        this.searchForm[x] = '';
      });
    },
    toPrevious() {

    },
    toNext() {

    },
    search() {
      const errorFlg = this.validation();

      if (errorFlg) {
        return;
      }

      let url = 'http://localhost:8080/member2/';
      url += this.searchForm.memberNo;

      axios
        .get(url)
        .then(
          (res) => {
            if (!res.data.memberNo) {
              this.errorMsg = '有効な会員番号を入力してください';
              return;
            }

            this.memberInfo.memberNo = res.data.memberNo;
            this.memberInfo.name = res.data.name;
            this.memberInfo.tel = res.data.tel;

            this.showCarContainer = true;
            this.existCarList = true;

            this.showMember = true;
            const { startDay, endDay } = this.searchForm;
            this.resInfo.startDay = startDay;
            this.resInfo.endDay = endDay;
            this.showRes = true;
          },
        )
        .catch(
          () => {
            this.goPage('/Error');
          },
        );

      url = 'http://localhost:8080/cars/';
      // url += '?startDay=' + this.searchForm.startDay + '&endDay=' + this.searchForm.endDay;
      // url += `?startDay=${this.searchForm.startDay}&endDay=${this.searchForm.endDay}`;
      url += `?category=${this.searchForm.category}`;

      axios
        .get(url)
        .then(
          (res) => {
            this.carList = res.data;
            this.resInfo.category = res.data[0].ctgrId;

            if (this.carList === '') {
              this.existCarList = false;
            } else {
              this.existCarList = true;
            }
          },
        )
        .catch(
          () => {
            this.goPage('/Error');
          },
        );
    },
    validation() {
      let errorFlg = false;
      this.errorMsg = '';

      if (this.searchForm.memberNo === '') {
        errorFlg = true;
        this.errorMsg = '会員番号は必須入力です';
      }
      if (this.searchForm.category === '') {
        errorFlg = true;
        this.errorMsg = '車種タイプは必須入力です';
      }
      if (this.searchForm.startDay === '') {
        errorFlg = true;
        this.errorMsg = '出発日は必須入力です';
      } else if (this.dateCheck(this.searchForm.startDay, this.searchForm.endDay)) {
        errorFlg = true;
      }
      if (this.searchForm.endDay === '') {
        errorFlg = true;
        this.errorMsg = '返却日は必須入力です';
      } else if (this.dateCheck(this.searchForm.startDay, this.searchForm.endDay)) {
        errorFlg = true;
      }
      return errorFlg;
    },
    dateCheck(date1, date2) {
      let isError = false;
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      if (d1 > d2) {
        this.errorMsg = 'ご返却日はご出発日より未来の日付またはご出発日と同じ日付を入力してください';
        isError = true;
      }
      return isError;
    },
    confirm() {
      const checkCarsList = this.carList.filter((x) => x.check);
      // let index = 0;
      // for (const cars of this.carList) {
      //   if (cars.check === '1') {
      //     checkCarsList[index] = cars;
      //     index += 1;
      //   }
      // }
      this.$store.commit('updateCheckCarsList', checkCarsList);
      this.$store.commit('updateMemberInfo', this.memberInfo);
      this.$store.commit('updateResInfo', this.resInfo);
      this.goPage('/ReserveConfirm');
    },
  },
};
</script>
<style>
  table{
    margin:auto;
  }
  button{
    margin:0.1rem;
  }
</style>
