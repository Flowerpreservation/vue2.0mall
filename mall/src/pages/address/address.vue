<template>
  <div class="address">
    <!--顶部-->
    <top></top>
    <div class="address_wrapper" ref="addressWrapper">
      <div class="address_container">
              <div class="my_address" v-for="(item,index) in paddr">
                <div class="address_name">
                  <router-link to="/revise">
                  <h4>收货人&#58;&nbsp;<span>{{item.Linkman}}</span>&nbsp;<span>{{item.MobileNo}}</span></h4>
                  <p>地址&nbsp;<span>{{item.Address}}</span></p>
                  </router-link>
                </div>
                  <div class="address_setting">
                    <p class="setting_default">
                      <i class="radio_1" @click="selected_address(item)" :class="{'default':item.IsDefault}"></i>
                      <span>设为默认</span></p>
                    <p class="setting_others">
                      <router-link to="/revise">
                      <span class="setting_it" @click="revise(item)"><i ></i><b>编辑</b></span>
                      </router-link>
                      <span class="setting_delete" @click="delete_ad(item)"><i ></i><b>删除</b></span>
                    </p>
                  </div>
              </div>
            <!--<p class="more" @click="loadmore">加载全部</p>-->
    </div>
      <div class="add_address">
        <router-link to="/newaddress">
          新增地址
        </router-link>
      </div>
    </div>
    <!--删除-->
    <div class="delete_bg" v-show="cur">
      <div class="delete_wh">
        <h4>确认要删除该商品么?</h4>
        <p>
          <a class="alert_left" @click="cancel">取消</a>
          <a class="alert_right" @click="delete_i()">确认</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../components/malltop/top.vue';
  export default {
    components: {
      top
    },
    data() {
        return {
            paddr: [],
            cur: false,
            checked: false,
            checkedallFlag: false,
            num: 5,
            index: 0,
            MemberNo: [],
            MemberAddr: {},
            codeNo: '',
            currentIndex: 0,
            daddress: {}    // 声明当前要删除的地址
        }
    },
    created() {
      this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
        Function: 'QueryAddress',
        Data: {
          MemberNo: '10000001'
    }
      }).then((res) => {
          this.MemberNo = res.data.State; // 状态码
          this.paddr = res.data.Data; // 内容
          console.log(this.paddr);
        this.$nextTick(() => {
          this._initScroll();
        });
      });
    },
//    created() {
//      this.$http.get('static/data.json').then((res) => {      // 获取地址列表数据
//        this.paddr = res.data.address;
//        this.$nextTick(() => {
//          this._initScroll();
//        })
//      })
//    },
//    computed: {
//      filteredItems: function () {
//        return this.paddr.slice(0, this.num);
//      }
//    },
    methods: {
      delete_ad(item) {       // 点击删除
          this.cur = true;
          this.daddress = item;
          console.log(this.daddress);
          this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
          Function: 'DeleteAddress',
          Data: {
            MemberNo: 10000001,
            AddressID: item.ID
          }
        }).then((res) => {
          this.codeNo = res.data.State; // 状态码
          console.log(this.codeNo);
          console.log(res.data.Data);
        })
      },
      delete_i() {            // 确认删除
        this.cur = false;
        let index = this.paddr.indexOf(this.daddress);
        this.paddr.splice(index, 1);
        console.log(index);
      },
      cancel() {          // 取消
          this.cur = false
      },
      // 编辑
      revise(item) {
          console.log(item);
        this.$store.dispatch('addrChange', {raddr: item});
      },
      selected_address(item) {                    // 单击设为默认地址
        console.log(this.paddr.length);
        for (let i = 0; i < this.paddr.length; i++) {
            if (this.paddr[i].ID === item.ID) {
              this.paddr[i].IsDefault = true;
              this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
                Function: 'SetDefaultAddress',
                Data: {
                  MemberNo: 10000001,
                  AddressID: this.paddr[i].ID
                }
              }).then((res) => {
//                console.log(res.data.Data);
                console.log(res.data.State);
              })
            } else {
              this.paddr[i].IsDefault = false
            }
        }
      },
      _initScroll () {
          this.menuscroll = new BScroll(this.$refs.addressWrapper, {
                click: true
          })
      }
    },
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'address', pageTitle: '我的地址'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
  .address{
    position: fixed;
    width: 100%;
    height:100%;
    left:0;
    top:0;
    background: #eee;
  }
  .address_wrapper{
    position: fixed;
    width: 100%;
    height:100%;
    left:0;
    top:44px;
    overflow: hidden;
  }
  .address_container{
   width: 100%;
    overflow: hidden;
    padding-bottom: 84px;
  }
  .address_list{
    margin-bottom: 40px;
  }
  .my_address{
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
      margin-bottom: 5px;
  }
  .address_name{
    padding: 10px;
  }
  .address_name a{
    display: block;
  }
  .address_name h4,.address_name h4 span{
    font-size: 16px;
    line-height: 30px;
    color:#000;
    font-weight: 600;
  }
  .address_name p,.address_name p span{
    font-size:14px;
    line-height: 20px;
    color:#888;
  }
  .address_setting{
      padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .radio_1{
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/radio_icon.png") no-repeat;
    background-size: 40px;
    background-position: left 0;
  }
  .default{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/mall/radio_icon.png") no-repeat;
    background-size: 40px;
    background-position: right 0
  }
  .setting_default span{
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
  }
  .setting_it{
    margin-right: 10px;
  }
  .setting_it i{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url("./img/edit2.png") center top no-repeat;
    background-size: cover;
    vertical-align: top;
  }
  .setting_delete i{
    display: inline-block;
    width:20px;
    height:20px;
    margin-right: 10px;
    background: url("./img/delete3.png") center top no-repeat;
    background-size: cover;
    vertical-align: top;
  }
  .setting_delete b,.setting_it b{
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
  }
  .more{
    text-align: center;
    background: #ddd;
    color:#000000;
  }
  /*新增收货地址*/
  .add_address{
    background: #FA5037;
    position: fixed;
    width: 100%;
    bottom:0;
  }
  .add_address a{
    display: block;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    text-align: center;
  }
</style>

