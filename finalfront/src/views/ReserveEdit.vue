<template>
  <div>
    <div>
      <ErrorMessage :msgs="msgs"></ErrorMessage>
    </div>
    <hr>
    <div>
      <h3>●会員情報</h3>
      <table border="1">
        <tr>
          <td>会員NO</td>
          <td>{{ this.memberInfo.memberNo }}</td>
         </tr>
        <tr>
          <td>氏名</td>
          <td>{{ this.memberInfo.name }}</td>
        </tr>
        <tr>
          <td>電話番号</td>
          <td>{{ this.memberInfo.tel }}</td>
        </tr>
      </table>
    </div>
    <div>
      <h3>●予約条件</h3>
      <table border="1">
        <div>
        ご出発日*：<input type="date" name="startDate" v-model="resInfo.startDate">
        </div>
        <div>
        ご返却日*：<input type="date" name="endDate" v-model="resInfo.endDate">
        </div>
      </table>
    </div>
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
        <tr v-for="cars in carList" :key="cars.carCode">
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
    <div>
      <button @click="goPage('/ReserveDetail')">戻る</button>
      <button @click="confirm()">確認</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memberInfo: {
        memberNo: '',
        name: '',
        tel: '',
      },
      resInfo: {
        startDate: '',
        endDate: '',
      },
      carList: [],
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
    confirm() {
      this.goPage('/ReserveEditConfirm');
    },
  },
};
</script>
