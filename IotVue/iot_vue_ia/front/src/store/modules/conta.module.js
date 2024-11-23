export default {
    namespace: true,
    state: {
        conta: null,
        logado: false
    },
    getters: {
        getConta(state) {
            return state.conta;
        }
    },
    mutations:{
        setConta(state,payload) {
            state.conta = payload
            state.logado = true
        },
        isLogged() {
            return state.logado
        }
    },
    actions:{
        atualizar({ commit }, account) {
            commit('setConta', account)
        }
    }
}