<template>
    <div class="unpaid">
      <!--顶部-->
      <m-top></m-top>
      <!--主体-->
      <div class="unpaid_container" :bind="OrderDetail">
        <div class="unpaid_address">
          <div class="unpaid_top">
          <label for="">收货人&#58;</label>
          <span>{{OrderDetail.Linkman}}</span>
          <span>{{OrderDetail.MobileNo}}</span>
          </div>
          <p>{{OrderDetail.Address}}</p>
        </div>
        <div class="unpaid_detail" v-for="item in OrderDetail.Items">
            <ul>
              <li class="unpaid_detail_item">
                <div class="unpaid_left">
                  <img :src="item.Image" alt="">
                </div>
                <div class="unpaid_right">
                  <div class="unpaid_right_detail">
                    <p>{{item.ProductName}}</p>
                    <span>规格&#58;<span>1kg</span></span>
                  </div>
                  <dl class="unpaid_right_price">
                    <dd><del>&yen;{{item.Price+20}}</del></dd>
                    <dt>&yen;<b>{{item.Price}}</b></dt>
                    <dt class="unpaid_count">x<span>{{item.Quantity}}</span></dt>
                  </dl>
                </div>
              </li>
              <li class="unpaid_detail_item">
                <span>快递运费&#58;</span>
                <span>包邮(默认快递)</span>
              </li>
              <li class="unpaid_detail_item">
                <span>价格合计&#58;</span>
                <p class="unpaid_count">&yen;<span>{{item.Price*item.Quantity | formantprice}}</span></p>
              </li>
              <li class="unpaid_detail_item_t">
                <p>订单编号&#58; <span>{{OrderDetail.No}}</span></p>
                <p>提交时间&#58; <span>{{OrderDetail.CreateTime}}</span></p>
              </li>
              <li class="unpaid_detail_item_b">
                <p class="kill_par" @click="kill_par(OrderDetail)">取消订单</p>
                <p class="go_par">付款</p>
              </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import top from '../../../../components/memberTop/mTop.vue'
    export default {
        components: {
            'm-top': top
        },
      data() {
            return {
                OrderDetail: []
            }
      },
      created() {
                this.OrderDetail = this.$store.state.memberInf;
                console.log(this.OrderDetail);
        this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
                Function: 'QuerymallOrder',
                Data: {
                  OrderNo: this.OrderDetail
                }
              }).then((res) => {
                console.log(res.data.Data);
                console.log(res.data.State);
                this.OrderDetail = res.data.Data;
              });
      },
      filters: {
        formantprice(value) {
          return value.toFixed(2);
        }
      },
      methods: {
        kill_par(OrderDetail) {
            console.log(OrderDetail.No);
          this.$http.post('http://open.58youyu.cn//Business/Mall/Service.aspx', {
              Function: 'CancemallOrder',
              Data: {
                OrderNo: OrderDetail.No
              }
          }).then((res) => {
              console.log(res.data.State);
              console.log(res.data.Data);
          })
        }
      },
      mounted () {
//        this.OrderDetail = this.$store.state.memberInf;
//        console.log(this.OrderDetail);
        this.$store.dispatch('pageChange', {pageName: 'unpaid', pageTitle: '订单详情'});
        console.log(this.$store.state.currentPage);
      }
    }
</script>
<style>
.unpaid_container{
  margin-top: 47px;
}
.unpaid_top label,.unpaid_top span {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
}
  .unpaid_address{
    background: #fff;
    padding: 10px;
  }
  .unpaid_address p{
    margin-top: 5px;
    font-size: 14px;
    line-height: 20px;
  }
  .unpaid_detail{
    background-color: #fff;
    margin-top: 10px;
  }
  .unpaid_detail_item{
    display: flex;
    padding: 10px;
    justify-content: space-between;
    border-bottom: 1px solid #d4d4d4;
  }
  .unpaid_detail_item span,.unpaid_count{
    font-size: 14px;
    line-height: 20px;
    color:#888;
  }
  .unpaid_left{
    flex: 0 0 90px;
    width: 90px;
    height: 90px;
    margin-right: 10px;
  }
  .unpaid_left img{
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .unpaid_right{
    display: flex;
    flex: 1 1 auto;
  }
  .unpaid_right_price dt,.unpaid_right_price dt b{
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }
  .unpaid_right_detail,.unpaid_right_price{
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
  }
.unpaid_right_price{
  text-align: right;
}
  .unpaid_detail_item_t{
    padding: 10px;
    border-bottom: 1px solid #d3d3d3;
  }
  .unpaid_right_price dd del,.unpaid_detail_item_t p,.unpaid_detail_item_t p span{
    font-size: 14px;
    line-height: 28px;
    color:#888;
  }
  .unpaid_detail_item_b{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px 20px 10px;
  }
  .kill_par,.go_par{
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    width: 45%;
    border-radius: 3px;
  }
  .kill_par{
    background-color: #eee;
  }
  .go_par{
    background-color: #FA5037;
    color: #fff;
  }
</style>
