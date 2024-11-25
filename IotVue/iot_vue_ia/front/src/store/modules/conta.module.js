export default {
    namespace: true,
    state: {
        conta: null,
        logado: false
    },
    getters: {
        getConta(state) {
            return state.conta;
        },
        isLogged() {
            return state.logado
        }
    },
    mutations:{
        setConta(state,payload) {
            state.conta = payload
            state.logado = true
        }
    },
    actions:{
        atualizar({ commit }, account) {
            commit('setConta', account)
        }
    }
}