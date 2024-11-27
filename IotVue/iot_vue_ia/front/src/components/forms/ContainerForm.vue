<template>
    <div class="container">
        <div class="header">
            <header>{{ alters.topo }}</header>
        </div>
            <form @submit.prevent="enviarForm">
                <div class="input-container">
                    <template v-if="alters.tipo != 'login'"> 
                        <InputUser v-model="formData.user"/>
                    </template>
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

import { useStore } from 'vuex';
import {useRouter} from 'vue-router'


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
    setup() {
        const store = useStore();
        const router = useRouter();
        return { store,  router };
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
                this.loginSubmit();
            }else{
                this.cadastroSubmit();
            }
        },
        async loginSubmit() {
            const data = this.formData;

            try {
                const response = await fetch('http://localhost:3000/logar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.email, password: data.senha })
                });

                const result = await response.json();
                
                if (result.status === 1) {

                    this.$store.dispatch('user/setUser', result.account);

                    this.router.push({ name: 'perfil' });
                } else {
                    alert('Email ou senha inválidos. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao realizar login:', error);
                alert('Erro ao realizar login. Por favor, tente novamente.');
            }
        },
        async cadastroSubmit() {

            if (!this.formData.user && !this.formData.email || !this.formData.senha) {
                alert('Por favor, preencha todos os campos!');
                return;
            }else{
                try {
                    const response = await fetch('http://localhost:3000/cadastrouser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formData)
                    })

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message);
                    }

                    const result = await response.json();
                    if (result.verificEmail == false) {
                        alert(result.message);
                        return;
                    } else {
                        console.log('Cadastro realizado com sucesso:', result);
                        alert('Cadastro realizado com sucesso!');
                        this.$router.push({ name: 'inicio' });
                    }
                } catch (error) {
                    console.error('Erro ao realizar o cadastro:', error);
                    alert('Erro ao realizar o cadastro: ' + error);
                }
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