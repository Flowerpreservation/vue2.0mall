<template>
        <div class="password">
          <div class="register_container">
            <!--注册头部-->
            <div class="menu_top">
              <i class="back_password" @click="close_login()"></i>
              <router-link to="/login" class="inner">立即登录</router-link>
              <p>找回密码</p>
            </div>
            <!--注册输入-->
            <div class="register_body">
              <ul>
                <li class="input_cellphone"><i class="cellphone"></i>
                  <input type="number" placeholder="请输入您的手机号" v-model="items.pwdphone" ref="pwdphone" @focus="pwdfocus()"></li>
                <li class="register_code">
                  <p><i class="code"></i>
                    <input class="code_input" type="number" placeholder="验证码" v-model="items.pwdcode" ref="pwdcode" @focus="pwdfocus()"></p>
                  <button class="getcode" @click="pwd_getcode" :disabled="disabled || time > 0" :class="{disabledstyle:disabled || time > 0}">{{text}}</button></li>
                <li class="input_password"><i class="lock"></i>
                  <input type="password" placeholder="设置密码，6-20位" v-model="items.pwds" ref="pwds" @focus="pwdfocus()"></li>
              </ul>
            </div>
            <!--注册协议-->
            <div class="register_button">
              <!--<p class="r_button" @click="changepwd" :class="{red_button:red}" >修改密码并登录</p>-->
              <mu-raised-button label="登录" class="demo-raised-button" @click="changepwd" :class="{red_button:red,click_btn:oldred}"  primary/>
            </div>

            <!--提示文字-->
            <div class="login_prompt"  v-show="register_prompt">
              <p>{{prompt_ms}}</p>
            </div>
          </div>
        </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
              register_prompt: false,
              red: false,
              codeNo: '',
              oldred: false,
              items: {
                  pwdphone: '',
                  pwdcode: '',
                  pwds: ''
              },
              prompt_ms: '',
              disabled: false,
              time: 0,
              seconds: 60
            }
        },
      methods: {
        close_login() {
            history.back(-1)
        },
        changepwd() {
            if (!/^1\d{10}$/gi.test(this.items.pwdphone)) {
                this.register_prompt = true;
                this.prompt_ms = '请输入正确的手机号'
            } else if (this.items.pwdcode === '') {
              this.register_prompt = true;
              this.prompt_ms = '请输入验证码'
            } else if (this.items.pwds === '') {
              this.register_prompt = true;
              this.prompt_ms = '请输入密码'
            } else if (this.items.pwds === '') {    // !/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/.test(this.items.pwds)
              this.register_prompt = true;
              this.prompt_ms = '密码格式有误'
            } else {
              this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
                Function: 'ResetPassword',
                Data: {
                  VerifyCode: '',
                  MobileNo: this.items.pwdphone,
                  NewPassword: ''
                }
              }).then((res) => {
                this.codeNo = res.data.State; // 状态码
                console.log(this.codeNo);
              });
            }
              },
        pwd_getcode() {
            if (!/^1\d{10}$/gi.test(this.items.pwdphone)) {
              this.register_prompt = true;
              this.prompt_ms = '请输入正确的手机号'
            } else {
              this.disabled = true;
              this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
                Function: 'SendVerifyCode',
                Data: {
                  MobileNo: this.items.pwdphone
                }
              }).then((res) => {
                this.codeNo = res.data.State; // 状态码
                console.log(this.codeNo);
              });
              this.time = this.seconds;
              this.timer();
            }
        },
        timer() {
          if (this.time > 0) {
          this.time--;
         setTimeout(this.timer, 1000);
        } else {
          this.disabled = false;
       }
        },
        pwdfocus() {
          this.register_prompt = false;
        }
      },
      computed: {
        text () {
          return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
        }
      },
      watch: {    // 监听输入栏的值
        items: {
          handler(val, oldval) {
//              console.log(this.$refs.loginPhone.value);
//              console.log(this.$refs.loginPwd.value);
            if (this.$refs.pwdphone.value !== '' && this.$refs.pwdcode.value !== '' && this.$refs.pwds.value !== '') {
              this.red = true;
            } else if (this.$refs.pwdphone.value === '' || this.$refs.pwdcode.value === '' || this.$refs.pwds.value === '') {
              this.red = false;
            }
          },
          deep: true
        }
      }
    }
</script>
<style>
  @import "../css/login.css";
  .menu_top .back_password{
    float: left;
    display: inline-block;
    width: 22px;
    height:22px;
    background: url("../../../../static/img/mall/back.png") 0 -1px no-repeat;
    background-size: cover;
  }
.password{
  position: fixed;
  background: #fff;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  }
</style>
