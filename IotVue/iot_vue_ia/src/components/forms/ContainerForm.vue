<template>
    <div class="container">
        <div class="header">
            <header>{{ alters.topo }}</header>
        </div>
            <form @submit.prevent="enviarForm">
                <div class="input-container">
                    <InputUser v-show="alters.tipo != 'login'" v-model="formData.user"/>
                    <InputEmail v-model="formData.email"/>
                    <InputSenha v-model="formData.senha"/>
                    <InputEnviar :btnEnviar="alters.btnEnviar" />
                    <LinkCadastro :span="alters.span"/>
                </div>
            </form>
    </div>
</template>

<script>
import InputUser from './InputUser.vue';
import InputEmail from './InputEmail.vue';
import InputSenha from './InputSenha.vue';
import InputEnviar from './InputEnviar.vue';
import LinkCadastro from './LinkCadastro.vue';

export default {
    name: "ContainerForm",
    components: {
        InputUser,
        InputEmail,
        InputSenha,
        InputEnviar,
        LinkCadastro
    },
    props: {
        alters: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            formData:{
                user: '',
                email: '',
                senha: ''
            }
        }
    },
    methods:{
        enviarForm(){
            if(this.alters.tipo === 'login'){
                console.log("login")
            }else{
                this.cadastroSubmit();
            }
        },
        async cadastroSubmit() {
        try {
            const response = await fetch('http://localhost:3000/cadastroUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
            });
            const result = await response.json();
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao enviar os dados!');
        }
        }
    }
}
</script>

<style scoped>
.container{
    background: url("../../assets/fundoverde.avif");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    height: 450px;
    width: 370px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),
                0 2px 20px 0 rgba(0,0,0,0.2);
}
.header{
    display: flex;
    justify-content: center;
    margin: 20px 0 0 0;
    font-size: 40px;
    color: #fff;
}
.input-container{
    margin: 30px 30px 10px 30px;
}
</style>