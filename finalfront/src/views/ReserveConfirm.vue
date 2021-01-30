<template>
  <div>
    <div>
      <ErrorMessage :errorMsg="this.errorMsg"></ErrorMessage>
    </div>
    <h3>■この予約条件でよろしいですか?</h3>
    <hr>
    <div>
      <h3>●会員情報</h3>
      <table border="1">
        <tr>
          <td>会員NO</td>
          <td>{{ this.$store.state.memberInfo.memberNo }}</td>
         </tr>
        <tr>
          <td>氏名</td>
          <td>{{ this.$store.state.memberInfo.name }}</td>
        </tr>
        <tr>
          <td>電話番号</td>
          <td>{{ this.$store.state.memberInfo.tel }}</td>
        </tr>
      </table>
    </div>
    <div>
      <h3>●予約条件</h3>
      <table border="1">
        <tr>
          <td>ご出発日</td>
          <td>{{ this.$store.state.resInfo.startDay }}</td>
        </tr>
        <tr>
          <td>ご返却日</td>
          <td>{{ this.$store.state.resInfo.endDay }}</td>
        </tr>
        <tr>
          <td>車種タイプ</td>
          <td>{{ this.$store.state.resInfo.category }}</td>
        </tr>
      </table>
    </div>
    <br>
    <hr>
    <div>
      <h3>●予約車一覧</h3>
      <table border="1">
        <tr>
          <td>車登録コード</td>
          <td>車名</td>
          <td>メーカー</td>
          <td>排気量</td>
          <td>レンタル金額(1日毎)</td>
        </tr>
        <tr v-for="cars in this.$store.state.checkCarsList" :key="cars.carCode">
          <td>{{cars.carCode}}</td>
          <td>{{cars.carName}}</td>
          <td>{{cars.carMaker}}</td>
          <td>{{cars.engine}}</td>
          <td>{{cars.rentalMoney}}</td>
        </tr>
      </table>
    </div>
    <div>
      <h3>■料金</h3>
      <table border="1">
        <tr>
          <td>ご利用日数</td>
          <td>{{this.totalCost.rentDay}}</td>
        </tr>
        <tr>
          <td>ご利用料金</td>
          <td>{{this.totalCost.serviceExpense}}</td>
        </tr>
        <tr>
          <td>消費税</td>
          <td>{{this.totalCost.tax}}</td>
        </tr>
        <tr>
          <td>合計</td>
          <td>{{this.totalCost.totalExpense}}</td>
        </tr>
      </table>
    </div>
    <br>
    <div>
      <button @click="goPage('/ReserveSearch')">戻る</button>
      <button @click="confirm()">実行</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ErrorMessage from '../components/common/ErrorMessage.vue';

export default {
  data() {
    return {
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
      errorMsg: '',
      carList: [],
      totalCost: {
        rentDay: '',
        serviceExpense: '',
        tax: '',
        totalExpense: '',
      },
    };
  },
  components: {
    ErrorMessage,
  },
  mounted() {
    const tmpStartDay = this.$store.state.resInfo.startDay;
    const tmpEndDay = this.$store.state.resInfo.endDay;
    this.totalCost.rentDay = this.dateBetween(tmpStartDay, tmpEndDay);
    this.totalCost.serviceExpense = String(this.costSum());
    this.totalCost.tax = String(this.costSum() * 0.1);
    this.totalCost.totalExpense = String(this.costSum() * 0.9);
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
    confirm() {
      const collectNo = this.torimatome();
      const tmpCarsList = this.$store.state.checkCarsList;
      let carCodeList;
      let rmList;

      const url = 'http://localhost:8080/reserve/';
      const requestParam = new URLSearchParams();

      requestParam.append('memberNo', this.memberInfo.memberNo);
      requestParam.append('startDay', this.resInfo.startDay);
      requestParam.append('endDay', this.resInfo.endDay);
      requestParam.append('collectNo', collectNo);
      tmpCarsList.forEach((carinfo) => {
        console.log(carinfo.carCode);
        carCodeList = carinfo.carCode;
        rmList = Number(carinfo.rentalMoney);
      });
      requestParam.append('carCodeList', carCodeList);
      requestParam.append('rentalMoneyList', rmList);

      axios
        .post(url, requestParam)
        .then(
          (res) => {
            this.$store.commit('updateRentalNo', res.data.rentalNo);
            this.goPage('/ReserveNo');
          },
        )
        .catch(
          () => {
            this.goPage('/Error');
          },
        );
    },

    dateBetween(tmpStartDay, tmpEndDay) {
      if (!tmpStartDay && !tmpEndDay) {
        return '';
      }
      const currDay = 24 * 60 * 60 * 1000;
      const sub = this.toDate(tmpEndDay) - this.toDate(tmpStartDay);
      const dayGap = parseInt(sub / currDay, 10);
      const result = String(`${dayGap}泊${dayGap + 1}日`);
      return result;
    },
    toDate(date) {
      const modDate = date;
      const sYear = modDate.substring(0, 4);
      const sMonth = modDate.substring(5, 7);
      const sDay = modDate.substring(8, 10);
      const result = new Date(Number(sYear), Number(sMonth), Number(sDay));
      return result;
    },
    costSum() {
      let result = 0;
      for (const car of this.$store.state.checkCarsList) { // eslint-disable-line
        result += Number(car.rentalMoney);
      }
      return result;
    },
    torimatome() {
      const newDate = new Date();
      const tmpMemberNo = String(this.$store.state.memberInfo.memberNo);
      const tmpYear = String(newDate.getFullYear()).substr(2);
      const tmpMonth = String(newDate.getMonth() + 1);
      const tmpDay = String(newDate.getDate());
      const tmpHours = String(newDate.getHours());
      const tmpMin = String(newDate.getMinutes());
      const tmpSec = String(newDate.getSeconds());
      const torimatomeNum = tmpMemberNo + tmpYear + tmpMonth + tmpDay + tmpHours + tmpMin + tmpSec;
      return torimatomeNum;
    },
  },
};
</script>
