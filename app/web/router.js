import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


export const routerMap = [{
  path: '/',
  component: () => import('./view/Home'),
}];

export default new VueRouter({
  routes: routerMap
})
