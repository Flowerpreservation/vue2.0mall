<template>
  <div class="shoppingcar">
    <!--顶部-->
    <top></top>
    <!--有列表内容状态-->
    <div class="shoppingcar_wrapper" ref="shopWrapper">
    <div class="shoppingcar_contanier">
      <div class="shopcart_header" v-show="shopcart_h">
        <span @click="clearAll()">一键清空</span>
        <p>购物车<b>(<i>{{totalcount}}</i>)</b></p>
      </div>
      <div class="cart-list" >
        <div class="cart-item" v-for="item in sproduct">
          <label><i class="radio" @click="select_it(item)" v-bind:class="{'check':item.checked}"></i></label>
          <div class="pd-img">
              <img :src="item.Image"/>
          </div>
          <div class="pd-info" >
            <h3>{{item.Name}}</h3>
            <div class="pd-price"><em>&yen;{{item.Price*item.count | formatMoney}}</em>
              <span>{{item.type}}<b>{{item.weight}}g</b></span></div>
            <div class="input-group">
              <a class="pd-del" @click="delete_list(item)"><img :src="delete_icon"/></a>
              <p>
              <span class="input-group-addon" @click="changecount(item,-1)">-</span>
                <span  class="form-control" v-model="item.count">{{item.count}}</span>
              <span class="input-group-addon" @click="changecount(item,1)">+</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--删除-->
    <div class="delete_bg" v-show="sur">
      <div class="delete_wh">
        <h4>{{deltext}}</h4>
        <p>
          <a class="alert_left" @click="no">取消</a>
          <a class="alert_right" @click="del()">确认</a>
        </p>
      </div>
    </div>
    <!--无列表内容状态-->
    <div class="empty_cart" v-show="empty_cart">
        <div class="empty_container">
           <p>购物车空空如也</p>
           <router-link to="specialty">去逛逛</router-link>
        </div>
    </div>
    <!--底部-->
    <div class="cart-bottom">
      <label><i class="radio" @click="checkedall()" v-bind:class="{'check':checkedallFlag}"></i><span class="select_all">全选</span></label>
      <div><span class="total_p">合计&#58;</span><em>&yen;{{totalprice | formatMoney}}</em></div>
      <router-link to="/par">
        <p class="Settlement">结算</p>
      </router-link>
    </div>
    <!--<v-menu></v-menu>-->
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../components/malltop/top.vue'
  import menu from '../../components/navmenu/menu'
  export default {
    components: {
      'v-menu': menu,
      top
    },
    data () {
        return {
          Abbreviated: ['./static/img/mall/test.jpg'],
          delete_icon: ['./static/img/mall/delete.png'],
          sur: false,
          shopcart_h: true,
          empty_cart: false,
          deltext: '',
          checked: false,
          checkedallFlag: false,
          totalprice: 0,
          totalcount: '',  // 总数量
          carproduct: '',   // 声明当前点击选择要删除的商品
          sproduct: {},
          carList: []
        }
    },
    created() {
      this.$http.get('static/data.json').then((res) => {
        this.sproduct = res.data.shopcart;
        this.$nextTick(() => {
          this._initScroll();
        });
        this.totalcount = this.sproduct.length;
//        console.log(this.sproduct);
//        console.log(this.totalcount);
      })
    },
    // 过滤器
     filters: {
      formatMoney(value) {
        return value.toFixed(2);
//          return value.round(value * 100) / 100;
      }
    },
    mounted() {
        this.$store.dispatch('pageChange', {pageName: 'shopcart', pageTitle: '购物车'});
//      console.log(this.$store.state.currentPage);
        this.carList = this.$store.state.selectList; // 接收来自list的对象值
//        console.log(this.carList);
    },
    methods: {
        delete_list(item) {
            this.sur = true;
            this.deltext = '确认要删除该商品？';
            this.carproduct = item;  // 存储当前要删除选取的值
//            console.log(this.carproduct);
        },
      del() {
          this.sur = false;
          if (this.deltext === '确认要删除该商品？') {
              let index = this.sproduct.indexOf(this.carproduct);
            this.sproduct.splice(index, 1);
            this.totalcount--;
            console.log(index);
          } else if (this.deltext === '确认要清空购物车？') {
            let L = this.sproduct.length;
            this.sproduct.splice(0, L);
            this.calcTotalprice();  // 调用计算方法
            this.totalcount = this.sproduct.length;
            this.shopcart_h = false;
            this.empty_cart = true;
            console.log(this.sproduct);
          }
      },
      no() {
            this.sur = false;
      },
      changecount(sproduct, way) {   // 商品数量更改
            if (way > 0) {
              sproduct.count++;
            } else if (way < 0) {
                sproduct.count--;
                if (sproduct.count < 1) {
                    sproduct.count = 1
                }
            }
        this.calcTotalprice();  // 调用计算方法
      },
      select_it(item) {     // 点击选择商品
            if (typeof item.checked === 'undefined') {  // 添加属性
                 this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalprice();  // 调用计算方法
      },
      checkedall() {
//            this.checkedallFlag = flag;
            this.checkedallFlag = !this.checkedallFlag; // 单双击事件
            let _this = this;           // 作用域改变 this重新赋值
            this.sproduct.forEach(function (item, index) {
            if (typeof item.checked === 'undefined') {          // 添加属性
            _this.$set(item, 'checked', _this.checkedallFlag);
          } else {
            item.checked = _this.checkedallFlag;
          }
        });
        this.calcTotalprice();  // 调用计算方法
      },
      clearAll() {
        this.checkedallFlag = true; // 单双击事件
        let _this = this;
        this.sproduct.forEach(function (item, index) {
          if (typeof item.checked === 'undefined') {          // 添加属性
            _this.$set(item, 'checked', _this.checkedallFlag);
          } else {
            item.checked = _this.checkedallFlag;
          }
        });
        this.calcTotalprice();  // 调用计算方法
        this.sur = true;
        this.deltext = '确认要清空购物车？';
//        let L = this.sproduct.length;
//        this.sproduct.splice(0, L);
//        console.log(this.sproduct);
      },
      // 计算总金额
        calcTotalprice() {
            let _this = this;
            this.totalprice = 0;   // 每次计算前清零
            this.sproduct.forEach(function (item, index) {
              if (item.checked) {
                _this.totalprice += item.Price * item.count;
              }
          })
        },
          // better-scroll
      _initScroll() {
        if (!this.munescroll) {
          this.munescroll = new BScroll(this.$refs.shopWrapper, {
            click: true,
            probeType: 3
          });
        } else {
          this.shopWrapper.refresh();
        }
      }
      },
    computed: {
      selectList () {
        return this.$store.state.selectList; // 接收来自list的对象值
      }
    }
  }
</script>
<style>
  .shoppingcar{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
  }
  .shoppingcar_wrapper{
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    position: fixed;
  }
  .shoppingcar_contanier{
    padding-top: 45px;
    /*padding-bottom: 44px;*/
    width: 100%;
    overflow: hidden;
  }
  .shopcart_header {
    padding:5px 10px;
    text-align:center;
    background-color:#FF6905;
  }
  .shopcart_header p{
    margin-left: 56px;
    line-height:30px;
    font-size:18px;
    color:#fff;
    text-align: center;
  }
  .shopcart_header  span{
    float:right;
    line-height:30px;
    font-size:14px;
    color:#fff;
  }
  .radio{
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  width: 20px;
  height: 20px;
  background: url("../../../static/img/mall/radio_icon.png") no-repeat;
  background-size: 40px;
  background-position: left 0;
  }
  .total_p{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    float: left;
  }
  .select_all{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    color:#ff6060;
    margin-left: 5px;
  }
  .uselect_all{
    float: right;
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-right: 15px;
  }
  .shopcart_header p b,.shopcart_header p b i {
    line-height:20px;
    font-size:16px;
    color:#fff;
  }
  .check{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/radio_icon.png") no-repeat;
    background-size: 40px;
    background-position: right 0
  }
  .scroll_cart {
    padding: 5px;
    text-align: center;
    background-color: #FF6905;
    position: fixed;
    width: 100%;
    z-index: 300;
    top: 0;
  }
  .delete_bg {
    position:fixed;
    z-index:1000;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background:rgba(128, 128, 128,0.5);
  }
  .delete_wh {
    width:80%;
    margin:auto;
    background-color:#fff;
    position:relative;
    top:35%;
    padding:5px 0;
  }
  .delete_wh h4 {
    font-size:14px;
    line-height:32px;
    padding:30px 5px;
  }
  .delete_wh p {
    padding:0 5px;
  }
  .delete_wh p a {
    display:inline-block;
    width:48%;
    font-size:16px;
    line-height:40px;
    text-align:center;
    color:#fff;
    border-radius:3px;
  }
  .delete_wh p .alert_left {
    background-color:#999;
  }
  .delete_wh p .alert_right {
    background-color:#FF6A05;
    float:right;
    margin-left:5px;
  }
  .cart-list{
    background: #eee;
    margin-bottom: 55px;
  }
  .cart-list .cart-item{
    margin:0 0 5px;
    background:#fff;
    padding: 0 0;
    height:110px;
    overflow:hidden;
  }
  .cart-list .cart-item:after{
    clear:both;
    content:'';
    display:table;}
  .cart-list .cart-item label{
    float:left;
    width:30px;
    height:110px;
    text-align:center;
    line-height:110px;
  }
  .cart-list .cart-item .pd-img{
    float: left;
    width: 90px;
    height: 90px;
    overflow: hidden;
    padding: 2px;border:
    1px solid #ddd;
    margin: 10px 10px;
  }
  .cart-list .cart-item .pd-img img{
    display:block;
    width:100%;
    height:100%;
  }
  .cart-list .cart-item .pd-info .pd-del{
    float:right;
    line-height:25px;
    padding:0 5px;
    color:#888;
  }
  .cart-list .cart-item .pd-info .pd-del img{
    height:22px;
    vertical-align: middle;
  }
  .cart-list .cart-item .pd-info{
    padding:5px 10px 5px 0;
    margin-left: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 110px;
  }
  .cart-list .cart-item .pd-info h3{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 16px;
    line-height: 20px;
  }
  .cart-list .cart-item .pd-info .pd-price{
    padding:7px 0;
    color:#f63;
    height:28px;
  }
  .cart-list .cart-item .pd-info .pd-price:after{
    clear:both;
    content:'';
    display:table;
  }
  .cart-list .cart-item .pd-info .pd-price em{
    float:right;
    padding-left:10px;
    color:#ff6060;
  }
  .cart-list .cart-item .pd-info .pd-price b{
    font-weight:normal;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    color:#888;
    font-size: 14px;
    line-height: 20px;
  }
  .cart-list .cart-item .pd-info .input-group p{
    display: table;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
 .form-control{
   display: inline-block;
    background-color:#fff;
    width:30px;
    text-align:center;
    font-size:14px;
    line-height:25px;
    border-left:1px solid #ccc ;
    border-right:1px solid #ccc;
    color: #aaa;
  }
  .input-group-addon{
    padding:0 10px ;
    background:#fff;
    font-size: 14px;
    line-height: 25px;
    color:#aaa;
  }
  .cart-bottom{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    background:white;
    height:50px;
    line-height:50px;
    display:flex;
    z-index:600;
  }
  .cart-bottom label{
    flex:1;
    text-align:left;
  }
  .cart-bottom div{
    flex:1;
    text-align:center;
  }
  .cart-bottom div em{
    display: block;
    overflow-x: auto;
    text-overflow: clip;
    white-space:normal;
    margin-left: 31px;
    font-size:16px;
    color:#f63;
  }
  .cart-bottom a{
    flex:1;
  }
  .cart-bottom .Settlement{
    text-align:center;
    background:#ff6801;
    color:#fff;
    font-size: 14px;
    line-height: 50px;
  }
  /*购物车空*/
  .empty_cart{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 45px;
  }
  .empty_container{
    position: absolute;
    width: 100%;
    top: 50%;
    margin-top: -50%;
  }
  .empty_container p{
    text-align: center;
    font-size: 24px;
    line-height: 40px;
    color: #FA5037;
  }
  .empty_container a{
    display: block;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    margin: 50px;
    color: #fff;
    background: #FA5037;
    border-radius: 5px;
  }
</style>
