<template>
    <div class="container">
        <div class="header">
            <header>Login</header>
        </div>
            <form action="" method="POST">
                <div class="input-container">
                    <InputUser />
                    <InputEmail />
                    <InputSenha />
                    <InputEnviar />
                    <LinkCadastro />
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