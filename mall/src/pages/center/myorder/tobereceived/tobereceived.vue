<template>
  <div class="tobereceived">
    <div class="no_order">
      <div class="no_order_img"></div>
      <p>还没有订单哦</p>
    </div>
    <div class="orders_wrapper" ref="ordersWrapper">
    <ul class="allorders_list">
      <li class="order_list">
        <div class="forship_order">
          <div class="forship_name">
            <h2>待收货</h2>
          </div>
          <div>

            <div class="forship_detail">
              <div class="scale_img">
                <img :src="scale_img">
              </div>

              <div class="product_detail">
                <div class="product_detail_right">
                  <h3><del>&yen;&nbsp;<span>118</span></del></h3>
                  <p>&yen;&nbsp;<span>98</span></p>
                  <h4>x<span>1</span></h4>
                </div>
                <div class="product_detail_left">
                  <h4>云南特产纯净天然原生态蜂蜜农家自产蜂蜜</h4>
                  <p>款式&#58;<span>1</span>kg</p>
                </div>
              </div>
            </div>

            <div class="post">
              <p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>58</b></span></p>
            </div>
            <div class="takeover">
              <p class="takeoverq">确认收货</p>
            </div>
          </div>
        </div>
      </li>
      <li class="order_list">
        <div class="forship_order">
          <div class="forship_name">
            <h2>待收货</h2>
          </div>
          <div>

            <div class="forship_detail">
              <div class="scale_img">
                <img :src="scale_img">
              </div>

              <div class="product_detail">
                <div class="product_detail_right">
                  <h3><del>&yen;&nbsp;<span>118</span></del></h3>
                  <p>&yen;&nbsp;<span>98</span></p>
                  <h4>x<span>1</span></h4>
                </div>
                <div class="product_detail_left">
                  <h4>云南特产纯净天然原生态蜂蜜农家自产蜂蜜</h4>
                  <p>款式&#58;<span>1</span>kg</p>
                </div>
              </div>
            </div>

            <div class="post">
              <p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>58</b></span></p>
            </div>
            <div class="takeover">
              <p class="takeoverq">确认收货</p>
            </div>
          </div>
        </div>
      </li>
      <li class="order_list">
        <div class="forship_order">
          <div class="forship_name">
            <h2>待收货</h2>
          </div>
          <div>

            <div class="forship_detail">
              <div class="scale_img">
                <img :src="scale_img">
              </div>

              <div class="product_detail">
                <div class="product_detail_right">
                  <h3><del>&yen;&nbsp;<span>118</span></del></h3>
                  <p>&yen;&nbsp;<span>98</span></p>
                  <h4>x<span>1</span></h4>
                </div>
                <div class="product_detail_left">
                  <h4>云南特产纯净天然原生态蜂蜜农家自产蜂蜜</h4>
                  <p>款式&#58;<span>1</span>kg</p>
                </div>
              </div>
            </div>

            <div class="post">
              <p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>58</b></span></p>
            </div>
            <div class="takeover">
              <p class="takeoverq">确认收货</p>
            </div>
          </div>
        </div>
      </li>
      <li class="order_list">
        <div class="forship_order">
          <div class="forship_name">
            <h2>待收货</h2>
          </div>
          <div>

            <div class="forship_detail">
              <div class="scale_img">
                <img :src="scale_img">
              </div>

              <div class="product_detail">
                <div class="product_detail_right">
                  <h3><del>&yen;&nbsp;<span>118</span></del></h3>
                  <p>&yen;&nbsp;<span>98</span></p>
                  <h4>x<span>1</span></h4>
                </div>
                <div class="product_detail_left">
                  <h4>云南特产纯净天然原生态蜂蜜农家自产蜂蜜</h4>
                  <p>款式&#58;<span>1</span>kg</p>
                </div>
              </div>
            </div>

            <div class="post">
              <p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>58</b></span></p>
            </div>
            <div class="takeover">
              <p class="takeoverq">确认收货</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    components: {},
    data() {
      return {
        scale_img: './static/img/mall/test.jpg'
      }
    },
    created() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      _initScroll() {
        if (!this.munescroll) {
          this.munescroll = new BScroll(this.$refs.ordersWrapper, {
            click: true,
            probeType: 3
          });
        } else {
          this.ordersWrapper.refresh();
        }
      }
    },
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'tobereceived', pageTitle: '我的订单'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
  @import "../css/orderlist.css";
</style>

