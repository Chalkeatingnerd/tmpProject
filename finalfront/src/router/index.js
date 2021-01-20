import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  {
    path: '/',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/ManageRentCar',
    name: 'ManageRentCar',
    component: ManageRentCar,
  },
  {
    path: '/UserRegister',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/RentCar',
    name: 'RentCar',
    component: RentCar,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
