import { createRouter, createWebHistory } from "vue-router";
import HelloView from "../views/HelloView.vue";
import LoginView from "../views/LoginView.vue";
import TransactionView from "../views/TransactionView.vue";
import InvestmentView from "../views/InvestmentView.vue";
import MovementsView from "../views/MovementsView.vue";
import RegisteredView from "../views/RegisteredView.vue";

const routes = [
  {
    path: "/",
    name: "HelloView",
    component: HelloView,
  },
  {
    path: "/LoginView",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/TransactionView",
    name: "TransactionView",
    component: TransactionView,
  },
  {
    path: "/InvestmentView",
    name: "InvestmentView",
    component: InvestmentView,
  },
  {
    path: "/MovementsView",
    name: "MovementsView",
    component: MovementsView,
  },
  {
    path: "/RegisteredView",
    name: "RegisteredView",
    component: RegisteredView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
