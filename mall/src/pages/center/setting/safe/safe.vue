<template>
    <div class="safe">
      <!--顶部-->
      <top></top>
      <div class="safe_container">
      <div class="safe_modify">
        <div class="safe_body">
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
              <input type="password" placeholder="设置新密码，6-20位" v-model="items.passwords" ref="passwords" @focus="registerPhoneFocus()">
            </li>
          </ul>
        </div>
      </div>
      <div class="update_out">
        <mu-raised-button label="修改" class="demo-raised-button" @click="update($event)"  primary/>
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
  import top from '../../../../components/malltop/top.vue';
  export default {
    components: {
        top
    },
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
      update(event) {
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
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'safe', pageTitle: '修改密码'});
      console.log(this.$store.state.currentPage);
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
.safe{
  position:fixed;
  top:0;
  left: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  background: #eee;
}
.safe_container{
  position:fixed;
  top:50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
  .safe_body{
    padding: 30px 20px;
  }
.update_out{
  margin-top: 20px;
  padding: 0 20px;
}
  .register_code{
    display: flex;
  }
.register_code .code_input{
    flex: 1 1 auto;
}
.register_code .code{
  margin-right: 5px;
  flex: 0 0 24px;
}
.safe_body ul li{
  padding: 10px 5px;
}
.safe_body ul li input {
  font-size:16px;
  line-height: 24px;
  border: 0;
  outline: none;
}
.safe_body ul li ::-webkit-input-placeholder{
  font-size: 16px;
  line-height: 24px;
  text-align: left;
}
.safe_body ul li ::-moz-placeholder{
  font-size: 16px ;
  line-height: 24px;
  text-align: left;
}
.safe_body ul li :-ms-input-placeholder{
  font-size: 16px ;
  line-height: 24px;
  text-align: left;
}
  .demo-raised-button{
    width: 100%;
  }
 .mu-raised-button-primary{
    background: #FA5037!important;
  }
</style>
