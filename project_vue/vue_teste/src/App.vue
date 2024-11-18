<template>
  <div>
    <Headers :esta_logado=true />
    <PrimeiroComponante />
    <LifeCycle />
    <Pessoa />
  </div>
</template>

<script>
import PrimeiroComponante from './components/PrimeiroComponante.vue'
import LifeCycle from './components/LifeCycle.vue';
import Pessoa from './components/Pessoa.vue'
import Headers from './components/Headers.vue';

 export default{
  name: 'app',
  components: {
    PrimeiroComponante,
    LifeCycle,
    Pessoa,
    Headers
  }
 }
</script>

<style>
  body{
    background-color: black;
    color: white;
  }
</style>
