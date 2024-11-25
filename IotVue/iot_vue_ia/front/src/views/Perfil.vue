<template>
    <div id="perfil">
        <Nav />
        <InfoUser />
    </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import InfoUser from '@/components/perfil/InfoUser.vue';

export default {
    name: "Perfil",
    components: {
        Nav,
        InfoUser
    }
}
</script>

<style scoped>
    #perfil{
        background: rgb(2,0,36);
        background: linear-gradient(176deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,0,1) 100%);
    }
</style>