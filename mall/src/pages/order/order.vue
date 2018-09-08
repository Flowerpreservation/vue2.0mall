<template>
  <div class="order">
    <!--顶部-->
    <top></top>
    <div class="order_contanier" ref="orderWrapper">
      <div class="orderWrapper">
      <div class="addr-info">
        <router-link  class="choose-addr" to="/address">
          <div class="choose-addr-left" v-show="selectaddr">
          <div class="getp">
            <em>收件人：</em>
            <p>
              <span id="addrname">{{defaultAddr.Linkman}}</span>
              <span id="addrphone">{{defaultAddr.MobileNo}}</span>
            </p>
          </div>
          <div class="addrplace"><em>地址：</em><p>{{defaultAddr.Address}}</p></div>
          </div>
           <!--提示选择地址-->
          <div class="choose-addrmsg-left" v-show="addrmsg">
            <p>&nbsp;</p>
             <p>请选择地址</p>
            <p>&nbsp;</p>
          </div>
          <div class="choose-addr-right">
            <span>&nbsp;</span>
            <i class="el-icon-arrow-right"></i>
            <span>&nbsp;</span>
          </div>

        </router-link>
      </div>
      <!--产品列表-->
      <div class="order-list">
        <div class="order-item">
          <div class="pd-img">
            <img :src="product.Image"  class="image"/>
          </div>
          <div class="pd-info">
            <div class="pd-info-left">
              <div>
              <h3 class="pd-name">{{product.Name}}</h3>
              <span class="plan_name">{{product.Specification}}</span>
              </div>
              <div class="input-group">
                <p>
                  <span class="group-addon" @click="change_count(product,-1)">-</span>
                  <span class="input-group-number" v-model="productCount">{{productCount}}</span>
                  <span class="group-addon" @click="change_count(product,1)">+</span>
                </p>
              </div>
            </div>
              <div class="pd-info-right">
                <span>
                <em class="price">&yen;{{product.Price}}</em>
                <b>&yen;{{product.Price * productCount | formatCount}}</b>
                  </span>
                <p class="buy-count pull-right">×<em v-model="productCount">{{productCount}}</em></p>
              </div>
          </div>
        </div>
      </div>
      <div class="count-list">
        <ul>
          <li @click="test()">配送方式：<span >全国包邮</span></li>
          <li>快递运费：<span>&yen;<span>0</span></span></li>
          <li>价格合计：<span>&yen;<span>{{product.Price * productCount | formatCount}}</span></span></li>
          <li>
            <textarea rows="3"  placeholder="留言" v-model="message" ref="message"></textarea></li>
        </ul>
      </div>
      <!--下单-->
    </div>
  </div>
    <div class="order-bottom">
      <div><span>合计&#58;</span><em>&yen;<em id="pricecount">{{product.Price * productCount | formatCount}}</em></em></div>
      <router-link to="/par"><span @click="cOrder(defaultAddr)">确认下单</span></router-link>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../components/malltop/top.vue'
  export default {
    components: {
      top
    },
      data() {
        return {
          Abbreviated: ['./static/img/mall/test.jpg'],
          message: '',            // 留言
          orderlist: [],
          address: [],
          totalPrice: '',
          product: [],
          productDetail: [],
          MemberNo: [],
          paddr: [],
          addr: [],
          goodsno: [],
          productno: [],
          productname: [],
          pnumber: [],
          productquantity: [],
          productprice: [],
          productcost: [],
          productCount: [],
          orderDetail: [],
          defaultAddr: '',
          addrmsg: false,
          selectaddr: true,
          msg: ''
        }
    },
//      created() {
//        this.$http.get('static/data.json').then((res) => {
//            this.orderlist = res.data.order;
//            console.log(this.orderlist);
//            this.$nextTick(() => {
//            this._Initscroll();
//          });
//        });
//    },
    created() {
//        console.log(this.$store.state.goodsCount);
//        console.log(this.$store.state.goodDetail);
        this.productCount = this.$store.state.goodsCount;
        this.product = this.$store.state.goodDetail;
//        console.log(this.product);
        this.totalPrice = this.productCount * this.product.Price;
//        console.log(this.totalPrice)
        this.productno = this.product.No;
        // 获取收货地址
        this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
        Function: 'QueryAddress',
        Data: {
          MemberNo: '10000001'
        }
      }).then((res) => {
        this.MemberNo = res.data.State; // 状态码
        this.addr = res.data.Data; // 内容
          this.$nextTick(() => {
          this._Initscroll();
        });
//        console.log(this.MemberNo);
//        console.log(this.addr);
          for (let i = 0; i < res.data.Data.length; i++) {
          if (res.data.Data[i].IsDefault) {
              this.defaultAddr = res.data.Data[i];
              console.log(this.defaultAddr.IsDefault);
              if (this.defaultAddr.IsDefault === true) {
              this.addrmsg = false;
              this.selectaddr = true;
              } else {
                  this.selectaddr = false;
                  this.addrmsg = true;
              }
//            this.addrmsg = false;
//            this.selectaddr = true;
          } else {
//              this.selectaddr = false;
//              this.addrmsg = true;
          }
        }
      });
    },
    filters: {
        formatCount(value) {
          return value.toFixed(2);
//          return value.round(value * 100) / 100;
      }
    },
    methods: {
        change_count(product, way, productCount) {
            if (way > 0) {
              this.productCount++;
              this.totalPrice = product.Price * this.productCount;       // 单击总价跟随变化+
              console.log(this.productCount);
              console.log(this.totalPrice);
            } else if (way < 0) {
              this.productCount--;
              this.totalPrice = product.Price * this.productCount;     // 单击总价跟随变化-
              console.log(this.productCount);
              console.log(this.totalPrice);
                if (this.productCount < 1) {
                  this.productCount = 1;
                  this.totalPrice = product.Price * this.productCount;
                }
            }
      },
      caclPrice () {
            this.orderlist.forEach(function (product, index) {
            this.totalprice = 0;
            this.totalPrice += product.Price * this.productCount;
            this.totalPrice.toFixed(2);
            console.log(this.totalPrice);
          });
      },
      _Initscroll() {
        this.menuscroll = new BScroll(this.$refs.orderWrapper, {
          click: true,
          probeType: 3
        })
      },
      // 确认下单
      cOrder(defaultAddr) {
        this.$store.dispatch('addrChange', {orderMsg: defaultAddr, remark: this.msg, countS: this.productCount, tPrice: this.totalPrice});
//        console.log(this.productCount);
//        console.log(this.totalPrice);
//        console.log(this.msg);
//        this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
//          Function: 'CreatemallOrder',
//          Data: {
//            ProductName: this.productname,
//            DeliveryAddressNo: defaultAddr.ID,
//            Remark: this.$refs.message.value,
//            Items: [{
//              GoodsNo: this.pnumber,
//              ProductNo: this.product.No,
//              GoodsName: this.productname,
//              ProductName: this.product.Name,
//              Quantity: this.product.MinPurchaseQuantity,           // 数量
//              Price: this.product.Price,
//              Cost: this.product.Postage
//            }]
//          }
//        }).then((res) => {
//            console.log(res.data.State);
//            this.orderDetail = res.data.Data;
//            console.log(res.data.Data);
//            this.$store.dispatch('orderChange', {memberNo: defaultAddr, data: this.orderDetail});
//            console.log(this.$store.state.memberNo);
//            console.log(this.$store.state.data);
//        });
      }
    },
    computed: {
    },
    mounted () {
//      console.log(this.filteredAddress);
//      console.log(this.addr.length);
      console.log(this.$store.state.currentProduct);
      this.productname = this.$store.state.currentProduct.Name;
      this.pnumber = this.$store.state.currentProduct.No;
      this.goodsno = this.$store.state.currentProduct;
      this.$store.dispatch('pageChange', {pageName: 'order', pageTitle: '我的订单'});
      console.log(this.$store.state.currentPage);
    },
    watch: {      // 监听输入栏的值
      message: {
        handler(val, oldval) {
            this.msg = this.$refs.message.value;
//            console.log(this.msg);
        },
        deep: true
      }
    }
  }
</script>
<style>
.order_contanier{
  position: fixed;
  width: 100%;
  height: 100%;
  top:44px;
  left: 0;
}
.order{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
}
.orderWrapper{
  position: fixed;
  width: 100%;
  top:44px;
  left: 0;
  overflow: hidden;
  padding-bottom: 94px;
}
.addr-info{
  padding:0;
  background:#fff url("../../../static/img/mall/red_and_blue.png") repeat-x bottom;}
.addr-info a{
  display:flex;
  padding:15px;
  color:#333;
}
.getp,.addrplace{
  font:bold 16px/1 'Microsoft Yahei';
  padding-bottom:10px;
}
.addr-info .getp span{
  padding-right:10px;
  line-height: 21px;
}
.addr-info .addrplace p{
  font:normal 14px/1.5 'Microsoft Yahei';
  margin:0;color:#888;
  word-wrap:break-word;
  word-break:normal;
}
.choose-addrmsg-left{
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.choose-addrmsg-left p{
  text-align: center;
  color: #FA5037;
  font-size: 16px;
  line-height: 20px;
}
.choose-addr-right i{
  color:#888;
}
.choose-addr-left{
  flex: 1 1 auto;
}
.choose-addr-right{
  flex: 0 0 20px;
}
.choose-addr-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
.getp em,.addrplace em {
  float:left;
  line-height:21px;
}
/*产品列表*/
.order-list{
  margin:5px 0 0;
}
.order-list .order-item{
  border-bottom:1px solid #eee;
  background: #fff;
}
.order-list .order-item:after{
  clear:both;content:'';
  display:table;
}
.order-list .order-item .pd-img{
  float:left;
  width:90px;
  height:90px;
  overflow:hidden;
  margin: 10px;
}
.order-list .order-item .pd-img img{
  display:block;
  width:100%;
  height:100%;
}
.order-list .order-item .pd-info{
  padding:5px 10px 5px 0;
  margin-left: 90px;
  display: flex;
  height: 110px;
}
.order-list .order-item .pd-info  .input-group p {
  display: table;
  border: 1px solid #cccccc;
  border-radius: 4px;
}
.group-addon{
  display: inline-block;
  font-size: 14px;
  line-height: 26px;
  padding: 0 10px;
  color:#aaa;
}
.input-group-number{
  display: inline-block;
  font-size: 14px;
  line-height: 26px;
  padding: 0 10px;
  color:#aaa;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.order-list .order-item .pd-info h3{
  font-size: 14px;
  line-height: 24px;
}
/*.order-list .order-item .pd-info .pd-price:after{*/
  /*clear:both;*/
  /*content:'';*/
  /*display:table;*/
/*}*/

/*.order-list .order-item .pd-info .pd-price em{*/
  /*float:right;*/
  /*padding:0 10px;*/
/*}*/
/*.order-list .order-item .pd-info .pd-price b{*/
  /*display:block;*/
  /*font-weight:normal;*/
  /*white-space:nowrap;*/
  /*overflow:hidden;*/
  /*text-overflow:ellipsis;*/
  /*color:#888;*/
/*}*/
.pd-info-left{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
}
.plan_name{
  font-size: 14px;
  line-height: 24px;
  color: #aaa;
}
.pd-info-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 40px;
}
.pd-info-right .price{
    color:#aaa;
    font-size: 14px;
    line-height: 24px;
}
.pd-info-right del{
  color:#aaa;
  font-size: 12px;
  line-height: 24px;
}
.order-list .order-item .pd-info input{
  height: 25px;
  width:30px;
  padding:0 10px ;
  background:#fff;
  font-size: 14px;
  line-height: 25px;
  color:#aaa;
}
.order-list .order-item .pd-info .buy-count,.buy-count em {
  font-size: 16px;
  line-height: 30px;
  color:#aaa;
}
  /*下单详情*/
.count-list{
  margin:5px 0 0;
  padding:0 5px;
  color:#888;
  background:white;
}
.count-list ul{
  margin:0;
  list-style:none;
}
.count-list li{
  padding:10px;
  border-bottom:1px solid #eee;
  color:#888;
}
.count-list li:after{
  clear:both;
  content:'';
  display:table;
}
.count-list li span{
  float:right;
  color:#888;
}
.count-list textarea{
  outline: none;
  resize:none;
  border:0;
  background:#eee;
  border-radius:5px;
  padding:8px 5px 5px 5px;
  width:100%;
  font-size:14px;
  line-height:14px;
}
textarea::-webkit-input-placeholder {
  text-align:left;
  font-size:14px;line-height:14px;
}
  /*确认下单*/
.order-bottom{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:rgba(255,255,255,.8);
  height:50px;
  line-height:50px;
  display:flex;
}
.order-bottom div{
  flex:2;
  text-align:left;
  padding-left:10px;
}
.order-bottom div em{
  font-size:16px;
  color:#f63;
  line-height: 50px;
  white-space: nowrap;
}
.order-bottom div span{
  font-size:16px;
  color:#999;
  line-height: 50px;
}
.order-bottom a {
  flex:1;
  text-align:center;
  background:#ff6801;
  color:white;
}
.order-bottom a span{
  display: block;
  text-align:center;
  background:#ff6801;
  color:white;
}
</style>
