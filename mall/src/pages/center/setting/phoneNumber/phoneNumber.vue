<template>
      <div class="phoneNumber">
        <!--顶部-->
        <top></top>
        <div class="phone_container">
              <ul>
                <li class="center_phone">
                  <div>
                  <i class="myPhone"></i>
                  <p>{{MY_PHONE}}</p>
                  </div>
                </li>
              </ul>
        </div>
      </div>
</template>
<script>
  import top from '../../../../components/malltop/top.vue';
    export default {
        components: {
            top
        },
      data () {
            return {
              MY_PHONE: []
            }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'phonenumber', pageTitle: '我的手机号'});
        console.log(this.$store.state.currentPage);
        console.log(this.$store.state.phoneN);
        this.MY_PHONE = this.$store.state.phoneN
      }
    }
</script>
<style>
.phoneNumber{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background: #eee;
}
  .phone_container{
    position: fixed;
    top:50px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    background: #fff;
  }
  .center_phone{
    padding: 10px 20px;
  }
  .center_phone div{
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .center_phone p{
    font-size: 16px;
    line-height: 20px;
    margin-left: 30px;
  }
  .myPhone{
    float:left;
    display: inline-block;
    width: 20px;
    height:20px;
    background: url('../../../../../static/img/mall/myphone.png') center top no-repeat;
    background-size: cover;
  }
</style>
