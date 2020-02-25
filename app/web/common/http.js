import axios from 'axios'
import Vue from 'vue'

const service = axios.create({
  baseURL: "/api",
  timeout: 15000
});

service.interceptors.response.use(
  response => {
    let data = response.data;
    switch (data.code) {
      case 200:
        return data.data;
      default:
        Vue.prototype.$message.error(data.message || "请求失败");
        break;
    }
    return Promise.reject('error')
  },
  error => {
    Vue.prototype.$message.error("请求失败");
    return Promise.reject('error');
  }
);
export class Http {

  static get(url, param) {
    if (param) {
      url += "?";
      for (let k in param) {
        url += `${k}=${param[k]}&`;
      }
    }
    return service({
      url: url,
      method: "get"
    });
  }

  static post(url, param) {
    return service({
      url: url,
      data: param,
      method: "post"
    });
  }
}
