<template>
  <div>
    <h1>Olá Vue</h1>
    <p>Meu nome é {{ nome }} e sou {{ profissao }}</p>
    <MultiplosEventos />
    <Reutilizar />
    <Reutilizar />
  </div>
</template>

<script>
  import MultiplosEventos from './MultiplosEventos.vue';
  import Reutilizar from './Reutilizar.vue';
export default{
  name:   'PrimeiroComponante',
  data(){
    return {
      nome: 'Caique Vidal',
      profissao: 'Jovem Aprendiz'
    }
  },
  components:{
    MultiplosEventos,
    Reutilizar
  }
}
</script>