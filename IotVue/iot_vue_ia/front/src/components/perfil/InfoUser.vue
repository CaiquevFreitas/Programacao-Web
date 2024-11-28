<template>
    <div id="info">
        <div>
             <h1>{{ usuario.username }}</h1>
            <h2>R${{ usuario.saldo }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoUser",
    computed: {
        usuario() {
            return this.$store.getters['user/user'];  
        }
    }
}
</script>

<style scoped>
    #info{
        display: flex;
        justify-content: center;
        color: white;
        margin-bottom: 20px;
    }
    h1{
        font-size: 60px;
    }
</style>