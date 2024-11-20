<template>
    <div id="cadastro">
    <ContainerForm  :alters="alters" />
  </div>
</template>

<script>
import ContainerForm from '@/components/forms/ContainerForm.vue';
export default {
    name: 'Cadastro',
    data(){
        return{
            alters: {
              topo: 'Cadastro',
              btnEnviar: 'Cadastrar',
              span: false,
              type: 'cadastro'
            }
        }
    },
    components: {
        ContainerForm
    }
}
</script>

<style >
    #cadastro{
        width: 100%;
        height: 100vh;
        background: rgb(2,0,36);
        background: linear-gradient(176deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,0,1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>