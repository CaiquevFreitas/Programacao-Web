<template>
  <div id="inicio">
    <ContainerForm  :alters="alters" />
  </div>
</template>

<script>
import ContainerForm from '@/components/forms/ContainerForm.vue';
export default {
  name: 'Inicio',
  data(){
        return{
            alters: {
              topo: 'Login',
              btnEnviar: 'Login',
              span: true,
              tipo: 'login'
            }
        }
    },
  components:{
    ContainerForm
  }
}
</script>

<style scoped>
#inicio{
  width: 100%;
  height: 100vh;
  background: rgb(2,0,36);
  background: linear-gradient(176deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,0,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>