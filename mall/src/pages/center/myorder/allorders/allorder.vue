<template>
    <div class="allorders">
      <!--没有订单-->
            <div class="no_order">
                  <div class="no_order_img"></div>
                  <p>还没有订单哦</p>
            </div>
      <div class="orders_wrapper" ref="ordersWrapper">
              <ul class="allorders_list">
                  <li class="order_list" v-for="items in orderList">
                        <div class="forship_order" v-for="item in items.Items">
                          <div class="forship_name">
                            <h2 v-if="items.Status === 7">已取消</h2>
                            <h2 v-else="items.Status === 1">待付款</h2>
                          </div>
                          <div >
                            <div class="forship_detail" @click="order_Detail(items)" to="/unpaid">
                            <div class="scale_img">
                              <img :src="item.Image">
                            </div>
                              <div class="product_detail">
                                <div class="product_detail_right">
                                  <h3><del>&yen;&nbsp;<span>{{item.Price}}</span></del></h3>
                                    <p>&yen;&nbsp;<span>98</span></p>
                                    <h4>x<span>{{item.Quantity}}</span></h4>
                                </div>
                              <div class="product_detail_left" >
                                <h4>{{item.ProductName}}</h4>
                                <p>款式&#58;<span>1</span>kg</p>
                            </div>
                            </div>
                            </div>
                            <div class="post">
                              <p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>{{item.Price*item.Quantity | formatMoney}}</b></span></p>
                            </div>
                            <div class="takeover">
                              <p class="takeoverc" v-if="items.Status === 7">已取消</p>
                              <p class="takeoverq" v-else="items.Status === 1">去付款</p>
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
              scale_img: './static/img/mall/test.jpg',
              orderList: [],
              orderDetail: [],
              detailList: [],
              text: ''
            }
        },
      created() {
        this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
          Function: 'QuerymallOrders',
          Data: {
            PageSize: 30,
            PageIndex: 1
          }
        }).then((res) => {
            this.orderList = res.data.Data.Orders;
            console.log(this.orderList);
            this.orderDetail = this.orderList;
            this.$nextTick(() => {
            this._initScroll();
          });
        });
      },
      filters: {
        formatMoney(value) {
          return value.toFixed(2);
//          return value.round(value * 100) / 100;
        }
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
        },
        order_Detail(items) {
              console.log(items.No);
              this.$store.dispatch('memberChange', {memberInf: items.No});
//              this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
//                Function: 'QuerymallOrder',
//                Data: {
//                  OrderNo: items.No
//                }
//              }).then((res) => {
//                this.detailList = res.data.Data;
//                console.log(this.detailList);
//                console.log(res.data.State);
//                this.$store.dispatch('memberChange', {memberInf: this.detailList});
//              });
              this.$router.push('/unpaid')
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'allorders', pageTitle: '我的订单'});
        console.log(this.$store.state.currentPage);
      }
    }
</script>
<style>
@import "../css/orderlist.css";
</style>
