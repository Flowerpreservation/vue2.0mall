<template>
  <div class="malltop">
    <span class="el-icon-arrow-left" @click="back()"></span>
    <p v-model="pageTitle">{{pageTitle}}</p>
    <router-link to="/">
      <b class="icon-home3"></b>
    </router-link>
  </div>
</template>
<script>
  export default {
    components: {},
    methods: {
      back() {
        history.back(-1)
      }
    },
    computed: {
      pageTitle () {
        return this.$store.state.centerTop;
      }
    }
  }
</script>
<style>
  .malltop{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 500;
    display: flex;
    padding: 10px;
    background:#FFF;
    border-bottom:1px solid #e0e0e0;
  }
  .malltop p,.malltop span, .malltop b{
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    color:#000;
  }
  .malltop span{
    flex:0 1 20px;
  }
  .malltop p{
    flex:1 1 auto ;
  }
  .malltop b{
    flex:0 1 20px;
    font-size: 20px;
  }

</style>
