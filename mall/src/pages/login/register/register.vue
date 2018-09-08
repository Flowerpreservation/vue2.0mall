<template>
        <div class="register">
              <div class="register_container">
                <!--注册头部-->
                <div class="menu_top">
                  <router-link to="/mall" class="login_left">
                    <i></i>
                  </router-link>
                  <p>注册</p>
                  <router-link to="/login" class="inner">立即登录</router-link>
                </div>
                <!--注册输入-->
                  <div class="register_body">
                    <ul>
                      <li class="input_cellphone"><i class="cellphone"></i>
                        <input type="number" placeholder="请输入您的手机号" v-model="items.registerPhone" ref="registerPhone" @focus="registerPhoneFocus()" >
                      </li>
                          <li class="register_code">
                            <p><i class="code"></i>
                              <input class="code_input" type="number" placeholder="验证码" v-model="items.securitycode" ref="securitycode" @focus="registerPhoneFocus()"></p>
                          <button class="getcode" @click="getCode" :disabled="disabled || time > 0" :class="{disabledstyle: disabled || time > 0}">{{text}}</button>
                          </li>
                          <li class="input_password"><i class="lock"></i>
                            <input type="password" placeholder="设置密码，6-20位" v-model="items.passwords" ref="passwords" @focus="registerPhoneFocus()">
                          </li>
                        </ul>
                    </div>
                <!--注册协议-->
                <div class="register_button">
                      <p class="r_word">注册代表你同意《 <span>用户协议</span> 》</p>
                      <!--<button class="login_button" @click="register($event)" :class="{red_button:red}">注册</button>-->
                  <mu-raised-button label="注册" class="demo-raised-button" @click="register($event)" :class="{red_button:red,click_btn:oldred}"  primary/>
                </div>
                <!--提示文字-->
                <transition name="prompt_out" >
                <div class="login_prompt"  v-show="register_prompt">
                  <p>{{promptmessage}}</p>
                </div>
                </transition>
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
              oldred: false,
              regreq: '',
              regseq: '',
              param: {},
              codeNo: '',
              promptmessage: '',    // 提示信息
              items: {
                registerPhone: '',    // 手机号
                passwords: '',          // 密码
                securitycode: ''     // 验证码
              },
              disabled: false,  // 获取验证码按钮是否可点击（默认可点击）
              seconds: 60, // 重新获取验证码的间隔时间（60秒）
              time: 0 // 倒计时剩余时间，默认为0  (大于0时按钮不可点击)
            }
        },
      methods: {
        register(event) {
          if (!/^1\d{10}$/gi.test(this.items.registerPhone)) {   // !/^1\d{10}$/gi.test(this.items.registerPhone)
            this.promptmessage = '请输入正确的手机号 ';
            this.register_prompt = true;
            this.register_promptTimer = setTimeout(() => { this.register_prompt = false }, 2000)
          } else if (this.items.securitycode === '') {
            this.promptmessage = '请输入验证码';
            this.register_prompt = true;
            this.register_promptTimer = setTimeout(() => { this.register_prompt = false }, 2000)
           } else if (this.items.passwords === '') {
            this.promptmessage = '请输入密码';
            this.register_prompt = true;
            this.register_promptTimer = setTimeout(() => { this.register_prompt = false }, 2000)
          }
          else {
            this.action = 'register';
            this.param.MobileNo = this.items.registerPhone;
            this.param.Password = this.items.passwords;
            this.param.VerificationCode = this.items.securitycode;
            this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
              Function: 'Register',
              Data: {
                MobileNo: this.items.registerPhone,
                Password: this.items.registerPhone,
                VerifyCode: '1234'
          }
            }).then((res) => {
              this.codeNo = res.data.State; // 状态码
              console.log(this.codeNo);
            });
          }
        },
        getCode() {
          if (!/^1\d{10}$/gi.test(this.items.registerPhone)) {
            this.promptmessage = '请输入正确的手机号 ';
            this.register_prompt = true;
          } else {
            this.disabled = true;
            this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
              Function: 'SendVerifyCode',
              Data: {
                MobileNo: this.items.registerPhone
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
        },
        registerPhoneFocus() {
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
            if (this.$refs.registerPhone.value !== '' && this.$refs.passwords.value !== '' && this.$refs.securitycode.value !== '') {
              this.red = true;
            } else if (this.$refs.registerPhone.value === '' || this.$refs.passwords.value === '' || this.$refs.securitycode.value === '') {
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
</style>
