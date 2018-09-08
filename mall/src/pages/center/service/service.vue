<template>
  <div class="service">
    <!--顶部-->
    <top></top>
    <div class="service_contanier">
            客服
    </div>
  </div>
</template>
<script>
  import top from '../../../components/malltop/top.vue'
  export default {
    components: {
      top
    },
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'service', pageTitle: '我的客服'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
  .service{
    position: fixed;
    height: 100%;
    width: 100%;
    background: #eee;
    top:0;
    left: 0;
    z-index: 600;
  }
  .service_contanier{
    margin-top: 40px;
  }
</style>
