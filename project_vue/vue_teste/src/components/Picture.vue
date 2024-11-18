<template>
    <img :src="avatar" :alt="descricao" widht="100px" height="100px">
    <MudarImg @mudar-imagem="trocarImagem"/>
</template>

<script>
import MudarImg from './MudarImg.vue';
export default {
    name: 'Picture',
    data (){
        return{
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOLBRK-3wEFFeCojWlHou4nooggl5iI2PJQ&s",
            descricao: "Caique Vidal"
        }
    },
    components:{
        MudarImg
    },
    methods:{
        trocarImagem(){
            this.avatar = "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
        }
    }
}
</script>