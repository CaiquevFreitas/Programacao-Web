<template>
        <button type="button" class="btn btn-outline-danger" v-on:click="sair">Sair</button>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: "BtnSair",
    setup() {
        const store = useStore();
    },
    methods: {
        sair(){
            this.$store.dispatch('user/logout');
            location.reload()
        }
    }
}

</script>

