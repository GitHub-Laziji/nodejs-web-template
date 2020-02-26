import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import { Http } from "./common/http"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI);

Vue.prototype.$http = Http;

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});