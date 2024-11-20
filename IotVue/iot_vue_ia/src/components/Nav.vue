<template>
    <div id="navegacao">
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <a class="nav-link disabled" href="/">Inicio</a>
            </li>
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
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style>
#navegacao{
    background-color: #232f3e;
    padding: 10px;
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