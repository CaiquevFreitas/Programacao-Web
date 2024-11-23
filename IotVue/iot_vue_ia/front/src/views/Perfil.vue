<template>
    <div>
        <Nav />
    </div>
</template>

<script>
import Nav from '../components/Nav.vue'

import { mapGetters, useStore } from 'vuex';

export default {
    name: "Perfil",
    computed: {
        ...mapGetters([
            'conta/getConta'
        ])
    },
    components: {
        Nav
    }
}
</script>