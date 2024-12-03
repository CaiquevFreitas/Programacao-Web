<template>
    <div id="navegacao">
        <div>
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" href="/ShowdoMilhao">Show do Milhão</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Lista">Lista de Perguntas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Perfil">Perfil</a>
                </li>
            </ul>
        </div>
        <div>
            <BtnSair />
        </div>
    </div>
</template>

<script>
import BtnSair from '../components/perfil/BtnSair.vue';
export default {
    name: 'Nav',
    components: {
        BtnSair
    }
}
</script>

<style>
#navegacao{
    background-color: #232f3e;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.nav-link{
    color: white;
    font-size: 15px;
    text-decoration: none;
    transition: .5s;
}
.nav-link:hover{
    color: turquoise;
}
</style>