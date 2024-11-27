import VueCookies from 'vue-cookies';

const state = {
  loggedIn: VueCookies.get('loggedIn') === 'true' ? true : false, 
  user: VueCookies.get('user'), 
};

const mutations = {
  SET_LOGGED_IN(state, status) {
    state.loggedIn = status;
    VueCookies.set('loggedIn', status, '1d'); 
  },
  SET_USER(state, user) {
    state.user = user;
    VueCookies.set('user', JSON.stringify(user), '1d'); 
  },
  LOGOUT(state) {
    state.loggedIn = false;
    state.user = null;
    VueCookies.remove('loggedIn');
    VueCookies.remove('user'); 
  },
};

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
    commit('SET_LOGGED_IN', true);
  },
  logout({ commit }) {
    commit('LOGOUT');
  },
};

const getters = {
  isLoggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
};

export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
