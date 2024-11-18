<template>
    <h1>Meu nome é: {{ nome }}</h1>
</template>

<script>
export default{
    name: 'LifeCycle',
    data(){
        return{
            nome: 'Não sei'
        }
    },
    created(){
        this.nome = 'Caique'
    }
}
</script>
