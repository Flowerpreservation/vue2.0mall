<template>

        <div class="specialtyDetail">
          <!--顶部-->
          <top></top>
          <div class="specialtyDetail_container" ref="detailWrapper">
            <div class="Detail_container" >
          <!--轮播-->
          <div class="block">
            <el-carousel trigger="click" height="270px">
              <el-carousel-item v-for="item in req" :key="index">
                <img :src="item.Image" width="100%" height="100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <!--商品名称介绍-->
          <div class="prodect_name">
            <h2>{{product.Name}}</h2>
            <div class="price_detail">
              <span class="now_price"><b>{{product.Price}}</b>&yen;起</span>
              <del><b>{{product.Price+10}}</b>&yen;</del>
              <span class="price_stock">库存&#58;<font>{{product.Stock}}</font></span>
            </div>
            <p class="post_price">
              <span>邮费&#58;<b>{{product.Postage}}</b></span>
              <span>月销&#58;<b>{{product.Stock}}</b></span>
            </p>
            <p class="specification" @click="product_specification">产品规格<i class="el-icon-arrow-right"></i></p>
          </div>
          <!--详情提示评论-->
          <div class="goods_comment">
              <div class="comment_list">
          <ul>
            <li :class="{'goods_active':d}" @click="goodDetail()">商品详情</li>
            <li :class="{'goods_active':p}" @click="goodPrompt()">温馨提示</li>
            <li :class="{'goods_active':c}" @click="goodComment()"> 商品评论</li>
          </ul>
              </div>
          </div>
          <!--产品规格-->
            <transition name="router-slide">
            <div class="comments" v-show="goods_d" >
              <p>
                1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque blanditiis cum expedita id necessitatibus, obcaecati porro praesentium, quasi quibusdam quis quo reprehenderit similique.
                Autem dolores dolorum eligendi expedita voluptatibus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque blanditiis cum expedita id necessitatibus, obcaecati porro praesentium, quasi quibusdam quis quo reprehenderit similique.
                Autem dolores dolorum eligendi expedita voluptatibus.
                1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque blanditiis cum expedita id necessitatibus, obcaecati porro praesentium, quasi quibusdam quis quo reprehenderit similique.
                Autem dolores dolorum eligendi expedita voluptatibus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque blanditiis cum expedita id necessitatibus, obcaecati porro praesentium, quasi quibusdam quis quo reprehenderit similique.
                Autem dolores dolorum eligendi expedita voluptatibus.
              </p>
            </div>
            </transition>
            <transition name="router-slide">
            <div class="detail" v-show="goods_p" >
              <p>
                2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum, dolore dolorum ducimus explicabo nulla quia sit vel? Illum inventore ipsa
                iure nesciunt nulla possimus quasi quis recusandae repellendus voluptas!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, molestiae, voluptatem. Accusantium debitis dicta, dignissimos exercitationem ipsa pariatur quisquam recusandae velit.
                Ad alias assumenda aut quidem veniam vitae! Exercitationem, magnam.
              </p>
            </div>
            </transition>
            <transition name="router-slide">
            <div class="prompt" v-show="goods_c" >
              <ul >
                <li class="customer_comment" v-for="item in comreq.Goodscomments">
                  <div  class="comment_inner" ref="abc" >
                    <div class="customer_comment_left" >
                      <div class="avatar">
                        <img  :src="item.MemberLog" style="width: 40px;height: 40px;" >
                      </div>
                      <div class="customer_detail">
                        <h4 class="customer_name">
                          <b>{{item.MemberName | filterName}}</b>
                        </h4>
                        <h5><span><i>{{item.CreateTime}}</i><font></font></span></h5>
                        <p>{{item.Content}}</p>
                      </div>
                      <div class="prodectimg" v-for="img in item.Image">
                        <img  :src="img" style="width: 50px;height:50px;">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            </transition>
          <!--<transition name="router-slide">-->
            <!--<router-view>-->
            <!--</router-view>-->
          <!--</transition>-->
        </div>
          </div>
          <div class="prodect_specification" v-show="speci_show" v-for="(item,index) in req">
            <div class="detail_top" @click="closeorder"></div>
            <div class="detail_name">
              <div class="product_detail_name">
                <!--图片-->
                <div class="product_detail_img">
                  <img :src="item.Image"/>
                </div>
                <div class="product_detail_decribe" >
                  <h3 class="detail_price"><em>&yen;</em> <span class="price">{{item.Price}}</span>
                    <del><b class="maxprice">{{item.Price+10}}</b></del></h3>
                  <h4 class="detail_code"><span class="postage">邮费&#58;<em>{{item.Postage}}</em></span></h4>
                  <!--删除图标-->
                  <i class="closeit" @click="close_detail"></i>
                </div>
              </div>
              <div class="product_detail_style">
                <p>种类</p>
                <div class="detail_list">
                  <ul>
                    <li class="type_list" :class="{'select': checked}" @click="currentIndex=index">
                      <span class="name" @click="select_it(item,index)">{{item.Name}}</span>
                      <em class="price" @click="select_it(item,index)">{{item.weight}}</em></li>
                  </ul>
                </div>
              </div>
              <div class="prodect_detail_count">
                <i class="prodect_detail_count_number">数量</i>
                <p>
                  <span class="count_add" @click="changenumber(typecount,-1)">-</span>
                  <span  class="count_number" v-model="typecount">{{typecount}}</span>
                  <span class="count_reduce " @click="changenumber(typecount,1)">+</span>
                </p>
                <h5 class="alert-ms">请填写正确的商品数量</h5>
              </div>
              <div class="show_msg" v-show="show_msg">请选择商品类型</div>
            </div>
            <!--下订单-->
            <div class="add_shopcart">
              <p class="add_shopcart_left">
                        <span><i class="icon-cart"><em class="shopcart_count" v-show="totalcount>0" v-model="totalcount">{{totalcount}}</em></i>
                        <b class="go_shopcart" @click="addcart(item)">加入购物车</b></span></p>
              <p><span  to="/order" @click="buy_it(item)" class="buy_now">立即购买</span></p>
            </div>
            <!--小球-->
          </div>
          <div class="bottom-actions">
            <a  class="collection_icon" @click="select_collection()">
              <span><i class="details_collection" :class="{'details_collected':collected}"></i></span><span>收藏</span></a>
            <router-link to='/shoppingcar' class="shoppingcar_icon" style="display:none">
              <i class="icon-cart"><transition name="move"> <b class="chopcart_count"  v-show="cartcount>0 ">{{cartcount}}</b></transition></i>
              <span>购物车</span>
            </router-link>
            <a @click="addCart()">加入购物车</a>
            <a @click="buy_now()">立即购买</a>
          </div>
        </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../../../components/malltop/top.vue'
    export default {
        components: {
          top
        },
        data() {
            return {
                index: [],
                speci_show: false,
                Abbreviated: ['./static/img/mall/test.jpg'],
                list: '',     // 接收来自mall页面点击选择后的产品
                currentIndex: -1,
                selected_it: false,
                typecount: 1,
                r: [],
                sur: false,
                checked: false,
                typeproduct: [],
                sproduct: [],
                totalcount: [],
                postprice: 5,
                typeprice: '',
                cartcount: 0,
                scartcount: 0,
                cart: false,
                goods_d: true,
                goods_c: false,
                goods_p: false,
                d: true,
                c: false,
                p: false,
                collected: false,
                action: '',
                param: {},
                req: [],
                carlist: [],
                product: [],
                comreq: [],
                comstate: [],
                commentNo: [],
                show_msg: false
            }
        },
      created() {
          this.product = this.$store.state.currentProduct;
          console.log(this.product);
          this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
          Function: 'QueryGoods',
          Data: {
            GoodsNo: this.product.No
          }
        }).then((res) => {
          this.param = res.data.State;  // 状态码
          this.req = res.data.Data.Products;    // 请求数据
//              console.log(this.param);
          console.log(this.req);       // 产品详情
          this.$nextTick(() => {
            this._Initscroll();
          })
        });
      },
//      created() {
//        this.$http.get('static/data.json').then((res) => {
//          this.sproduct = res.data.shopcart;
//          this.totalcount = this.sproduct.length;
//          console.log(this.sproduct);
//          console.log(this.totalcount);
//        })
//      },
        filters: {         // 过滤姓名显示
        filterName(value) {
//              value = value.toString();
            value = value.split('');    // 转换为数组
//            value = value.slice(1, 2);
            value.splice(3, 3, '****');     // 设置隐藏星号
          // 把第二个字替换为*
          value = value.join('');     // 拼接为字符串
          return value;
        }
      },
        methods: {
          product_specification() {
              this.speci_show = true
          },
          close_detail() {
            this.speci_show = false
          },
          closeorder() {
            this.speci_show = false
          },
          select_it(item) {
            this.checked = true;
              this.typeproduct = item;
              this.typecount = item.MinPurchaseQuantity;
              this.typeprice = this.typeproduct.Price;
              this.postprice = this.typeproduct.Postage;
              console.log(this.typeproduct);
              this.$store.dispatch('selectChange', {selectList: item, currentProduct: this.$store.state.currentProduct});     // 取到item的值 存储到store中 selectList为数组
                  console.log(this.$store.state.currentProduct);
                 console.log(this.$store.state.selectList);
          },
          goodDetail () {
            this.d = true;
            this.c = false;
            this.p = false;
            this.goods_d = true;
            this.goods_c = false;
            this.goods_p = false;
          },
          goodComment () {
            this.c = true;
            this.d = false;
            this.p = false;
            this.goods_c = true;
            this.goods_d = false;
            this.goods_p = false;
            this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
              Function: 'QueryGoodsComments',
              Data: {
                GoodsNo: 123456
              }
            }).then((res) => {
              this.comstate = res.data.State; // 状态码
              this.comreq = res.data.Data;    // 请求数据
//              console.log(this.comstate);
              console.log(this.comreq);
            });
          },
            goodPrompt () {
              this.p = true;
              this.d = false;
              this.c = false;
              this.goods_d = false;
              this.goods_c = false;
              this.goods_p = true;
          },
          select_collection() {
                this.collected = !this.collected;
          },
          // 数量改变
          changenumber(typecount, way) {
              if (this.checked === true) {
                if (way > 0) {
                  this.typecount++;
                  console.log(this.typecount)
                } else if (way < 0) {
                  this.typecount--;
                  console.log(this.typecount)
                  if (this.typecount < 1) {
                    this.typecount = 1;
                    console.log(this.typecount)
                  }
                }
              } else {
                this.show_msg = true;
                this.show_msg = setTimeout(() => { this.show_msg = false }, 2000);
              }
          },
          addCart() {
            this.speci_show = true;
          },
          addcart(item) {
            this.carlist = item;                                            // 点击选择当前商品列表
            this.$store.dispatch('selectChange', {selectList: item});     // 取到item的值 存储到store中 productList为数组
          },
          buy_now() {
            this.speci_show = true;
          },
          _Initscroll() {
              this.menuscroll = new BScroll(this.$refs.detailWrapper, {
                  click: true,
                  probeType: 3
              })
          },
          buy_it(item) {
//              this.checked = true;
            console.log(item);
            if (this.checked === true) {
              this.$router.push('/order');
                console.log(item);
//              console.log(this.typecount);
              this.$store.dispatch('orderChange', {goodsCount: this.typecount, goodDetail: item});
            } else {
              this.show_msg = true;
              this.show_msg = setTimeout(() => { this.show_msg = false }, 2000);
            }
          }
        },
        mounted() {
              this.$store.dispatch('pageChange', {pageName: 'specialtyDetail', pageTitle: '熊猫商城'});
              console.log(this.$store.state.currentPage);
        }
    }
</script>
<style>
 .detail_list .select{
   border: 1px solid #ff8c61;
   background: #ffe3d4;
  }
  .specialtyDetail{
    position: fixed;
    height: 100%;
    width: 100%;
    top:45px;
    left:0;
    z-index: 600;
    background: #eee;
    overflow-y: auto;
  }
  .specialtyDetail_container{
    position: fixed;
    width: 100%;
    height: 100%;
    top:44px;
    left:0;
  }
  .Detail_container{
    position: fixed;
    width: 100%;
    top:44px;
    left:0;
    padding-bottom:125px;
    overflow: hidden;
  }
  .block{
    overflow: hidden;
  }
  .block img {
  }
  .prodect_name{
    background: #fff;
  }
  .prodect_name h2{
    font-size:18px;
    line-height: 30px;
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
  }
  .now_price{
    font-size:14px;
    line-height: 20px;
    color:#ff6060;

  }
  .price_detail{
    padding: 5px 10px;
  }
  .now_price b,.now_price  i{
    font-size:14px;
    line-height: 20px;
    font-weight: normal;
    color:#ff6060;
    font-style: normal;
  }
  .price_detail del,.price_detail del b,.price_detail del i{
    font-size:12px;
    line-height: 20px;
    font-weight: normal;
    color:#999999;
    font-style: normal;
  }
  .price_stock{
    float: right;
    font-size:14px;
    line-height: 20px;
  }
  .post_price{
    padding: 0 10px 5px 10px;
  }
  .post_price span,.post_price span b{
    font-size:14px;
    line-height: 20px;
    color:#888;
    font-weight: normal;
  }
  .specification{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 30px;
    padding: 5px 10px;
  }
  .specification i{
    font-size: 14px;
    line-height: 30px;
    color:#999;
  }
  .goods_comment{
    margin-top: 5px;
    background: #fff;
  }
  .comment_list ul{
    display: flex;
  }
  .comment_list ul li{
    flex:1;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    color: #000;
  }
.comment_list .goods_active{
  border-bottom: 1px solid #ff6060;
}
.collection_icon{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.collection_icon span{
    display: block;
    text-align: center;
}
  .bottom-actions{
    position:fixed;
    bottom:0;
    left:0;right:0;
    display:flex;
    background:white;
    z-index: 600;
  }
  .bottom-actions .icon-star-full,.bottom-actions .icon-cart{
    color:#aaa;
    position: relative;
  }
  .bottom-actions a{
    flex:1;
    text-align:center;
    border-right:1px solid #eee;
    border-top:1px solid #eee;
    color:#666;
    font-size:12px;
    line-height: 12px;
    z-index:200;
  }
  .collection_icon{
    padding:5px 0;
  }
  .details_collection{
    text-align: center;
    display:inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../../../static/img/mall/details_collection.png") center top no-repeat;
    background-size: cover;
  }
  .details_collected{
    display:inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../../../static/img/mall/click_etails_collection.png") center top no-repeat;
    background-size: cover;
  }
  .bottom-actions a+a+a{
    flex:2;
    border-color:#fd9a34;
    color:white;
    background:#fd9a34;
    height:50px;
    line-height:50px;
    font-size:14px;
  }
  .bottom-actions a+a+a+a{
    flex:2;
    border-color:#ff6801;
    color:white;
    background:#ff6801;
  }
  .shoppingcar_icon span{
    display: block;
  }
  .move-transition{
    opacity: 0.2;
    transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave{
    opacity: 0;
    transform: translate3D(24px,0,0);
  }
  .chopcart_count {
    transition:all 0.4s linear;
    display: inline-block;
    width:16px;
    height: 16px;
    font-size:8px;
    line-height:16px;
    text-align: center;
    border-radius: 50%;
    font-weight: normal;
    top:0;
    left: 12px;
    background: #ff6060;
    color:#FFF;
    position: absolute;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.3);
  }
  /*产品规格*/
  .prodect_specification{
      width: 100%;
      height:100%;
      position: fixed;
      left:0;
      top:0;
      z-index: 999;
  }
  .detail_top {
    height:40%;
    width:100%;
    background:rgba(218,218,218,0.5);
  }
  .closeit {
    display:inline-block;
    position:absolute;
    right:10px;
    top:-5px;
    width:15px;
    height:15px;
    background:url("../img/close.png") center top no-repeat;
    background-size:cover;
    z-index:100;
  }
  .product_detail_name {
    background-color:#fff;
  }
  .detail_name {
    background:rgba(255,255,255,1);
    padding:10px 10px 50px 10px;
    height:60%;
  }
  .product_detail_decribe {
    position:relative;
    height:60px;
    margin-left:85px;
    border-bottom:1px solid #ccc;
  }
  .detail_price em,.detail_price b{
    font-style: normal;
    font-weight: normal;
  }
  .product_detail_img {
    width:80px;
    height:80px;
    float:left;
    margin-top:-20px;
    padding:5px;
    background-color:#fff;
    border:1px solid #ccc;
    border-radius:5px;
  }
  .product_detail_img img {
    width:100%;
    height:100%;
  }
  .product_detail_name h3 span,.product_detail_name h3 em{
    font-size:14px;
    line-height:18px;
    color:#ff6060;
  }
  .product_detail_name h3 del b{
    font-size:12px;
    line-height:14px;
    color:#888;
  }
  .detail_code {
    position:absolute;
    bottom:10px;
    color:#888;
  }
  .product_detail_style {
    margin-top:10px;
    border-bottom:1px solid #ccc;
    padding:0 0 10px 0;
  }
  .product_detail_style p{
    color:#888;
    font-size:12px;
    line-height:20px;
  }
  .prodect_detail_count span,.prodect_detail_count i{
    color:#888;
    font-size:14px;
    line-height:32px;
    font-style: normal;
  }
  .detail_list {
    display:flex;
  }
  .postage, .postage em{
    color:#888;
    font-size:14px;
    line-height: 20px;
    font-style: normal;
  }
  .type_list{
    padding:5px 8px;
    float:left;
    flex:1;
    border:1px solid #ccc;
    margin-top:10px;
    margin-right:5px;
  }
  .detail_list ul  li em{
    font-style: normal;
  }
  .active_select {
    color:#ff6060;
    border:1px solid #ff6060;
  }
  .prodect_detail_count {
    margin-top:10px;
    padding:10px 0;
    position:relative;
  }
  .prodect_detail_count p {
    float:right;
    border:1px solid #ccc;
    border-radius:4px;
    background-color:#fff;
    display:flex;
  }
  .prodect_detail_count h5 {
    position:absolute;
    bottom:-12px;
    right:0;
    font-size:12px;
    line-height:12px;
    border:1px solid #ff6060;
    padding:2px;
    color:#999;
    display:none;
  }
  #activ_count {
    color:#ff6060;
  }
  .prodect_detail_count .count_add {
    border-right:1px solid #ccc;
    display:inline-block;
    width:30px;
    height:30px;
    line-height:30px;
    text-align:center;
  }
  .prodect_detail_count .count_reduce {
    border-left:1px solid #ccc;
    display:inline-block;
    width:30px;
    line-height:30px;
    text-align:center;
  }

  .prodect_detail_count  .count_number {
    background-color:#fff;
    width:30px;
    text-align:center;
    font-size:14px;
    line-height:30px;
  }
  /**/
  .comments,.detail,.prompt{
    background: #fff;
    text-indent: 10px;
    width: 100%;
    height: auto;
  }
  .show_msg{
    text-align: center;
    background: #eee;
    margin-top: 10px;
    padding: 10px;
    color: #888;
    border-radius: 20px;
  }
 /*购物车*/
  .add_shopcart {
    position:fixed;
    bottom:0;
    left:0;
    background-color:#fff;
    width:100%;
    display: flex;
  }
 .shopcart_count {
   transition:all 0.4s linear;
   display: inline-block;
   width:16px;
   height: 16px;
   font-size:8px;
   line-height:16px;
   text-align: center;
   border-radius: 50%;
   font-weight: normal;
   top:3px;
   left:32px;
   background: #fff;
   color:#ff6060;
   position: absolute;
   box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.3);
 }
  .add_shopcart p {
    flex: 1;
  }
  .add_shopcart_left{
    background-color:#FF6905;
  }
 .add_shopcart_left  i{
   position: relative;
   font-size:26px;
   color:#fff;
   flex: 1;
   text-align: center;
   line-height: 50px;
 }
 .add_shopcart_left span{
   display: flex;
 }
  .add_shopcart_left b{
    flex:2;
    font-size:16px;
    line-height:50px;
    text-align:center;
    color: #fff;
    font-weight: normal;
  }
 .add_shopcart p a{
   display:block;
 }
  .add_shopcart p a span{
    display:block;
    font-size:16px;
    line-height:50px;
    text-align:center;
    color:#fff;
  }
  .buy_now {
    background-color:#FD9A34;
    display: block;
    font-size:16px;
    line-height:50px;
    text-align:center;
    color:#fff;
  }
  .go_shopcart {
    background-color:#FF6905;
  }
</style>
