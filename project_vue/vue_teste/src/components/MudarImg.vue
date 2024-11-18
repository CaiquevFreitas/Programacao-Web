<template>
    <div>
        <button @click="$emit('mudarImagem')">Trocar imagem de Perfil</button>
    </div>
</template>

<script>
    export default{
        name: "MudarImg",
        emits: ['mudarImagem']
    }

</script>