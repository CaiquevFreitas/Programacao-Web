<template>
    <div id="divLista">
        <Nav />
        <ListaPerguntas />
    </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import ListaPerguntas from '@/components/lista/ListaPerguntas.vue';

export default {
    name: "Lista",
    components: {
        Nav,
        ListaPerguntas
    }
}
</script>

<style scoped>
    #divLista{
        width: 100%;
        height: 100vh;
        background: rgb(2,0,36);
        background: linear-gradient(176deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,0,1) 100%);
    }
</style>
