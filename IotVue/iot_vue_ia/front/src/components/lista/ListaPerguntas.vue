<template>
    <div>
        <ul v-for="dado in detector.dados" :key="dado.id_pergunta">
            <li>
                <span>Usuario: {{dado.user.username}} </span> || <span> Pergunta: {{dado.texto}} </span> || <span> Resposta: {{dado.resposta.resp}} </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ListaPerguntas",
    data(){
      return{
        detector:{
          dados: []
        }
      }
    },
    methods: {
      async listar(){
        const response = await fetch(`http://localhost:3000/listarPerguntas`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
            });
          const result = await response.json();
          this.detector.dados = result;
      }
    },
    async mounted() {
      await this.listar();
    }
}
</script>

<style scoped>
  ul{
    color: white;
    margin-top: 20px;
    list-style-type: none;
  }
  li{
    border: 1px solid white;
    border-radius: 20px;
    width: 80%;
    padding: 15px;
  }
  span{
    margin: 0px 20px 0px 20px;
  }
</style>