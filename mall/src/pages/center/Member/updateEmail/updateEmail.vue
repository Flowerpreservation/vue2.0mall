<template>
  <div class="member_email">
    <div class="u_top">
      <span class="back" @click="back()">取消</span>
      <p >邮箱</p>
      <span class="keep" @click="keep()" :class="{'back': sut}">保存</span>
    </div>
    <div class="phone_email">
      <input type="text" v-model="email" ref="email">
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
        return {
          email: '',
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
//        console.log(this.reqMsg.Address);
//        console.log(this.$refs.email.value);
        if (this.$refs.email.value === this.reqMsg.Email) {}
        else {
          this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
            Function: 'UpdateMember',
            Data: {
              No: '10000001',
              Name: this.reqMsg.Name,
              Nickname: 'aaa',
              Image: '../static/img/mall/center/default_avatar.png',
              MobileNo: this.reqMsg.MobileNo,
              Email: this.$refs.email.value,
              Birthday: '1999-12-14',
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
      this.$store.dispatch('pageChange', {pageName: 'updateemail', pageTitle: '邮箱'});
      console.log(this.$store.state.currentPage);
      this.email = this.$store.state.memberInf.Email;
    },
    watch: {
      email: {
        handler(val, oldval) {
          console.log(this.$refs.email.value);
          if (this.$refs.email.value === '') {
              this.sut = false
          } else if (this.$refs.email.value === this.reqMsg.Email) {
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
