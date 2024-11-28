<template>
    <div  id="divTable">
        <div > 
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
              <tr >
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td><button>Editar </button><button>Apagar </button></td>
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
        id : null,
        pergunta: null,
        resposta: null
      }
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
</style>