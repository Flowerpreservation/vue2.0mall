<template>
  <div class="member_birth">
    <div class="u_top">
      <span class="back" @click="back()">取消</span>
      <p >生日</p>
      <span class="keep" @click="keep()" :class="{'back': sut}">保存</span>
    </div>
    <div class="phone_birth">
      <input type="text" v-model="birth" ref="birth">
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
        return {
            birth: '',
            sut: false,
            reqMsg: []
        }
    },
    created() {
      console.log(this.$store.state.memberInf);
      this.reqMsg = this.$store.state.memberInf;
    },
    methods: {
      back() {
        history.back(-1)
      },
      keep() {
          if (this.$refs.birth.value === this.reqMsg.Birthday) {}
          else {
            this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
              Function: 'UpdateMember',
              Data: {
                No: '10000001',
                Name: this.reqMsg.Name,
                Nickname: this.reqMsg.Nickname,
                Image: '../static/img/mall/center/default_avatar.png',
                MobileNo: this.reqMsg.MobileNo,
                Email: this.reqMsg.Email,
                Birthday: this.$refs.birth.value,
                Sex: this.reqMsg.Sex,
                Address: this.reqMsg.Address
              }
            }).then((res) => {
              console.log(res.data.State);
              console.log(res.data.Data);
            });
            history.back(-1)
          }
      }
    },
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'updatebirth', pageTitle: '生日'});
      console.log(this.$store.state.currentPage);
      this.birth = this.$store.state.memberInf.Birthday;
      console.log(this.birth);
    },
     watch: {
        birth: {
            handler(val, oldval) {
                console.log(this.$refs.birth.value);
                if (this.$refs.birth.value === '') {
                    this.sut = false
                } else if (this.$refs.birth.value === this.reqMsg.Birthday) {
                    this.sut = false
                } else {
                    this.sut = true
                }
            },
          deep: true
        }
     }
  }
</script>
<style>
  .back{
    color: #ff2828;
  }
</style>
