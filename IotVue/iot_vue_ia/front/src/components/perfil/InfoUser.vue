<template>
    <div>
        <h1>{{ usuario.username }}</h1>
        <h2>R${{ usuario.saldo }}</h2>
    </div>
</template>

<script>
export default {
    name: "InfoUser",
    computed: {
        usuario(){
            return this.$store.state.moduloConta.conta;
        }
    }
}
</script>