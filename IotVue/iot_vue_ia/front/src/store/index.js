import { createStore } from 'vuex';

import user from './modules/user.module.js';

export default createStore({
  modules: {
    user,
  },
});
