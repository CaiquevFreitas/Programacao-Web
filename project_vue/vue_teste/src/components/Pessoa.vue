<template>
    <div>
        <h2>Esta é a descrição da pessoa: {{ nome }}</h2>
        <Info :email="email"/>
        <Forms />
    </div>
</template>

<script>
    import Info from './Info'
    import Forms from './Forms.vue';
    export default{
        name: 'Pessoa',
        components: {
            Info,
            Forms
        },
        data(){
            return{
                nome: 'Caique',
                email: "caiquevidal25@gmail.com"
            }
        }
        }
</script>