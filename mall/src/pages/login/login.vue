<template>
        <div class="login">
          <div class="login_body">
                <div class="menu_top">
                    <i class="login_left" @click="return_b()"></i>
                    <p>登录</p>
                     <router-link to="/register" class="inner">快速注册</router-link>
                </div>
                <div class="container">
                    <ul>
                      <li><i class="cellphone"></i><input type="text" placeholder="手机号" v-model="items.loginPhone" @focus="phoneFocus()" ref="loginPhone"></li>
                      <li><i class="lock"></i><input type="password" placeholder="密码" v-model="items.loginPwd" @focus="pwdFocus()" ref="loginPwd"></li>
                    </ul>
                  <div class="login_container">
                    <!--<button class="login_button" :class="{red_button:red,click_btn:oldred}" @click="logIn($event)">登录</button>-->
                    <mu-raised-button label="登录" class="demo-raised-button" @click="logIn($event)" :class="{red_button:red,click_btn:oldred}"  primary/>
                    <p class="login_password">
                      <router-link to="/codelogin">验证码登录</router-link>
                      <router-link to="/password">忘记密码</router-link>
                    </p>
                  </div>
                </div>
                <div class="login_bottom">
                      <p>微信登录</p>
                      <span></span>
                </div>
                <div class="login_prompt" v-show="login_prompt">
                    <p>{{prompt_ms}}</p>
                </div>
        </div>
          <transition name="transitionName-slide">
          <router-view></router-view>
          </transition>
        </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
              login_prompt: false,
              red: false,
              oldred: false,
              prompt_ms: '',
              logreq: [],
              logseq: [],
              items: {
                loginPhone: '', // 登录手机号,
                loginPwd: ''     // 密码
              },
              action: '',
              param: {}
            }
      },
        methods: {
          logIn (event) {
            if (!/^1\d{10}$/gi.test(this.items.loginPhone)) {    // !/^1\d{10}$/gi.test(this.items.loginPhone)
              this.login_prompt = true;
              this.prompt_ms = '请输入手机号';
              this.login_promptTimer = setTimeout(() => { this.login_prompt = false }, 2000) // 定时器，两秒后消失
            } else if (this.items.loginPwd === '') {
              this.login_prompt = true;
              this.prompt_ms = '密码不能为空';
              this.login_promptTimer = setTimeout(() => { this.login_prompt = false }, 2000)
            } else {
//              this.action = 'login';
//              this.param.Account = this.items.loginPhone;
//              this.param.Password = this.items.loginPwd;
              this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
                  Function: 'Login',
                  Data: {
                    AccountNo: this.items.loginPhone,
                    Password: this.items.loginPwd
                  }
                }).then((res) => {
              this.logreq = res.data.Data;    // 请求数据
              this.logseq = res.data.State; // 状态码
                console.log(this.logreq);
                console.log(this.logseq);
                if (this.logseq.Code === 1) {
                  this.login_prompt = true;
                  this.prompt_ms = '请求成功';
                  sessionStorage.No = this.logreq.MemberNo;  // 本地存储（浏览器关闭后失效）全局变量存储会员编号
                  console.log(sessionStorage.No);
                  this.login_promptTimer = setTimeout(() => { this.login_prompt = false }, 500);
                  this.$router.push({path: '/center', query: {No: this.logreq.MemberNo}});
                } else {
                  this.login_prompt = true;
                  this.prompt_ms = '输入有误';
                  this.login_promptTimer = setTimeout(() => { this.login_prompt = false }, 2000)
                }
              });
            }
          },
          pwdFocus() {
            this.login_prompt = false;
          },
          phoneFocus() {
            this.login_prompt = false;
          },
          return_b() {
              history.back(-1)
          }
          },
          watch: {    // 监听输入栏的值
            items: {
              handler(val, oldval) {
//              console.log(this.$refs.loginPhone.value);
//              console.log(this.$refs.loginPwd.value);
              if (this.$refs.loginPwd.value !== '' && this.$refs.loginPhone.value !== '') {
                this.red = true;
              } else if (this.$refs.loginPwd.value === '' || this.$refs.loginPhone.value === '') {
                this.red = false;
              }
            },
            deep: true
          }
      }
    }
</script>
<style>
@import "css/login.css";
</style>
