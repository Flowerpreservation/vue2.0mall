<template>
      <div class="specialty">
        <!--顶部-->
        <top></top>
        <!--返回顶部-->
        <span class="return_top" v-show="return_top" @click="top($event)"></span>
        <!--搜索栏-->
        <div class="search-wrap">
          <div class="search-input">
            <input type="text" id="search-keyword" placeholder="请输入关键词进行搜索" />
          </div>
          <button>搜索</button>
        </div>
        <!--筛选栏-->
        <div class="product_fliter">
            <ul>
              <li @click="selected()" :class="{actived:activedA}">综合<i ></i></li>
              <li @click="selectedB"  :class="{actived:activedB}">最新<i></i></li>
              <li @click="selectedC"  :class="{actived:activedC}">价格<i class="priceSorting" :class="{priceSorting1:sorting1,priceSorting2:sorting2}"></i></li>
              <li @click="selectedD"  :class="{actived:activedD}">销量<i class="countSorting" :class="{countSorting1:sorting3,countSorting2:sorting4}"></i></li>
            </ul>
        </div>
        <!--列表栏-->

          <div class="product_list" >
            <scroller :on-refresh="refresh"
                      :on-infinite="infinite"
                      style="padding-top: 44px;" ref="productWrapper">
            <ul class="product_list_container">
                <li  @click="selectit(item)" v-for="(item, index) in filterProduct">
                  <router-link to="/specialtyDetail">
                <div class="mail_bottom_i"><img :src="item.Image" ></div>
                <div class="mail_bottom_r">
                  <h3>{{item.Name}}</h3>
                  <p>{{item.Description}}</p>
                  <div class="mail_price">
                    <span>&yen;<b>{{item.Price}}</b>/元</span>
                    <p>月销&#58;<i>{{item.Stock}}</i></p>
                  </div>
                </div>
                  </router-link>
              </li>
            </ul>
              <!--<div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">-->
                <!--{{ item }}-->
              <!--</div>-->
            </scroller>
          </div>
        <transition name="router-slide" mode="out-in">
          <router-view></router-view>
        </transition>
        </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../../components/malltop/top.vue'
    export default {
        components: {
          top
        },
      data() {
            return {
              list_icon: ['http://file.xiongmao100.cn/Upload/Mall/Product/10037/20170406121631761.jpg'],
              activedA: true,
              activedB: false,
              activedC: false,
              activedD: false,
              return_top: false,
              scroll: '',
              product: '',
              num: 6,
              sorting1: false,
              sorting2: false,
              sorting3: false,
              sorting4: false,
              req: [],
              AllList: [],
              items: []
            }
      },
      created() {
        this.$store.dispatch('pageChange', {pageName: 'specialty', pageTitle: '熊猫商城'});
        this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
          Function: 'QueryGoodss',
          Data: {
            PageSize: 30,
            PageIndex: 0
          }
        }).then((res) => {
          this.req = res.data.State; // 状态码
          this.AllList = res.data.Data.Goodss;    // 请求数据
          console.log(this.req);
          console.log(this.AllList);
          this.$nextTick(() => {
            this._initScroll();
//          console.log(this.munescroll)
          });
        });
      },
//          created() {
//            this.$http.get('static/data.json').then((res) => {
//            this.AllList = res.data.product;
//            console.log(this.AllList);
//            this.$nextTick(() => {
//            this._initScroll();
//          })
//        });
//      },
      computed: {
        filterProduct: function() {
          return this.AllList.slice(0, this.num);
        }
      },
      methods: {
            selected() {
              this.activedA = true
              this.activedB = false
              this.activedC = false
              this.activedD = false
              this.sorting1 = false
              this.sorting2 = false
              this.sorting3 = false
              this.sorting4 = false
            },
             selectedB() {
               this.activedA = false
               this.activedB = true
               this.activedC = false
               this.activedD = false
               this.sorting1 = false
               this.sorting2 = false
               this.sorting3 = false
               this.sorting4 = false
           },
             selectedC() {
               this.activedA = false
               this.activedB = false
               this.activedC = true
               this.activedD = false
               this.sorting3 = false
               this.sorting4 = false
               if (this.sorting1 === false) {
                    this.sorting1 = true
                    this.sorting2 = false
               } else if (this.sorting1 === true) {
                    this.sorting1 = false
                    this.sorting2 = true
               }
        },
             selectedD() {
               this.activedA = false
               this.activedB = false
               this.activedC = false
               this.activedD = true
               this.sorting1 = false
               this.sorting2 = false
               if (this.sorting3 === false) {
                 this.sorting3 = true
                 this.sorting4 = false
               } else if (this.sorting3 === true) {
                 this.sorting3 = false
                 this.sorting4 = true
               }
        },
        selectit(item) {
          this.selectproduct = item;  // 点击选择当前商品列表
          this.$store.dispatch('selectChange', {currentProduct: item});  // 取到item的值 存储到store中 orderName为数组 在order中接收
//                    console.log(this.$store.state.currentProduct);
        },
//        menu() {
//          this.scroll = document.documentElement.scrollTop || document.body.scrollTop; // 监听下拉数值
//          console.log(this.scroll);
//          if (this.scroll > 100) {
//            this.return_top = true;
//          }
//          else {
//            this.return_top = false;
//          }
//        },
        top(e) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
        },
        _initScroll() {
          this.menuscroll = new BScroll(this.$refs.productWrapper, {
            click: true,
            probeType: 3
          });
          this.menuscroll.on('scroll', (pos) => {
            console.log(pos.y)
          })
        },
        refresh: function (done) {
          let self = this;
          setTimeout(function () {
            let start = self.top - 1;
            for (let i = start; i > start - 10; i--) {
              self.filterProduct.splice(0, 0, i + ' - keep walking, be 2 with you.');
            }
            self.top = self.top - 10;
            console.log(45454);
            done();
          }, 1500)
        },
        infinite: function (done) {
          let self = this;
          setTimeout(function () {
            let start = self.bottom + 1;
            for (let i = start; i < start + 10; i++) {
              self.filterProduct.push(i + ' - keep walking, be 2 with you.');
            }
            self.bottom = self.bottom + 10;
            done();
          }, 1500)
        }
      },
      mounted() {
//         window.addEventListener('scroll', this.menu);
          console.log(this.$store.state.currentPage);
          for (let i = 1; i <= 10; i++) {
            this.filterProduct.push(i + ' - keep walking, be 2 with you.');
          }
          this.top = 1;
          this.bottom = 10;
        }
    }
</script>
<style>
.specialty{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
  top:0;
  left: 0;
}
.return_top{
  display: inline-block;
  position: fixed;
  right: 15px;
  bottom: 40px;
  width: 35px;
  height: 35px;
  background: url("../../../../static/img/mall/return_top.png") center top no-repeat;
  background-size: cover;
  z-index: 100;
}
  /*搜索栏*/
.search-wrap{
  background:#eee;
  padding:5px 10px;
  margin-top:44px;
  display: flex;
}
.search-wrap:after{
  clear:both;
  content:'';
  display:table;
}
.search-wrap .search-input{
  flex:1 1 auto;
}
.search-wrap .search-input input{
  border-radius:15px;
  padding-left: 12px;
  background:white;
  border:none;
  outline: none;
  font-size: 1em;
  line-height:28px;
  width:100%;
  text-align: left;
}
.search-wrap .search-input ::-moz-placeholder{
  font-size: 1em;
  line-height:24px;
  text-align: left;
}
.search-wrap .search-input ::-webkit-input-placeholder{
  font-size: 1em;
  line-height:24px;
  text-align: left;
}
.search-wrap .search-input :-ms-input-placeholder{
  font-size: 1em;
  height:24px;
  text-align: left;
}
.search-wrap button{
  flex:0 0 50px;
  background:transparent;
  border:none;
  outline:none;
  white-space: nowrap;
  width:50px;
  font-size:1em;
  text-align:center;
  line-height:28px;
  color:#888;
}
  /*筛选*/
  .product_fliter ul{
    display: flex;
    border-bottom: 1px solid #d5d5d5;
  }
  .product_fliter li{
    flex: 1;
    text-align:center;
    font-size: 14px;
    line-height: 30px;
  }
  .actived{
    border-bottom: 2px solid #ff6060;
    color:#ff6060;
  }
  .priceSorting{
    margin-left: 2px;
    display: inline-block;
    width: 8px;
    height: 10px;
    background: url("../../../../static/img/mall/u_and_down.png") 0 0 no-repeat;
    background-size: cover;
  }
  .countSorting{
  margin-left: 2px;
  display: inline-block;
  width: 8px;
  height: 10px;
  background: url("../../../../static/img/mall/u_and_down.png") 0 0 no-repeat;
  background-size: cover;
}
  .priceSorting1,.priceSorting2,.countSorting1,.countSorting1{
    margin-left: 2px;
    display: inline-block;
    width: 8px;
    height: 10px;
  }
.priceSorting1{
  background: url("../../../../static/img/mall/minus_sign.png") 0 0 no-repeat;
  background-size: cover;
}
  .priceSorting2{
    background: url("../../../../static/img/mall/upward.png") 0 0 no-repeat;
    background-size: cover;
  }
  .countSorting1{
    background: url("../../../../static/img/mall/minus_sign.png") 0 0 no-repeat;
    background-size: cover;
  }
.countSorting2{
    background: url("../../../../static/img/mall/upward.png") 0 0 no-repeat;
    background-size: cover;
}
  /*列表*/
.product_list{
  position: fixed;
  width: 100%;
  height: 100%;
  top:116px;
  left: 0;
  background: #eee;
  overflow: hidden;
}
.product_list_container li {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;}
.mail_bottom_i{
  float: left;
}
.mail_bottom_i img {
  width: 90px;
  height: 90px;}
.mail_bottom_r {
  margin-left: 95px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mail_bottom_r h3{
  font-size:16px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mail_bottom_r p{
  font-size:14px;
  line-height: 18px;
  color:#888;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.product_list_container{
  background: #fff;
  width: 100%;
  overflow: hidden;
}
.product_list ul a li{
  padding: 10px;
  border-bottom: 1px solid #d5d5d5;
}
  ._v-container{
    padding-top: 0!important;
  }
</style>
