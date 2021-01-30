import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../views/Menu.vue';
import UserRegister from '../views/UserRegister.vue';
import UserRegistConfirm from '../views/UserRegistConfirm.vue';
import UserRegistNo from '../views/UserRegistNo.vue';
import ReserveSearch from '../views/ReserveSearch.vue';
import ReserveConfirm from '../views/ReserveConfirm.vue';
import ReserveNo from '../views/ReserveNo.vue';
import ReserveDetail from '../views/ReserveDetail.vue';
import ReserveEdit from '../views/ReserveEdit.vue';
import ReserveCancel from '../views/ReserveCancel.vue';
import ReserveEditConfirm from '../views/ReserveEditConfirm.vue';
import Error from '../views/Error.vue';

const routes = [
  {
    path: '/',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/UserRegister',
    name: 'user-register',
    component: UserRegister,
  },
  {
    path: '/UserRegistConfirm',
    name: 'user-regist-confirm',
    component: UserRegistConfirm,
  },
  {
    path: '/UserRegistNo',
    name: 'user-regist-no',
    component: UserRegistNo,
  },
  {
    path: '/ReserveSearch',
    name: 'reserve-search',
    component: ReserveSearch,
  },
  {
    path: '/ReserveConfirm',
    name: 'reserve-confirm',
    component: ReserveConfirm,
  },
  {
    path: '/ReserveNo',
    name: 'reserve-no',
    component: ReserveNo,
  },
  {
    path: '/ReserveDetail',
    name: 'reserve-detail',
    component: ReserveDetail,
  },
  {
    path: '/ReserveEdit',
    name: 'reserve-edit',
    component: ReserveEdit,
  },
  {
    path: '/ReserveEditConfirm',
    name: 'reserve-edit-confirm',
    component: ReserveEditConfirm,
  },
  {
    path: '/ReserveCancel',
    name: 'reserve-cancel',
    component: ReserveCancel,
  },
  {
    path: '/Error',
    name: 'error',
    component: Error,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
