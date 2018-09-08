<template>
  <div class="member_name">
    <!--头部-->
    <div class="u_top">
      <span class="back" @click="back()">取消</span>
      <p >昵称</p>
      <span class="keep" @click="keep()" :class="{'back': sut}">保存</span>
    </div>
      <div class="member_update_name">
        <input type="text" v-model="ala" ref="ala">
      </div>
</div>
</template>
<script>
  export default {
    components: {
    },
    data () {
        return {
            ala: '',
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
          if (this.$refs.ala.value === this.reqMsg.Name) {
              console.log(1)
          } else {
            this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
              Function: 'UpdateMember',
              Data: {
                No: '10000001',
                Name: this.reqMsg.Name,
                Nickname: this.$refs.ala.value,
                Image: '../static/img/mall/center/default_avatar.png',
                MobileNo: this.reqMsg.MobileNo,
                Email: this.reqMsg.Email,
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
      this.$store.dispatch('pageChange', {pageName: 'updatename', pageTitle: '昵称'});
      console.log(this.$store.state.currentPage);
      this.ala = this.$store.state.memberInf.Nickname;
    },
    watch: {
        ala: {
            handler(val, oldval) {
                console.log(this.$refs.ala.value);
                if (this.$refs.ala.value === '') {
                    this.sut = false
                } else if (this.$refs.ala.value === this.$refs.ala.value) {
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
  @import "../css/member.css";
  .back{
    color: #ff2828;
  }
</style>
