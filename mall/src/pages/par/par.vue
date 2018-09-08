<template>
      <div class="par">
        <!--顶部-->
        <top></top>
        <div class="par_wrapper" ref="parWrapper">
                <div class="par_contanier">
                <div class="shippingaddress">
                    <h4>
                      收货人&#58;&nbsp;
                      <span>{{reqaddr.Linkman}}</span>&nbsp;
                      <b>{{reqaddr.MobileNo}}</b>
                    </h4>
                    <p>{{reqaddr.Address}}</p>
              </div>
                <div class="parproduct_detail">
                      <div class="forship_order">
                        <div class="allorders_list_contanier">
                          <div class="forship_detail">
                            <div class="scale_img">
                              <img :src="regoods.Image">
                            </div>
                            <div class="product_detail">
                              <div class="product_detail_right">
                                <h3><del>&yen;&nbsp;<span>{{regoods.Price+10}}</span></del></h3>
                                <p>&yen;&nbsp;<span>{{regoods.Price}}</span></p>
                                <h4>x<span>{{tCount}}</span></h4>
                              </div>
                              <div class="product_detail_left">
                                <h4>{{regoods.Name}}</h4>
                                <p>重量&#58;<span>{{regoods.MinPurchaseQuantity}}</span>kg</p>
                              </div>
                            </div>
                          </div>
                          <div class="post_style">
                            <p>快递运费</p>
                            <p><span>包邮</span>&nbsp;{{regoods.Postage}}</p>
                          </div>
                          <div class="post_price">
                            <p>价格合计</p>
                            <p>&yen;&nbsp;<span>{{tPrice}}</span></p>
                          </div>
                          <div class="post_number">
                            <p>订单编号&#58;&nbsp;<span>{{regqno}}</span></p>
                            <p>提交时间&#58;&nbsp;<span>{{regpno}}</span></p>
                          </div>
                          <div  class="used_balance">
                            <dl>
                              <dt>使用余额</dt>
                              <dd>当前余额<span>{{balance}}</span>元，可以额抵用<span>{{balance}}</span>元</dd>
                            </dl>
                            <i @click="use_balance()" class="w_icon" :class="{'payChecked':uesd}"></i>
                          </div>
                          <div class="payment_method">
                               <ul>
                                 <li class="pay_way"><h4>支付方式</h4></li>
                                 <li class="we_chart">
                                   <b></b>
                                   <dl>
                                      <dt>微信</dt>
                                     <dd>可以使用微信支付</dd>
                                 </dl>
                                   <i class="w_icon" @click="select_pay()" :class="{payChecked:checked}"></i>
                                 </li>
                                 <li class="alipay">
                                   <b></b>
                                   <dl>
                                     <dt>支付宝</dt>
                                     <dd>可以使用支付宝支付</dd>
                                   </dl>
                                   <i class="w_icon" @click="select_alipay()" :class="{payChecked:alipay}"></i>
                                 </li>
                                 <li class="bankcard">
                                   <b></b>
                                   <dl>
                                     <dt>银行卡</dt>
                                     <dd>可以使用银行卡支付</dd>
                                   </dl>
                                   <i class="w_icon" @click="select_bankcard()" :class="{payChecked:bankcard}"></i>
                                 </li>
                               </ul>
                          </div>
                        </div>
                      </div>
                </div>
        </div>
        </div>
        <div class="takeorder">
          <dl>
            <dt>还需支付&#58;<span>{{fPrice}}</span></dt>
            <dd>应付金额&#58;<span>{{tPrice}}</span></dd>
          </dl>
          <router-link to="/mall" class="takeit">
            立即付款
          </router-link>
        </div>
      </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../components/malltop/top.vue'
    export default {
        components: {
            top
        },
      data() {
        return {
          scale_img: './static/img/mall/test.jpg',
          checked: false,
          uesd: false,
          alipay: false,
          bankcard: false,
          myaddress: [],
          myorder: [],
          orderData: [],
          reqaddr: [],
          reqname: [],
          regqno: [],
          regpno: [],
          pname: [],
          reqcount: [],
          reqprice: [],
          reqcost: [],
          products: [],
          regoods: [],
          remsg: '',
          tCount: [],
          tPrice: [],
          fPrice: [],
          balance: 2
        }
      },
//      created() {
//                this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
//          Function: 'CreatemallOrder',
//          Data: {
//            ProductName: this.reqname,
//            DeliveryAddressNo: this.reqaddr,
//            Remark: this.$store.state.message,
//            Items: [{
//              GoodsNo: this.regpno,
//              ProductNo: this.regqno,
//              GoodsName: this.reqname,
//              ProductName: this.pname,
//              Quantity: this.reqcount,           // 数量
//              Price: this.reqprice,
//              Cost: this.reqcost
//            }]
//          }
//        }).then((res) => {
//            console.log(res.data.State);
//            this.orderDetail = res.data.Data;
//            console.log(res.data.Data);
//            console.log(this.$store.state.memberNo);
//            console.log(this.$store.state.data);
//                  this.$nextTick(() => {
//                    this._initScroll();
//                  });
//        });
//      },
      created() {
//        console.log(this.$store.state.currentProduct);    // 产品详细
        this.products = this.$store.state.currentProduct;
        console.log(this.$store.state.selectList);        // 商品详细
        this.regoods = this.$store.state.selectList;
        console.log(this.$store.state.orderMsg);          // 地址
        this.reqaddr = this.$store.state.orderMsg;
//        console.log(this.$store.state.remark);    // 留言
        this.remsg = this.$store.state.remark;
        this.tCount = this.$store.state.countS;
        this.tPrice = this.$store.state.tPrice;
        this.fPrice = this.$store.state.tPrice;
          this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
          Function: 'CreatemallOrder',
          Data: {
            ProductName: this.products.Name,
            DeliveryAddressNo: this.reqaddr.ID,
            Remark: this.remsg,
            Items: [{
              GoodsNo: this.regoods.No,
              ProductNo: this.products.No,
              GoodsName: this.products.Name,
              ProductName: this.regoods.Name,
              Quantity: this.tCount,           // 数量
              Price: this.tPrice,
              Cost: this.regoods.Postage
            }]
          }
        }).then((res) => {
             console.log(res.data.Data);
             console.log(res.data.State);
             this.regqno = res.data.Data.No;
             this.regpno = res.data.Data.CreateTime;
             this.$nextTick(() => {
             this._initScroll();
             });
         });
      },
      mounted() {
      },
      methods: {
        select_pay() {
            this.checked = !this.checked
        },
        select_alipay() {
          this.alipay = !this.alipay
        },
        select_bankcard() {
          this.bankcard = !this.bankcard
        },
        use_balance() {
          this.uesd = !this.uesd;
            if (this.uesd === true) {
              this.fPrice = this.tPrice - this.balance
            } else {
              this.fPrice = this.tPrice
            }
        },
        _initScroll() {
            this.menuscroll = new BScroll(this.$refs.parWrapper, {
                click: true
            });
        }
      }
    }
</script>
<style>
  .par{
    width: 100%;
    height: 100%;
    background: #eee;
  }
  .par_wrapper{
    position: fixed;
    top:44px;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .par_contanier{
    width: 100%;
    overflow: hidden;
    padding-bottom: 40px;
  }
  .shippingaddress{
    background: #fff;
  }
  .shippingaddress h4{
    padding: 10px 10px 5px 10px;
  }
  .shippingaddress h4,.shippingaddress h4 span,.shippingaddress h4 b{
    font-size: 16px;
    line-height: 20px;
    font-weight: normal;
  }
  .shippingaddress p{
    padding: 5px 10px;
    font-size: 14px;
    line-height: 18px;
    color:#888;
  }
  .parproduct_detail{
    margin-top: 5px;
    margin-bottom: 42px;
  }
  .post_style{
    border-bottom: 1px solid #e0e0e0;
    border-top:1px solid #e0e0e0;
  }
  .post_price{
    border-bottom: 1px solid #e0e0e0;
  }
  .post_style,.post_price{
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
  }
  .post_style p,.post_price p,.post_style p span,.post_price p span{
    font-size: 14px;
    line-height: 20px;
    color:#888;
  }
  .forship_detail,.post_style,.post_price,.post_number,.payment_method{
    background: #fff;
  }
  .post_number{
    padding: 10px;
  }
  .used_balance{
    background: #fff;
    padding:5px 10px;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .used_balance dl dt{
      font-size: 14px;
      line-height: 16px;
  }
  .used_balance dl dd, .used_balance dl dd span{
    color:#999;
    font-size: 14px;
    line-height: 16px;
  }
  /*支付方式*/
  .payment_method{
    padding:5px 10px;
    margin-top: 5px;
  }

  .payment_method ul li{
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }
  .pay_way h4{
    font-size: 14px;
    line-height: 30px;
    color: #999;
  }
  .we_chart,.alipay,.bankcard{
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
  }
  .we_chart b{
    display: block;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/weChat_payment.png") 0 0 no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .w_icon{
    flex: 0 0 20px;
    display:block;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/check.png") 0 0 no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .we_chart dl,.alipay dl,.bankcard dl{
    flex: 1 1 auto;
    margin-left: 10px;
  }
  .we_chart dt,.alipay dt,.bankcard dt{
    font-size: 14px;
    line-height: 20px;
    color: #000;
  }
  .we_chart dd,.alipay dd,.bankcard dd{
    font-size: 12px;
    line-height: 20px;
    color:#999;
  }
  .alipay b{
    display: block;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/alipay_to_pay.png") 0 0 no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .bankcard b {
    display: block;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/bank_card_payment.png") 0 0 no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .pay_way{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .payChecked{
    flex: 0 0 20px;
    display:block;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/click_check.png") 0 0 no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .post_number p,.post_number p span{
    font-size: 14px;
    line-height: 24px;
    color:#888;
  }
  /*支付*/
  .takeorder{
    position: fixed;
    width: 100%;
    background: rgba(255,255,255,.8);
    bottom:0;
    display: flex;
    justify-content: space-between;
  }
  .takeorder dl{
    flex: 1 1 auto;
    padding-left: 5px;
  }
  .takeorder dl dd, .takeorder dl dd span{
    font-size: 14px;
    line-height: 16px;
  }
  .takeorder dl dt, .takeorder dl dt span{
    color:#FE5431;
    font-size: 16px;
    line-height: 25px;
  }
  .takeorder .takeit {
    flex: 0 0 100px;
    color: #fff;
    background: #FE5431;
    text-align: center;
    font-size: 16px;
    line-height: 50px;
  }
</style>
