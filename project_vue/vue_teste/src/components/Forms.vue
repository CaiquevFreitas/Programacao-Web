<template>
    <form action="" @submit="enviarForm">
        <h2>Meu Formulario</h2>
        <div>
            <input type="text" v-model="name"/>
        </div>
        <div>
            <InputText />
        </div>
        <div>
            <Submit />
        </div>
    </form>
</template>

<script>
import InputText from './form/InputText.vue';
import Submit from './form/Submit.vue';
    export default{
        name: 'Form',
        components: {
            InputText,
            Submit
        },
        data(){
            return{
                name: "Caique"
            }
        },
        methods:{
            enviarForm(e){
                e.preventDefault()
            }
        }
    }
</script>
