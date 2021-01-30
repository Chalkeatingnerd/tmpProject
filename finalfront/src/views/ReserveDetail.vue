<template>
  <div>
    <div>
      <ErrorMessage :msgs="msgs"></ErrorMessage>
    </div>
    <hr>
    <form>
      <div>
      会員NO：<input type="text" name="memberNo" v-model="searchForm.memberNo">
      </div>
      <div>
      予約貸出とまとめNO：<input type="text" name="reserveNo" v-model="searchForm.reserveNo">
      </div>
      <div>
        <button type="reset" @click.prevent="clear">クリア</button>
        <button @click.prevent="search()">検索</button>
      </div>
    </form>
    <hr>
    <div v-if="!this.showMember">
      <h3>●会員情報</h3>
      会員NO：{{this.memberInfo.memberNo}}<br>
      氏名：{{this.memberInfo.name}}<br>
      電話番号：{{this.memberInfo.tel}}<br>
    </div>
    <div v-if="!this.showRes">
      <h3>●予約条件</h3>
      ご出発日 ：{{this.searchForm.startDate}}<br>
      ご返却日：{{this.searchForm.endDate}}<br>
    </div>
    <div v-if="!this.showCarContainer">
      <h3>●予約車一覧</h3>
      <table border="1" v-if="!this.existCarList">
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
      <div>
        <h3>■料金</h3>
        <table border="1">
          <tr>
            <td>ご利用日数</td>
            <td>{{rentDay}}</td>
          </tr>
          <tr>
            <td>ご利用料金</td>
            <td>{{serviceExpense}}</td>
          </tr>
          <tr>
            <td>消費税</td>
            <td>{{tax}}</td>
          </tr>
          <tr>
            <td>合計</td>
            <td>{{totalExpense}}</td>
          </tr>
        </table>
     </div>
    </div>
    <div v-else-if="this.showCarContainer">
      条件に合った商品がありませんでした。
    </div>
    <button @click.prevent="goPage('/')">戻る</button>
    <!-- edit, cancel should not be activated when there's no result -->
    <button @click.prevent="edit()">予約変更</button>
    <button @click.prevent="cancel()">予約キャンセル</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ReserveDetail',
  data() {
    return {
      searchForm: {
        memberNo: '',
        reserveNo: '',
      },
      memberInfo: {
        memberNo: '',
        name: '',
        tel: '',
      },
      carList: [],
      showMember: false,
      showRes: false,
      showCarContainer: false,
      existCarList: false,

      errorMsg: '',

      rentDay: '',
      serviceExpense: '',
      tax: '',
      totalExpense: '',
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
    search() {
      const errorFlg = this.validation();

      if (errorFlg) {
        return;
      }

      // 検索実行
      // axiosを使ってAPIサーバに問い合わせる
      let url = 'http://localhost:8080/member2/';
      url += this.searchForm.memberNo;

      // 会員情報を取得
      axios
        .get(url)
        .then(
          (res) => {
            this.memberInfo.memberNo = res.data.memberNo;
            this.memberInfo.name = res.data.name;
            this.memberInfo.tel = res.data.tel;
            this.showMember = true;
            this.showRes = true;
          },
        )
        .catch(
          () => {
            this.goPage('/Error');
          },
        );

      url = 'http://localhost:8080/cars/';
      // url += '?startDate=' + this.searchForm.startDate + '&endDate=' + this.searchForm.endDate;
      url += `?startDate=${this.searchForm.startDate}&endDate=${this.searchForm.endDate}`;
      // 商品一覧を取得
      axios
        .get(url)
        .then(
          (res) => {
            this.carList = res.data;
            this.showCarContainer = true;
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
      if (this.searchForm.reserveNo === '') {
        errorFlg = true;
        this.errorMsg = '予約NOは必須入力です';
      }
      return errorFlg;
    },
    edit() {
      this.goPage('/ReserveEdit');
    },
    cancel() {
      this.goPage('/ReserveCancel');
    },
  },
};
</script>
