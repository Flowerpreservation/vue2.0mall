<template>
        <div class="Member">
              <top></top>
            <div class="member_container">
              <ul>
                <li class="member_mv">
                  <div class="member_ms_c" @click="choose_image()">
                  <span class="member_ms_left">头像</span>
                  <div class="member_ms_right">
                    <img :src="avator" alt="localIds">
                  <i class="el-icon-arrow-right"></i>
                  </div>
                  </div>
                </li>
                <li class="member_ms" @click="updateName(Infor)">
                  <router-link to="/updateName">
                  <div class="member_ms_n">
                    <span class="member_name_left">昵称</span>
                    <div class="member_name_right">
                     <p >{{Infor.Nickname}}</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                  </router-link>
                </li>
                <li class="member_ms">
                  <router-link to="/updateUser" @click="updateUser(Infor)">
                  <div class="member_ms_n">
                    <span class="member_name_left">性别</span>
                    <div class="member_name_right">
                      <p v-if="Infor.Sex=0">女</p>
                      <p v-else-if="Infor.Sex=1">男</p>
                      <p v-else-if="Infor.Sex=2">保密</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                    </router-link>
                </li>
                <li class="member_ms" @click="updatePhone(Infor)">
                  <router-link to="/updatePhone">
                  <div class="member_ms_n">
                    <span class="member_name_left">手机号</span>
                    <div class="member_name_right">
                      <p >{{Infor.MobileNo}}</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                  </router-link>
                </li>
                <li class="member_ms" @click="updateEmail(Infor)">
                  <router-link to="/updateEmail">
                  <div class="member_ms_n">
                    <span class="member_name_left">邮箱</span>
                    <div class="member_name_right">
                      <p >{{Infor.Email}}</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                  </router-link>
                </li>
                <li class="member_ms" @click="updateBirth(Infor)">
                  <router-link to="/updateBrith">
                  <div class="member_ms_n">
                    <span class="member_name_left">生日</span>
                    <div class="member_name_right">
                      <p>{{Infor.Birthday}}</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                  </router-link>
                </li>
                <li class="member_ms" @click="updateAddr(Infor)">
                  <router-link to="/updateAddr">
                  <div class="member_ms_n">
                    <span class="member_name_left">地址</span>
                    <div class="member_name_right">
                      <p >{{Infor.Address}}</p>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                  </router-link>
                </li>
              </ul>
              <div class="member_btn">
              <mu-raised-button label="保存" class="demo-raised-button" @click="refresh(Infor)"  primary/>
              </div>
            </div>
          <transition name="router-slide">
          <router-view></router-view>
          </transition>
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
              avator: '../static/img/mall/center/header.png',
              memberCode: [],
              Infor: []
            }
      },
      created() {
        this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
          Function: 'QueryMember',
          Data: {
            MemberNo: '10000001'
          }
        }).then((res) => {
            this.memberCode = res.data.State;
            this.Infor = res.data.Data;
            console.log(this.Infor);
            console.log(this.memberCode);
        });
      },

      methods: {
        refresh(Infor) {
          this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
            Function: 'UpdateMember',
            Data: {
              No: '10000001',
              Name: '李晓明',
              Nickname: '啊啊啊啊',
              Image: '../static/img/mall/center/default_avatar.png',
              MobileNo: '13800138000',
              Email: '21323456222@qq.com',
              Birthday: '1998-12-11',
              Sex: 0,
              Address: '华宝一号的大厦'
            }
          }).then((res) => {
              console.log(res.data.State);
              console.log(res.data.Data);
          });
              console.log(111);
        },
        updateName(Infor) {
          this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        updatePhone(Infor) {
            console.log(Infor);
            this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        updateUser(Infor) {
            console.log(Infor);
            this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        updateEmail(Infor) {
          this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        updateBirth(Infor) {
          this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        updateAddr(Infor) {
          this.$store.dispatch('memberChange', {memberInf: Infor});
        },
        choose_image(Infor) {
          let wx = require('weixin-js-sdk');
//          console.log(wx);
          wx.config({
            debug: true,
            appId: 'wx9e3e3cd616e17177',  // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: 1497599704,  // 必填，生成签名的时间戳
            nonceStr: 'EUKDM71Zg3Koq7Mr',  // 必填，生成签名的随机串
            signature: '448c5d8ab6ab8d86777c7cf1b2997990aa708756', // 必填，签名，见附录1
            jsApiList: ['chooseImage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera']   // 可以指定来源是相册还是相机，默认二者都有
            });
          });
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
          wx.checkJsApi({
            jsApiList: ['chooseImage'],  // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
               // 以键值对的形式返回，可用的api值true，不可用为false
               // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'member', pageTitle: '我的资料'});
        console.log(this.$store.state.currentPage);
//        let wx = require('weixin-js-sdk');
//        console.log(wx);
//        wx.config({
//          debug: true,
//          appId: 'wx9e3e3cd616e17177',  // 必填，企业号的唯一标识，此处填写企业号corpid
//          timestamp: 1414587457,  // 必填，生成签名的时间戳
//          nonceStr: 'sduhi123',  // 必填，生成签名的随机串
//          signature: '0f9de62fce790f9a083d5c99e95740ceb90c27ed', // 必填，签名，见附录1
//          jsApiList: ['chooseImage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//        });
      }
    }
</script>
<style>
.Member{
  position:fixed;
  top:0;
  left: 0;
  width: 100%;
  height:100%;
  background: #eee;
  z-index: 500;
}
  .member_container{
    position:fixed;
    top:50px;
    left: 0;
    width: 100%;
    height:100%;
    background: #fff;
    z-index: 500;
  }
.member_ms_left{
  font-size: 14px;
  line-height: 40px;
}
.member_mv{
  padding: 10px;
}
  .member_ms{
    padding: 5px 10px 10px 10px;
  }
  .member_ms_c{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
.member_ms_right .el-icon-arrow-right{
  line-height: 40px;
  color: #999;
}
  .member_ms_right{
    display: flex;
  }
  .member_ms_right img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  /*昵称*/
.member_ms_n{
  padding:0 0 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
  .member_name_right{
    display: flex;
    justify-content: space-between;
  }
  .member_name_right p,.member_name_right i{
    font-size: 14px;
    line-height: 20px;
  }
  .member_name_right i{
    color:#999;
  }
  .member_btn{
    padding: 20px;
  }
</style>
