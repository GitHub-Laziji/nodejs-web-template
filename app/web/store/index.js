import Vue from 'vue'
import Vuex from 'vuex'
import context from './module/context'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    context
  },
  getters: {
    context: state => {
      return {
        session: state.context.session
      };
    }
  }
});

export default store