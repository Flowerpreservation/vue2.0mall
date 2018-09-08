<template>
          <div class="mysetting">
            <top></top>
            <div class="modify">
                  <ul>
                    <li class="modify_phone" @click="md_phone()">
                      <b class="cell_phone_number"></b>
                      <div class="customer_phone">
                        <span>手机号</span>
                        <p>{{membergs}}<i class="el-icon-arrow-right"></i></p>
                      </div>
                    </li>
                    <li class="modify_phone">
                      <router-link to="/safe">
                      <b class="update_password"></b>
                      <div class="customer_phone">
                        <span>修改登录密码</span>
                        <p><i class="el-icon-arrow-right"></i></p>
                      </div>
                      </router-link>
                    </li>
                    <li class="modify_phone">
                      <b class="terms_of_service"></b>
                      <div class="customer_phone">
                        <span>服务条款</span>
                        <p><i class="el-icon-arrow-right"></i></p>
                      </div>
                    </li>
                    <li class="modify_phone">
                      <b class="about_panda_travel"></b>
                      <div class="customer_phone">
                        <span>关于熊猫商城</span>
                        <p><i class="el-icon-arrow-right"></i></p>
                      </div>
                    </li>
                  </ul>
            </div>
            <div class="drop_out">
              <!--<transition name="out-in">-->
              <!--<p @click="clear()">退出登录</p>-->
              <!--</transition>-->
              <el-button type="danger" @click="clear()">{{text}}</el-button>
              <!--<mu-raised-button type="button" label="退出登录" class="demo-raised-button" @click="clear()"  primary/>-->
            </div>
          </div>

</template>
<script>
  import top from '../../../components/malltop/top.vue'
    export default {
        components: {
            top
        },
        data () {
            return {
              text: '退出登录',
              membergs: '',
              statememberNo: []
            }
        },
        created () {
            if (sessionStorage.No) {
              this.text = '退出登录 ';
              this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
                Function: 'QueryMember',
                Data: {
                  MemberNo: sessionStorage.No
                }
              }).then((res) => {
                console.log(res.data.State);
                console.log(res.data.Data);
                this.statememberNo = res.data.Data.MobileNo;
                this.membergs = this.statememberNo
              });
            } else {
              this.text = '您尚未登录，点此登录 ';
              this.membergs = '尚未登录'
            }
      },
        methods: {
        clear() {
        sessionStorage.clear();
//          console.log(sessionStorage.getItem('No'));
            console.log(sessionStorage.No);
            this.text = '前往登录 ';
            this.$router.push('/login');
        },
          md_phone() {
            if (this.membergs === '尚未登录') {
                this.$router.push('/login')
            } else {
              this.$router.push('/phoneNumber');
              console.log(this.statememberNo);
              this.$store.dispatch('msgChange', {phoneN: this.statememberNo});
              console.log(this.$store.state.phoneN);
            }
          }
      },
        mounted () {
        this.$store.dispatch('pageChange', {pageName: 'setting', pageTitle: '设置中心'});
          console.log(this.$store.state.currentPage);
      }
    }
</script>
<style>
.mysetting{
  position: fixed;
  height: 100%;
  width: 100%;
  background: #eee;
  top:40px;
  left: 0;
  z-index: 600;
}
  .modify{
    margin-top: 5px;
    padding: 10px;
    background: #fff;
  }
  .modify_phone{
    padding: 10px 0;
  }
  .cell_phone_number{
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/cell_phone_number.png") center top no-repeat;
    background-size: cover;
    float: left;
  }
  .clear_cache{
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/clear_cache.png") center top no-repeat;
    background-size: cover;
    float: left;
  }
  .terms_of_service{
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/terms_of_service.png") center top no-repeat;
    background-size: cover;
    float: left;
  }
  .update_password{
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/lock.png") center top no-repeat;
    background-size: cover;
    float: left;
  }
.about_panda_travel{
  display: block;
  width: 20px;
  height: 20px;
  background: url("../../../../static/img/mall/about_panda_travel.png") center top no-repeat;
  background-size: cover;
  float: left;
}
.customer_phone span,.customer_phone  p{
  font-size: 14px;
  line-height: 20px;
}
.customer_phone  p,.customer_phone i{
  color:#888;
}
  .customer_phone {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
   padding-left: 10px;
    margin-left: 30px;
  }
  .customer_phone i{
    font-size: 12px;
    line-height: 20px;
    margin-left: 10px;
}
  /*退出*/
  .drop_out{
    margin-top: 10px;
    padding: 10px;
  }
.drop_out p{
  text-align: center;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  background: #FA5037;
  border-radius: 4px;
}
.drop_out .el-button--danger{
  border:#fff ;
  width: 100%;
}
.drop_out .el-button--danger span{
  font-size: 16px;
  line-height: 18px;
  color:#fff;
}
</style>
