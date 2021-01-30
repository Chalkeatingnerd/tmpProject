import { createStore } from 'vuex';

export default createStore({
  state: {
    registUserData: {
      name: '',
      age: '',
      sex: '',
      zip: '',
      address: '',
      tel: '',
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
    memberNo: '',
    rentalNo: '',
    checkCarsList: [],
    date: new Date().toISOString().substr(0, 10),
  },
  mutations: {
    updateRegistUserData(state, registUserData) {
      state.registUserData = registUserData;
    },
    updateMemberInfo(state, memberInfo) {
      state.memberInfo = memberInfo;
    },
    updateResInfo(state, resInfo) {
      state.resInfo = resInfo;
    },
    updateMemberNo(state, memberNo) {
      state.memberNo = memberNo;
    },
    updateRentalNo(state, rentalNo) {
      state.rentalNo = rentalNo;
    },
    updateCheckCarsList(state, checkCarsList) {
      state.checkCarsList = checkCarsList;
    },
    initRegistUser(state) {
      state.registUserData = {
        name: '',
        age: '',
        sex: '',
        zip: '',
        address: '',
        tel: '',
      };
    },
  },
  actions: {
  },
  modules: {
  },
});
