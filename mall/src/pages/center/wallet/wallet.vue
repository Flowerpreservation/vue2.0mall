<template>
  <div class="wallet">
    <!--顶部-->
    <top></top>
    <div class="wallet_container">
            <div class="balance">
              <div class="balance_right">充值</div>
                  <div class="balance_left">
                        <p>账号余额&nbsp;(元)</p>
                          <h4>100.00</h4>
                  </div>
              </div>
              <p class="transaction_record">交易记录</p>
       <div class="wallet_wrapper" ref="walletWrapper">
              <div class="recording">
                        <ul>
                          <li class="recording_name">
                                <p>交易时间</p>
                                <p>类型</p>
                                <p>金额</p>
                            </li>
                          <li class="recording_detail">
                                <p>
                                  <span>2017-4-10</span>
                                  <span>12:20:59</span>
                                </p>
                                <h4>充值</h4>
                                <h4><span>+<b>10.00</b></span></h4>
                          </li>
                          <li class="recording_detail">
                            <p>
                              <span>2017-4-10</span>
                              <span>12:20:59</span>
                            </p>
                            <h4>充值</h4>
                            <h4><span>+<b>10.00</b></span></h4>
                          </li>
                          <li class="recording_detail">
                            <p>
                              <span>2017-4-10</span>
                              <span>12:20:59</span>
                            </p>
                            <h4>充值</h4>
                            <h4><span>+<b>10.00</b></span></h4>
                          </li>
                          <li class="recording_detail">
                            <p>
                              <span>2017-4-10</span>
                              <span>12:20:59</span>
                            </p>
                            <h4>充值</h4>
                            <h4><span>+<b>10.00</b></span></h4>
                          </li>
                          <li class="recording_detail">
                            <p>
                              <span>2017-4-10</span>
                              <span>12:20:59</span>
                            </p>
                            <h4>充值</h4>
                            <h4><span>+<b>10.00</b></span></h4>
                          </li>
                          <li class="recording_detail">
                            <p>
                              <span>2017-4-10</span>
                              <span>12:20:59</span>
                            </p>
                            <h4>充值</h4>
                            <h4><span>+<b>10.00</b></span></h4>
                          </li>
                        </ul>
              </div>
        </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../../components/malltop/top.vue'
  export default {
    components: {
      top
    },
      created() {
        this.$nextTick(() => {
            this._initScroll();
        })
      },
      methods: {
          _initScroll () {
              this.menuscroll = new BScroll(this.$refs.walletWrapper, {
                  click: true
              });
          }
      },
      mounted () {
      this.$store.dispatch('pageChange', {pageName: 'wallet', pageTitle: '钱包'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
  .wallet{
    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    top:0;
    left: 0;
    z-index: 600;
  }
  .wallet_container{
    position: fixed;
    height: 100%;
    width: 100%;
    top:44px;
    left: 0;
  }
  .wallet_wrapper{
    position: fixed;
    height: 100%;
    width: 100%;
    top:184px;
    left: 0;
    overflow: hidden;
  }
  .balance{
    padding: 25px;
    width: 100%;
    height: 100px;
    background: url("../../../../static/img/mall/center/my_background.png") center top no-repeat;
    background-size: cover;
  }
  .balance_left h4,.balance_left p{
      color:#fff;
  }
  .balance_left p{
    font-size: 14px;
    line-height: 20px;
  }
  .balance_left h4{
    font-size: 26px;
    line-height: 30px;
  }
  .balance_right{
    float:right;
    padding: 5px 20px;
    color:#fff;
    border-radius: 4px;
    border: 1px solid #fff;
    justify-content:flex-start;
    position: relative;
    bottom:-15px;
  }
  .balance_left{
    overflow: hidden;
  }
  .transaction_record{
    padding:10px;
    font-size: 14px;
    line-height: 20px;
    color: #999999;
    background: #eee;
  }
  /*充值记录*/
  .recording{
    background: #fff;
    width: 100%;
    overflow: hidden;
    padding-bottom: 184px;
  }
  .recording_name{
      display: flex;
      border-bottom: 1px solid #ccc;
  }
  .recording_name p{
    flex:1;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  .recording_detail{
    display: flex;
    padding: 10px 0;
    border-bottom:1px solid #ccc ;
  }
  .recording_detail p{
    flex: 1;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color:#888;
  }
  .recording_detail p span{
    color:#888;
  }
  .recording_detail h4{
    flex: 1;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color:#888;
  }
  .recording_detail h4 b{
    font-weight: normal;
  }
</style>

