<template>
        <div class="this_order">
          <!--顶部-->
          <top></top>
          <div class="this_order_contanier">
                  <div class="order_status">
                    <ul>
                      <li><router-link to="/allorders" class="item_tab">全部</router-link></li>
                      <li><router-link to="/pending"  class="item_tab">待付款</router-link></li>
                      <li><router-link to="/forship"  class="item_tab">待发货</router-link></li>
                      <li><router-link to="/tobereceived"  class="item_tab">待收货</router-link></li>
                      <li><router-link to="/beevaluated"  class="item_tab">待评价</router-link></li>
                    </ul>
                  </div>
            <transition name="router-slide">
              <keep-alive>
              <router-view></router-view>
              </keep-alive>
            </transition>
            </div>
          </div>
</template>
<script>
  import top from '../../../components/malltop/top.vue'
  export default {
    components: {
      top
    }
  }
</script>
<style>
  .this_order{
    position: fixed;
    top:0;
    left:0;
    z-index: 501;
    width: 100%;
    height: 100%;
    background: #eee;
  }
  .this_order_contanier{
    position: fixed;
    top:40px;
    left:0;
    width: 100%;
    height: 100%;
  }
  .order_status ul{
    padding: 5px 0;
    display: flex;
    background: #fff;
  }
  .order_status ul li {
    flex: 1;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color:#888;
  }
  .order_status li .router-link-active{
    color:#ff6060!important;
  }
  .item_tab{
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color:#888;
  }
  .filteractive{
    color:#ff6060!important;
  }
  .orders_wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top:84px;
    left: 0;
  }
</style>
