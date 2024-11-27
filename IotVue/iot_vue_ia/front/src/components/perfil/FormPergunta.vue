<template>
    <div id="formP">
        <div> 
            <form>
            <label>Digite sua pergunta de Verdadeiro ou Falso: </label>
            <textarea rows="4" cols="50"> </textarea>
            <input type="submit">
         </form>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'FormPergunta'
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