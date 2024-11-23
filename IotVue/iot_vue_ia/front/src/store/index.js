import {createStore} from 'vuex';

import conta from './modules/conta.module.js';

export default createStore({
    modules: {
        moduloConta: conta
    }
})