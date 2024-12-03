<template>
    <div  id="divTable">
        <div style="height: 200px; overflow-y: auto;"> 
          <table class="table table-sm table-dark">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Pergunta</th>
                <th scope="col">Resposta</th>
                <th scope="col">Edição</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pergunta in detector.perguntas" :key="pergunta.id_pergunta">
          <th scope="row">{{ pergunta.id_pergunta }}</th>
          <td>{{ pergunta.texto }}</td>
          <td>{{ pergunta.resposta?.resp || 'Sem Resposta' }}</td>
          <td>
            <div id="btnTable">
              <button class="btn btn-outline-success" v-on:click="editarPergunta(pergunta.id_pergunta, pergunta.texto)">Editar</button>
              <button class="btn btn-outline-danger" v-on:click="apagarPergunta(pergunta.id_pergunta)">Apagar</button>
            </div>
          </td>
        </tr>
            </tbody>
            </table>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'table',
    data(){
      return{
        detector:{
          perguntas: []
        }
      }
    },
    methods: {
        async listarPerguntas(){
          const id = this.usuario.id
          const response = await fetch(`http://localhost:3000/perguntasPerfil/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
            });
          const result = await response.json();
          
          const perguntas = result.perguntaComResposta;
          
          this.detector.perguntas = perguntas;
        },
        async apagarPergunta(id){
          const confirm = window.prompt("Confirme a ação: S/N");
          if(confirm === 'S' || confirm === 's'){
            const response = await fetch(`http://localhost:3000/deletarPergunta/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            alert(result.message)
            location.reload();
          }else{
            alert("Ação cancelada")
            location.reload();
          }
        },
        async editarPergunta(id, perg){
          const pergunta = window.prompt("Edite sua pergunta: ", perg)
          const response = await fetch(`http://localhost:3000/editarPergunta/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pergunta: pergunta })
            });
            const result = await response.json();
            alert(result.message);
            location.reload();
        }
    },
    computed: {
        usuario() {
            return this.$store.getters['user/user'];  
        },
    },
    async mounted() {
      await this.listarPerguntas();
    }
}
</script>

<style scoped>
   table{
        width: 700px;
    }
    #divTable{
      display: flex;
      justify-content: center;
    }
    #btnTable{
      display: flex;
      justify-content: space-around;
    }
</style>