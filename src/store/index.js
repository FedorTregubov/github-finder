import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import common from './common';
import githubFinder from './githubFinder';

export default new Vuex.Store({
  modules: {
    common,
    githubFinder
  },
});