import Vue from 'vue';
import Vuex from 'vuex';
import data from '../../public/data.json'

Vue.use(Vuex);

export default new Vuex.Store({
          state: {
                    ApiPathBlog: data.ApiPathBlog,
                    Snack: { show: false, msg: "", color: "" }
          },
          getters: {
                    Snack: state => state.Snack
          },
          mutations: {},
          actions: {},
          modules: {}
});