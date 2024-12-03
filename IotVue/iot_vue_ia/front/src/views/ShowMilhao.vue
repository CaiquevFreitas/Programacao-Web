<template>
  <div>
    <Nav />
    <BackMilhao />
  </div>
</template>


<script>
import Nav from '../components/Nav.vue'
import BackMilhao from '../components/showMilhao/BackMilhao.vue'

export default {
  name: "ShowMilhao",
  components: {
    Nav,
    BackMilhao
  }
}
</script>