<template>
    <div class="input-field">
               <label for="email">Email</label>
               <input type="email" name="inputEmail" id="inputEmail"
               :value="modelValue" @input="$emit('update:modelValue',$event.target.value)"
               required>  
   </div>
</template>

<script>
export default {
   name: "InputEmail",
   props: {
      modelValue: String
   }
}
</script>

<style scoped>
label{
   color: #fff;
   margin: 0 0 5px 15px;
}
.input-field{
   display: flex;
   flex-direction: column;
   margin: 15px 0 15px 0;
}
input{
   outline: none;
   padding: 0 20px 0 20px;
   border: 2px solid rgba(255,255,255, 0.015);
   background: rgba(255,255,255,0.35);
   height: 38px;
   box-shadow: 0 1px 10px 0 rgba(0,0,0,0.085),
               0 2px 30px 0 rgba(0,0,0,0.2);
   border-radius: 50px;
   font-size: 16px;
   color: #fff;
}
input:focus,input:valid{
   border: 2px solid rgba(255,255,255,0.65);
   background: transparent;
   box-shadow: none;
   border-radius: 30px;
}
</style>