<template>
        <div class="newaddress">
          <!--顶部-->
          <div class="malltop">
            <span class="el-icon-arrow-left" @click="return_it"></span>
            <p >添加地址</p>
            <router-link to="/">
              <b class="icon-home3"></b>
            </router-link>
          </div>
                  <div class="address_detail">
                  <ul >
                  <li><label for="">收货人</label><input type="text" placeholder="姓名" v-model="items.name" ref="name"></li>
                  <li><label for="">联系方式</label><input type="number" placeholder="手机号码" v-model="items.phone" ref="phone"></li>
                  <li class="setting_address" @click="select_add()">
                    <div @click="select_city" class="address_select_container">
                    <label for="" class="select_tit">省市区县</label>
                    <!--<router-link to="/citypicker">-->
                      <!--<p class="detail_cities">-->
                      <!--<span>{{scity}}</span>-->
                      <!--<span>{{ucity}}</span>-->
                      <!--<span>{{fcity}}</span>-->
                      <!--</p>-->
                    <!--</router-link>-->
                      <p class="select_container">
                        <span>{{scity}}</span>
                        <span>{{ucity}}</span>
                        <span>{{fcity}}</span>
                      </p>
                      <span class="setting_right" ><i class="el-icon-arrow-right"></i></span>
                    </div>
                  </li>
                  <li class="detail_row">
                    <label for="">详细街道</label>
                    <textarea name="" id="" cols="5" rows="3" v-model="items.mesg" ref="mesg">&nbsp;</textarea>
                    <span @click="clear_all()"></span>
                  </li>
                  </ul>
                  </div>
                  <div class="get_address">
                    <p to="/address" @click="save_address()">确定</p>
                  </div>
            <div class="login_prompt" v-show="login_prompt">
                <p>{{prompt_ms}}</p>
          </div>
          <!--城市列表-->
          <div class="city_show" v-show="city_show">
                 <div class="city_top" @click="city_showout"></div>
                <div class="city_bottom">
                  <div class="select_top">
                    <span class="close_select" @click="city_showout"></span>
                    <p class="select_title">所在地区</p>
                  </div>
                  <div class="select_header">
                    <p class="select_list">
                     <span :class="{'select_active':red}" v-model="before_select" @click="select1()">{{before_select}}</span>
                      <span :class="{'select_active':red2}" v-model="s_cities" @click="select2()">{{s_cities}}</span>
                      <span :class="{'select_active':red3}" v-model="s_district" @click="select3()">{{s_district}}</span>
                    </p>
                  </div>
                  <div class="province_list" v-show="province_list">
                    <ul >
                      <li v-for="(item, index) in provincename" class="list_item" @click="select_p(item)">
                        <p >
                        <span>{{item.name}}</span>
                        <i v-bind:class="{'selected_r': selected_t == item}"></i>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="city_list" v-show="city_list">
                    <ul >
                      <li v-for="(item, index) in citiesname" class="list_item" @click="select_c(item)">
                        <p >
                          <span>{{item.name}}</span>
                          <i v-bind:class="{'selected_r': selected_c == item}"></i>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="district_list" v-show="district_list">
                    <ul >
                      <li v-for="(item, index) in districtname" class="list_item" @click="select_d(item)">
                        <p>
                          <span>{{item.name}}</span>
                          <i v-bind:class="{'selected_r': selected_y == item}"></i>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
          </div>
        </div>
</template>
<script>
  import top from '../../../components/malltop/top.vue';
    export default {
      components: {
        top
      },
      data () {
        return {
          codeNo: '',
          subms: '',
          province: [],
          city: [],
          district: [],
          cityname: [],
          scity: '省',
          ucity: '市',
          fcity: '区/县',
          login_prompt: false,
          prompt_ms: '',
          member: [],
          memberphone: [],
          items: {
              name: '',
              phone: '',
              city: '',
              mesg: '',
              road: ''
          },
          rt: [],
          addname: [],
          addphone: [],
          mesgl: [],
          city_show: false,
          red: true,
          red2: false,
          red3: false,
          city_list: false,
          province_list: true,
          district_list: false,
          before_select: '请选择',
          s_cities: '',
          s_district: '',
          provincename: [],
          citiesname: [],
          districtname: [],
          currentIndex: '',
          selected_t: false,
          selected_c: false,
          selected_y: false
        }
      },
      created () {
        this.$http.get('static/city.json').then((res) => {
          console.log(res.data.province);
          this.provincename = res.data.province;
          console.log(this.provincename)
        })
      },
      methods: {
        save_address() {
            if (this.items.name === '') {
                this.login_prompt = true;
                this.prompt_ms = '姓名不能为空';
                setTimeout(() => { this.login_prompt = false }, 2000)
            } else if (this.items.phone === '') {
              this.login_prompt = true;
              this.prompt_ms = '手机号不能为空';
              setTimeout(() => { this.login_prompt = false }, 2000)
            } else {
                console.log(this.$refs.name.value);
                console.log(this.scity);
                this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
                Function: 'SaveAddress',
                Data: {
                  MemberNo: 10000001,
                  ID: 0,
                  Address: this.scity + this.ucity + this.fcity + this.$refs.mesg.value,
                  Linkman: this.$refs.name.value,
                  MobileNo: this.$refs.phone.value,
                  IsDefault: 'false'
                }
              }).then((res) => {
                this.codeNo = res.data.State; // 状态码
                this.subms = res.data.Data; // 信息
                console.log(this.codeNo);
                console.log(this.subms);
              });
              history.back(-1);
              this.login_prompt = true;
              this.prompt_ms = '添加成功';
            }
        },
        select_add() {
          this.$store.dispatch('memberChange', {addName: this.addname, addPhone: this.addphone});
          console.log(this.$store.state.addName);
          console.log(this.$store.state.addPhone);
        },
        return_it () {
            history.back(-1)
        },
        // 选择城市
        select_city() {
          this.city_show = true
        },
        city_showout () {
            this.city_show = false
        },
        select1() {
            this.red = true;
            this.red2 = false;
            this.red3 = false;
            this.city_list = false;
            this.province_list = true;
        },
        select2() {
            this.red2 = true;
            this.red = false;
            this.red3 = false;
            this.city_list = true;
            this.province_list = false;
        },
        select3() {
            this.red3 = true;
            this.red = false;
            this.red2 = false;
            this.city_list = false;
            this.province_list = false;
        },
        select_p(item) {
            console.log(item);
            this.before_select = item.name;
            this.citiesname = item.city;
//            this.scity = this.before_select;
            this.red2 = true;
            this.red = false;
            this.s_cities = '请选择';
            this.s_district = '';
            this.city_list = true;
            this.province_list = false;
            this.selected_t = item;
//            let _this = this;
//            this.provincename.forEach(function (item, index) {
//            if (typeof item.selected_t === 'undefined') {          // 添加属性
//              _this.$set(item, 'selected_t', true);
//              console.log(_this)
//            } else {
//              item.checked = !item.checked;
//            }
//          });
        },
        select_c(item) {
          console.log(item);
          this.s_cities = item.name;
          this.districtname = item.district;
//          this.ucity = this.s_cities;
          this.s_district = '请选择';
          this.city_list = false;
          this.red2 = false;
          this.red3 = true;
          this.province_list = false;
          this.district_list = true;
          this.selected_c = item;
        },
        select_d(item) {
          console.log(item);
          this.s_district = item.name;
          this.fcity = this.s_district;
          this.ucity = this.s_cities;
          this.scity = this.before_select;
          this.city_show = false;
          this.selected_y = item;
        },
        clear_all() {
            if (this.$refs.mesg.value.length === 0) {
//              console.log(0)
            } else {
                 this.rt = this.$refs.mesg.value;  // 获取输入的值
                 this.rt = this.rt.split('');       // 转换为数组
                  this.rt.splice(0, this.rt.length);    // 删除数组
                  this.items.mesg = this.rt;            // 赋值给输入框
            }
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'newaddress', pageTitle: '添加地址'});
        console.log(this.$store.state.currentPage);
        this.member = this.$store.state.addName;
        this.memberphone = this.$store.state.addPhone;
        this.items.name = this.member;
        this.items.phone = this.memberphone;
        console.log(this.member);
        console.log(this.memberphone);
//        this.province = this.$store.state.DetailAdd;   // 接收来自list的对象值
//        this.city = this.$store.state.city;   // 接收来自list的对象值
//        this.district = this.$store.state.district;   // 接收来自list的对象值
        if (this.$store.state.DetailAdd.length === 0 || this.$store.state.city.length === 0 || this.$store.state.district === 0) {
//            return;
        } else {
          this.scity = this.$store.state.DetailAdd.name;
          this.ucity = this.$store.state.city.name;
          this.fcity = this.$store.state.district.name;
        }
      },
      watch: {                            //  监听input值
          items: {
            handler: function (val, oldval) {
                this.addname = this.$refs.name.value;
                console.log(this.addname);
              this.addphone = this.$refs.phone.value;
                console.log(this.addphone);
              this.mesgl = this.$refs.mesg.value;
              console.log(this.mesgl)
            },
            deep: true
          }
      }
    }
</script>
<style>
  .newaddress{
    position: fixed;
    height: 100%;
    width: 100%;
    background: #eee;
    top:0;
    left: 0;
    z-index: 600;
  }
  .address_detail{
    background: #fff;
    margin-top: 44px;
  }
  .address_detail ul li{
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .address_detail ul li label{
    margin-right: 6px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
  }
  .address_detail ul li input{
    text-align: left;
    border: 0;
    outline: none;
    font-size: 16px;
    line-height: 20px;
  }
  .address_detail ul li :-ms-input-placeholder{
    text-align: left;
    font-size: 16px;
    line-height: 20px;
  }
  .address_detail ul li ::-webkit-input-placeholder{
    text-align: left;
    font-size: 16px;
    line-height:20px;
  }
  .address_detail ul li :-moz-placeholder{
    font-size: 16px ;
    line-height: 20px;
  }
  /*地址选择*/
  .address_select_container{
    display:flex;
    justify-content: space-between;
  }
  /*选择区县*/
  .select_tit{
    flex: 0 0 70px;
  }
  .select_container{
    flex: 1 1 auto;
  }
  .setting_right{
   flex: 0 0 16px;
  }
  /*详细街道*/
  .detail_row label{
    flex: 0 0 70px;
  }
  .detail_row span{
    display: inline-block;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/x.png") center top no-repeat;
    background-size: cover;
    float: right;
    margin-top: 2px;
  }
  .detail_row .mu-text-field{
    width: 190px;
  }
  .detail_row .mu-text-field-content{
    padding-top: 0;
  }
  .detail_row {
    display: flex;
  }
  .detail_row .mu-text-field.multi-line .mu-text-field-hint{
      line-height: 16px;
  }
  .detail_row textarea{
    flex: 1 1 auto;
    width: 190px;
    border: 0;
    font-size: 16px;
    line-height: 16px;
    outline:none;
    resize: none;
    padding: 2px;
    overflow-y:visible
  }
  .get_address{
    margin-top: 20px;
    padding: 0 10px;
  }
  .get_address p{
    text-align: center;
    color:#fff;
    font-size: 16px;
    background: #FE5431;
    line-height: 45px;
    border-radius: 5px;
  }
  /*地区选择*/
  .picker-container{
    position: fixed;
    top:44px;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.1);
    z-index: 999;
  }
  .picker-wrapper{
    position: fixed;
    bottom:0;
    width: 100%;
  }
  .city_show{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index: 999;
  }
  .city_top{
    position: fixed;
    width: 100%;
    height: 40%;
    top:0;
    left: 0;
  }
  .city_bottom{
    position: fixed;
    width: 100%;
    height: 60%;
    bottom:0;
    left: 0;
    background: rgba(255, 255, 255, 1);
  }
  .select_top{
    padding: 10px;
    border-bottom: 1px solid #c7c7c7;
  }
  .close_select{
    float:right;
    width: 14px;
    height:14px;
    margin-top: 4px;
    background: url("../../../../static/img/mall/close.png") top center;
    background-size: cover;
  }
  .select_title{
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .select_header{
    padding: 0 5px 0 5px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
  }
  .select_list span{
    align-content: flex-start;
    float: left;
    padding: 4px;
    font-size: 14px;
    line-height: 28px;
    /*border-bottom: 2px solid #ff6060;*/
  }
  .select_active{
    border-bottom: 2px solid #ff6060;
  }
  .city_list,.province_list,.district_list{
    padding: 0 8px 0 8px;
    width: 100%;
    height: 100%;
    bottom:0;
    left: 0;
    overflow: scroll;
    padding-bottom: 45px;
  }
  .city_list ul {
    height: auto;
    overflow: hidden;
  }
  .list_item{
    /*display: flex;*/
    /*justify-content: space-between;*/
    font-size: 16px;
    line-height: 36px;
  }
  .list_item span{
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }
  .selected_r{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/selected.png") top center;
    background-size: cover;
    vertical-align: middle;
  }
</style>
