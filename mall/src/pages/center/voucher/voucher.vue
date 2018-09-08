<template>
      <div class="voucher">
        <!--顶部-->
        <top></top>
        <!--优惠券-->
        <div class="voucher_wrapper" ref="vouchWrapper">
        <div class="voucher_contanier">
            <ul>
              <li class="voucher_all">
                <div class="voucher_contanier_left">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                <div class="voucher_contanier_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.7.1</span></h4>
                </div>
              </li>
              <li class="voucher_all">
                <div class="voucher_contanier_left">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                <div class="voucher_contanier_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.7.1</span></h4>
                </div>
              </li>
              <li class="voucher_all">
                <div class="voucher_contanier_left_exceed">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                    <div class="seal"></div>
                <div class="voucher_contanier_right voucher_contanier_left_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.5.1</span></h4>
                </div>
              </li>
              <li class="voucher_all">
                <div class="voucher_contanier_left_exceed">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                <div class="seal"></div>
                <div class="voucher_contanier_right voucher_contanier_left_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.5.1</span></h4>
                </div>
              </li>
              <li class="voucher_all">
                <div class="voucher_contanier_left_exceed">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                <div class="seal"></div>
                <div class="voucher_contanier_right voucher_contanier_left_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.5.1</span></h4>
                </div>
              </li>
              <li class="voucher_all">
                <div class="voucher_contanier_left_exceed">
                  <h3>全场券</h3>
                  <p>&yen;<span>15</span></p>
                  <h4>满80元使用</h4>
                </div>
                <div class="seal"></div>
                <div class="voucher_contanier_right voucher_contanier_left_right">
                  <p><span>优惠券</span>熊猫商城商品</p>
                  <h4>有效期&#58; <span>2017.3.1</span>-<span>2017.5.1</span></h4>
                </div>
              </li>
            </ul>
        </div>
        </div>
      </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../../components/malltop/top.vue';
      export default {
        components: {
          top
        },
        created() {
          this.$nextTick(() => {
            this._initScroll();
          });
        },
      methods: {
            _initScroll() {
                this.menuscroll = new BScroll(this.$refs.vouchWrapper, {
                    click: true
                })
            }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'voucher', pageTitle: '优惠券'});
        console.log(this.$store.state.currentPage);
      }
    }
</script>
<style>
  .voucher{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 600;
    background: #eee;
  }
.voucher_wrapper{
  position: fixed;
  height: 100%;
  width: 100%;
  top:49px;
  left: 0;
}
.voucher_contanier{
  padding-bottom: 44px;
 width: 100%;
  overflow: hidden;
}
.voucher_all{
  background: #fff;
  margin-bottom: 10px;
  position: relative;
}
  .voucher_contanier_left{
    width: 124px;
    height: 100px;
    float: left;
    background: url("../../../../static/img/mall/coupon.png") center top no-repeat;
    background-size: contain;
  }
.voucher_contanier_left h3,.voucher_contanier_left p,.voucher_contanier_left h4{
  color: #fff;
  padding-left: 15px;
}
.voucher_contanier_left h3,.voucher_contanier_left_exceed h3{
  font-size: 16px;
  line-height: 30px;
}
.voucher_contanier_left p,.voucher_contanier_left_exceed p{
  font-size: 14px;
  line-height: 20px;
}
.voucher_contanier_left p span,.voucher_contanier_left_exceed p span{
  color: #fff;
  font-size: 20px;
  line-height: 40px;
}
.voucher_contanier_left h4,.voucher_contanier_left_exceed h4{
  font-size: 14px;
  line-height: 20px;
}
  /*优惠券右边*/
  .voucher_contanier_right{
    margin-left: 124px;
    overflow: hidden;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
.voucher_contanier_right p {
  padding: 5px 0 5px 15px;
  font-size: 14px;
  line-height: 20px;
}
.voucher_contanier_right p span{
  font-size: 12px;
  color: #fff;
  padding: 3px 5px;
  line-height: 12px;
  background: #FA5037;
  border-radius:3px;
  margin-right: 10px;
}
.voucher_contanier_right h4{
   font-size: 12px;
  line-height: 20px;
  padding: 5px 0 5px 15px;
  color:#888;
}
.voucher_contanier_right h4 span{
  font-size: 12px;
  line-height: 20px;
  color:#888;
}
  /*过期*/
  .voucher_contanier_left_exceed{
    width: 124px;
    height: 100px;
    float: left;
    background: url("../../../../static/img/mall/overdue_coupon.png") center top no-repeat;
    background-size: contain;
  }
  .voucher_contanier_left_exceed h3,.voucher_contanier_left_exceed p,.voucher_contanier_left_exceed h4{
    color: #fff;
    padding-left: 15px;
  }
  .seal{
    position: absolute;
    width: 100px;
    height: 100px;
    top:0;
    left: 62px;
    background: url("../../../../static/img/mall/expired.png") center top no-repeat;
    background-size: cover;
  }
  .voucher_contanier_left_right{
    background: #E6E6E6;
  }
</style>.
