<template>
    <div id="perfil">
        <Nav />
        <InfoUser />
        <FormPergunta />
        <Table />
    </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import InfoUser from '@/components/perfil/InfoUser.vue';
import FormPergunta from '../components/perfil/FormPergunta.vue';
import Table from '../components/perfil/Table.vue';

export default {
    name: "Perfil",
    components: {
        Nav,
        InfoUser,
        FormPergunta,
        Table
    }
}
</script>

<style scoped>
    #perfil{
        width: 100%;
        height: 100vh;
        background: rgb(2,0,36);
        background: linear-gradient(176deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,0,1) 100%);
    }
</style>