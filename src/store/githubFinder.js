import axios from 'axios';
const API_URL_GITHUB = 'https://api.github.com';

export const pageDefault = {
  curr: 1,
  length: 4,
  totalPages: 0,
  mode: 'numeric'
};

export default {
  state: {
    user: null,
    repos: [],
    page: {...pageDefault},
    currSort: {
      attr: 'name',
      order: 'asc'
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setRepos(state, payload) {
      state.repos = payload;
      state.page.totalPages = Math.ceil(payload.length / state.page.length);
    },
    sortRepos(state, payload) {
      if(payload === state.currSort.attr) {
        state.currSort.order = state.currSort.order === 'asc' ? 'desc' : 'asc';
      }
      state.currSort.attr = payload;
    },
    prevPage(state) {
      if(state.page.curr > 1) {
        state.page.curr -= 1;
     }
    },
    nextPage(state) {
      if((state.page.curr * state.page.length) < state.repos.length) {
        state.page.curr += 1;
      }
    },
    setPage(state, payload) {
      state.page.curr = payload;
    },
    loadMore(state) {
      if(state.page.length < state.repos.length) {
        state.page.length += 4; 
      }
    },
    setPaginationMode(state, payload) {
      state.page.mode = payload;
      state.page.curr = pageDefault.curr;
      state.page.length = pageDefault.length;
    }
  },

  actions: {  
    fetchUser({ commit }, {search = ''}) {
      if(!search) {
        commit('setError', '`Search` cannot be empty.');
        return;
      }
      commit('setLoading', true);
      commit('clearError', true);

      axios
        .get(`${API_URL_GITHUB}/users/${search}`)
          .then(res => {
            if(res.status === 200) {
              commit('setUser', res.data);
            } else {
              commit('setError', `Can't find user ${search}.`);
            }
          })
          .catch(err => {
            commit('setError', `Can't find user ${search}.`);
          })
          .finally(() => {
            commit('setLoading', false);
          });
    },

    fetchRepos({ commit }, {search = ''}) {
      if(!search) {
        commit('setError', '`Search` cannot be empty.');
        return;
      }
      commit('setLoading', true);
      commit('clearError', true);

      axios
        .get(`${API_URL_GITHUB}/users/${search}/repos`)
          .then(res => {
            if(res.status === 200) {
              commit('setRepos', res.data);
            } else {
              commit('setError', `Can't find user\`s ${search} repos.`);
            }
          })
          .catch(err => {
            commit('setError', `Can't find user\`s ${search} repos.`);
          })
          .finally(() => {
            commit('setLoading', false);
          });
    },
    
  },


  getters: {
    user(state) {
      return state.user;
    },
    repos(state) {
      return state.repos;
    },
    page(state) {
      return state.page;
    },
    reposSorted(state) {
      return state.repos.sort((a, b) => {
        let mod = 1;
        if(state.currSort.order === 'desc') mod = -1;
        if(a[state.currSort.attr] < b[state.currSort.attr]) return -1 * mod;
        if(a[state.currSort.attr] > b[state.currSort.attr]) return 1 * mod;
        return 0;
      })
      .filter((row, index) => {
        let start = (state.page.curr - 1) * state.page.length;
        let end = state.page.curr * state.page.length;

        if(index >= start && index < end) return true;
      })
    }

  }
};
