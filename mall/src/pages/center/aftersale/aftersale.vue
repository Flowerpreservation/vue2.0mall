<template>
        <div class="aftersale">
          <top></top>
          <div class="order_wrapper" ref="orderWrapper">
          <div class="sale_list">
          <ul class="allorders_list">
            <!--<li class="order_list">-->
              <!--<div class="forship_order">-->
                <!--<div class="forship_name">-->
                  <!--<h2>已完成</h2>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<div class="forship_detail">-->
                    <!--<div class="scale_img">-->
                      <!--<img :src="scale_img">-->
                    <!--</div>-->
                    <!--<div class="product_detail">-->
                      <!--<div class="product_detail_right">-->
                        <!--<h3><del>&yen;&nbsp;<span>118</span></del></h3>-->
                        <!--<p>&yen;&nbsp;<span>98</span></p>-->
                        <!--<h4>x<span>1</span></h4>-->
                      <!--</div>-->
                      <!--<div class="product_detail_left">-->
                        <!--<h4>云南特产纯净天然原生态蜂蜜农家自产蜂蜜</h4>-->
                        <!--<p>款式&#58;<span>1</span>kg</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="post">-->
                    <!--<p>全国包邮<i></i>&nbsp;&nbsp;&nbsp;总计&#58;&nbsp;&nbsp;<span>&yen;&nbsp;<b>58</b></span></p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
          </ul>

        </div>
            <scroller :on-refresh="refresh"
                      :on-infinite="infinite"
                      style="padding-top: 44px;">
              <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
                {{ item }}
              </div>
            </scroller>
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
      data() {
        return {
          scale_img: './static/img/mall/test.jpg',
          items: []
        }
      },
         created() {
            this.$nextTick(() => {
                this._initScroll();
            })
      },
      methods: {
            _initScroll() {
                this.munescroll = new BScroll(this.$refs.orderWrapper, {
                    click: true
                });
            },
        refresh: function (done) {
          let self = this;
          setTimeout(function () {
            let start = self.top - 1;
            for (let i = start; i > start - 10; i--) {
              self.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
            }
            self.top = self.top - 10;
            done();
          }, 1500)
        },

        infinite: function (done) {
          let self = this;
          setTimeout(function () {
            let start = self.bottom + 1;
            for (let i = start; i < start + 10; i++) {
              self.items.push(i + ' - keep walking, be 2 with you.');
            }
            self.bottom = self.bottom + 10;
            done();
          }, 1500)
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'aftersale', pageTitle: '售后服务'});
//        console.log(this.$store.state.currentPage);
          for (let i = 1; i <= 20; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.');
          }
          this.top = 1;
          this.bottom = 20;
      }
    }
</script>
<style>
  .order_wrapper{
    position: fixed;
    height: 100%;
    width: 100%;
    top:44px;
    left: 0;
    overflow: hidden;
  }
.aftersale{
  position: fixed;
  height: 100%;
  width: 100%;
  top:44px;
  left: 0;
  background: #eee;
  z-index: 999;
}
  .sale_list{
    width: 100%;
    overflow: hidden;
    padding-bottom: 44px;
  }
</style>
