<template>
    <div>
        <Picture />
        <p v-if="esta_trabalhando" > Estou trabalhando no momento.</p>
        <p v-else>Estou em busca de novas oportunidades</p>
            <p>Utilizo as seguintes tecnologias backend:</p>
            <ul>
                <li v-for="tecno,index in back_tecno" v-bind:key="index">{{ tecno }}</li>
            </ul>
            <p>Utilizo as seguintes tecnologias frontend:</p>
            <ul>
                <li v-for="tecno in front_tecno" :key="tecno.id">{{ tecno.lang }}</li>
            </ul>
            <label>{{ textoInput }} </label>
            <input type="checkbox" @click="showEmail">
        <p v-show='mostrar_email' > Mande uma mensagem para: {{ email }}</p>
        <p>Para acessar meu portifolio: <a v-bind:href="meu_link" target="_blank">Clique aqui</a></p>
    </div>
</template>


<script>  
    import Picture from './Picture.vue';
    export default{
        name: 'Info',
        props:{
            email: String
        },
        data(){
            return{
                esta_trabalhando: false,
                mostrar_email: false,
                meu_link: "https://google.com",
                textoInput: "Mostrar Email",
                back_tecno: ["JavaScript","Java", "C"],
                front_tecno: [
                    {id:1, lang:"Vue.js"},
                    {id: 2, lang:"Html"},
                    {id: 3, lang:"CSS"}
                ]
            }
        },
        components:{
            Picture
        },
        methods:{
            showEmail(){
                this.mostrar_email = !this.mostrar_email
                if(this.mostrar_email){
                    this.textoInput = "Esconder Email"
                }else{
                    this.textoInput = "Mostrar Email"
                }
            }
        }
    }
</script>