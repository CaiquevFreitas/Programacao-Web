<template>
    <div id="formP">
        <div> 
            <form @submit.prevent="enviarPergunta" >
            <label>Digite sua pergunta de Verdadeiro ou Falso: </label>
            <textarea rows="4" cols="50" id="txtPergunta"> </textarea>
            <input type="submit">
         </form>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'FormPergunta',
    computed: {
        usuario() {
            return this.$store.getters['user/user'];  
        }
    },
    methods: {
        async enviarPergunta(){
            let pergunta = document.getElementById("txtPergunta").value
            
            if(pergunta === ""){
                alert('Por favor, digite uma pergunta!');
                return;
            }else{
                try {
                    const response = await fetch(`http://localhost:3000/enviarPegunta/${this.usuario.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({pergunta})
                    })

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message);
                    }
                    const result = await response.json();
                    alert(result.resposta)

                } catch (error) {
                    console.error('Erro ao realizar ao enviar a pergunta:', error);
                    alert('Erro ao realizar ao enviar a pergunta: ' + error);
                } 
            }
        }
    }
}
</script>

<style scoped>
    #formP{
        display: flex;
        justify-content: center;
        color: white;
        margin-bottom: 30px;
    }
    form{
        display: grid
    }
    textarea{
        margin-bottom: 10px;
    }
</style>