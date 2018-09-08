<template>
      <div class="member_phone">
        <div class="u_top">
          <span class="back" @click="back()">取消</span>
          <p >手机号</p>
          <span class="keep" @click="keep()" :class="{'back': sut}">保存</span>
        </div>
        <div class="phone_number">
          <input type="text" v-model="phone" ref="phone">
        </div>
      </div>
</template>
<script>
    export default {
        components: {
        },
      data () {
            return {
              phone: '',
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
          if (this.$refs.phone.value === this.reqMsg.MobileNo) {
              console.log(1);
          } else
          { this.$http.post('http://open.58youyu.cn/crm/member/service.aspx', {
              Function: 'UpdateMember',
              Data: {
                No: '10000001',
                Name: '李大明',
                Nickname: this.reqMsg.Nickname,
                Image: '../static/img/mall/center/default_avatar.png',
                MobileNo: this.$refs.phone.value,
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
      mounted() {
        this.$store.dispatch('pageChange', {pageName: 'updatePhone', pageTitle: '手机号'});
        console.log(this.$store.state.currentPage);
        this.phone = this.$store.state.memberInf.MobileNo;
        console.log(this.phone);
      },
      watch: {
            phone: {
                handler(val, oldval) {
                    console.log(this.$refs.phone.value);
                    if (this.$refs.phone.value === '') {
                        this.sut = false
                    } else if (this.$refs.phone.value === this.reqMsg.MobileNo) {
                        this.sut = false
                    } else {
                      this.sut = true
                    }
                },
              deep: true
            }
      }
//      computed: {
//        memberInf () {
//          return this.$store.state.memberInf; // 接收来自updatePhone的对象值
//        }
//      }
    }
</script>
<style>
  .back{
    color: #ff2828;
  }
</style>
