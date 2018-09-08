<template>
  <div class="opinion">
    <!--顶部-->
    <top></top>
    <div class="opinion_contanier">
          建议
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
      this.$store.dispatch('pageChange', {pageName: 'opinion', pageTitle: '意见反馈'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
  .opinion{
    position: fixed;
    height: 100%;
    width: 100%;
    background: #eee;
    top:0;
    left: 0;
    z-index: 600;
  }
  .opinion_contanier{
        margin-top: 40px;
  }
</style>
