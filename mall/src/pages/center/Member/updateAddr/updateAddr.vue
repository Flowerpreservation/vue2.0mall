<template>
    <div class="update_addr">
      <div class="u_top">
        <span class="back" @click="back()">取消</span>
        <p >地址</p>
        <span class="keep" @click="keep()" :class="{'back': sut}">保存</span>
      </div>
      <div class="phone_addr">
        <input type="text" v-model="addr" ref="addr">
      </div>
    </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
        return {
          addr: '',
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
          if (this.$refs.addr.value === this.reqMsg.Address) {}
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
                Birthday: '1999-12-14',
                Sex: this.reqMsg.Sex,
                Address: this.$refs.addr.value
              }
            }).then((res) => {
              console.log(res.data.State);
              console.log(res.data.Data);
            });
            history.back(-1);
          }
      }
    },
    mounted () {
      this.$store.dispatch('pageChange', {pageName: 'updateaddr', pageTitle: '地址'});
      console.log(this.$store.state.currentPage);
      this.addr = this.$store.state.memberInf.Address;
    },
    watch: {
        addr: {
            handler(val, oldval) {
                console.log(this.$refs.addr.value);
                if (this.$refs.addr.value === '') {
                    this.sut = false
                } else if (this.$refs.addr.value === this.reqMsg.Address) {
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
