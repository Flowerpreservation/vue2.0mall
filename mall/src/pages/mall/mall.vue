<template>
  <div class="mall" >
    <!--顶部-->
    <top></top>
    <div class="container_wrapper" ref="menuWrapper">
    <div class="mall_container">
      <div class="mall_body">
       <!--走马灯-->
         <div class="block">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in img" :key="index">
          <img :src="item" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
         <!--顶部搜索-->
         <div class="navbar-index" v-show="search_top">
           <div class="search-nav">
             <input type="text" placeholder="蜂蜜纯天然农家自产">
             <button>
               <img :src="searchicon"/>
             </button>
           </div>
         </div>
    </div >
        <!--主体板块-->
          <div class="mall_mail">
              <ul>
                <router-link to="/specialty">
                <li >
                  <img :src="specialty"/>
                  <span>特产</span>
                </li>
                </router-link>
                <router-link to="/specialty">
                <li >
                  <img :src="fresh"/>
                  <span>生鲜</span>
                </li>
                </router-link>
                <router-link to="/specialty">
                <li >
                  <img :src="snacks"/>
                  <span>零食</span>
                </li>
                </router-link>
                <router-link to="/specialty">
                <li >
                  <img :src="digital"/>
                  <span>数码</span>
                </li>
                </router-link>
              </ul>
            <ul>
              <router-link to="/specialty">
                <li >
                  <img :src="luggage_and_bags"/>
                  <span>箱包</span>
                </li>
              </router-link>
              <router-link to="/specialty">
                <li >
                  <img :src="accessories"/>
                  <span>配饰</span>
                </li>
              </router-link>
              <router-link to="/specialty">
                <li >
                  <img :src="delicious_food"/>
                  <span>美食</span>
                </li>
              </router-link>
              <router-link to="/specialty">
                <li>
                  <img :src="all_list"/>
                  <span >全部</span>
                </li>
              </router-link>
              </ul>
          </div>
           <div class="middle"></div>
            <div class="mail_bottom">
            <ul >
              <li v-for="item in product " @click="selectproduct(item)" >
                <router-link to="/specialtyDetail">
                <div class="mail_bottom_i"><img :src="item.Image" ></div>
                <div class="mail_bottom_r">
                  <h3>{{item.Name}}</h3>
                  <p>{{item.Description}}</p>
                  <div class="mail_price">
                    <span>&yen;<b>{{item.Price}}</b>/元</span>
                    <p>销量&#58;<i>{{item.Stock}}</i></p>
                  </div>
                </div>
              </router-link>
              </li>
            </ul>
          </div>
      </div>
    </div>
    </div>
    <!--底部-->
    <v-menu></v-menu>
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
    data() {
      return {
        index: [],
        img: ['static/img/mall/banner_01.jpg', 'static/img/mall/banner_02.jpg', 'static/img/mall/banner_03.jpg', 'static/img/mall/banner_04.jpg'],
        searchicon: ['static/img/mall/search-icon.png'],    // 主体图标
        specialty: ['static/img/mall/specialty.png'],
        fresh: ['static/img/mall/fresh.png'],
        snacks: ['static/img/mall/snacks.png'],
        digital: ['static/img/mall/digital.png'],
        luggage_and_bags: ['static/img/mall/luggage_and_bags.png'],
        delicious_food: ['static/img/mall/delicious_food.png'],
        accessories: ['static/img/mall/accessories.png'],
        all_list: ['static/img/mall/all_list.png'],
        scroll: '',
        search_top: true,
        product: [],
        num: 2,
        GoodNo: '',
        req: []
      }
    },
    created() {
      this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
        Function: 'QueryRecommendGoodss',
        Data: {
          PageSize: 20,
          PageIndex: 0
    }
      }).then((res) => {
        this.req = res.data.State; // 状态码
        this.product = res.data.Data.Goodss;    // 请求数据
        console.log(this.req);
        console.log(this.product);
        this.$nextTick(() => {
          this._initScroll();
//          console.log(this.munescroll)
        });
      });
    },
//    created() {
//      this.$http.get('static/data.json').then((res) => {
//        this.product = res.data.product;
//        this.$nextTick(() => {
//          this._initScroll();    // 初始化scroll
//        });
//       console.log(this.product);
//      });
//    },
    // 过滤显示的数据
      computed: {
      filterProduct: function() {
        return this.product.slice(0, this.num);
      }
    },
      methods: {
      selectproduct(item) {
          this.GoodNo = item;  // 点击选择当前商品列表
          this.$store.dispatch('selectChange', {currentProduct: item});  // 取到item的值 存储到store中 orderName为数组 在order中接收
//          console.log(item.No);
//          console.log(this.$store.state.currentProduct);
      },
      _initScroll() {
        this.munescroll = new BScroll(this.$refs.menuWrapper, {
            click: true,
            probeType: 3
          });
        this.munescroll.on('scroll', (pos) => {
//          console.log(pos.y)
        })
      }
    },
    mounted() {
      this.$store.dispatch('pageChange', {pageName: 'mall', pageTitle: '熊猫商城'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
@import "css/mall.css";
</style>
