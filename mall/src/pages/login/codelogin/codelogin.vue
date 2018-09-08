<template>
        <div class="code_container">
              <div class="menu_top">
                  <i class="back_password" @click="back_it()"></i>
                    <h4>验证码登录</h4>
              </div>
          <div class="register_body">
            <ul>
              <li class="input_cellphone"><i class="cellphone"></i>
                <input type="number" placeholder="请输入您的手机号" v-model="items.phonenumber" ref="phonenumber"></li>
              <li class="register_code">
                <p><i class="code"></i>
                  <input class="code_input" type="number" placeholder="验证码" v-model="items.codenumber" ref="codenumber"></p>
                <button class="getcode" @click="getcode":disabled="disabled || time > 0" :class="{disabledstyle: disabled || time > 0}">{{text}}</button></li>
            </ul>
          </div>
          <div class="code_button">
            <!--<button class="login_button" @click="codeRegister($event)" :class="{red_button:red}">登录</button>-->
            <mu-raised-button label="登录" class="demo-raised-button" @click="codeRegister($event)" :class="{red_button:red,click_btn:oldred}"  primary/>
              <p class="password_button" ><router-link  to="password">密码登录</router-link></p>
          </div>
          <div class="login_bottom">
            <p>微信登录</p>
            <span></span>
          </div>
          <div class="login_prompt" v-show="prompt_m">
            <p>{{prompt_mes}}</p>
          </div>
        </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
              phone: false,
              code: false,
              red: false,
              oldred: false,
              prompt_m: false,
              prompt_mes: '',
              disabled: false,
              codeNo: '',
              seconds: 60, // 重新获取验证码的间隔时间（60秒）
              time: 0, // 倒计时剩余时间，默认为0  (大于0时按钮不可点击)
              items: {
                phonenumber: '',
                codenumber: ''
              }
            }
        },
      methods: {
        back_it() {
            history.back(-1)
        },
        codeRegister(event) {
            if (!/^1\d{10}$/gi.test(this.items.phonenumber)) {
                this.prompt_m = true;
                this.prompt_mes = '手机号错误';
            } else if (this.codenumber === '') {
              this.prompt_mes = '请输入验证码';
              this.prompt_m = true;
            }
        },
        getcode() {
          if (!/^1\d{10}$/gi.test(this.items.phonenumber)) {
            this.prompt_m = true;
            this.prompt_mes = '请填写正确的手机号';
          } else {
            this.disabled = true;
            this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
              Function: 'SendVerifyCode',
              Data: {
                MobileNo: this.items.phonenumber
              }
            }).then((res) => {
              this.codeNo = res.data.State; // 状态码
              console.log(this.codeNo);
            });
            this.time = this.seconds;
            this.timer();
          }
        },
        timer () { // 开始倒计时
          if (this.time > 0) {
            this.time--;
            setTimeout(this.timer, 1000);
          } else {
            this.disabled = false;
          }
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
            if (this.$refs.phonenumber.value !== '' && this.$refs.codenumber.value !== '') {
              this.red = true;
            } else if (this.$refs.phonenumber.value === '' || this.$refs.codenumber.value === '') {
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
  .code_container{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top:  0;
  background: #fff;
  }

  .code_button{
    padding: 0 40px;
  }
  .password_button{
    margin-top: 10px;
    text-align: right;
  }
  .code_button a{
    font-size: 14px;
    line-height: 24px;
    color:#999;
  }

</style>
