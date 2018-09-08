<template>
          <div class="member_user">
            <div class="u_top">
              <span class="go_back el-icon-arrow-left" @click="go_back()"></span>
              <p >性别</p>
            </div>
            <div class="sex">
                <ul >
                  <li class="sex_select" v-for="(item, index) in sex" @click="select_sex(item)">
                    <span class="select_sex">{{item.sex}}</span>
                    <i class="select_icon" v-bind:class="{'select_i': active == item}"></i>
                  </li>
                </ul>
            </div>
          </div>
</template>
<script>
  export default {
    components: {
    },
    data() {
        return {
            sex: [
              {status: 0, sex: '女'},
              {status: 1, sex: '男'},
              {status: 2, sex: '保密'}
            ],
            really: '',
            sexInfo: '',
            active: '',
            reqMsg: []
        }
    },
    methods: {
      go_back() {
          history.back(-1)
      },
      select_sex(item) {
          this.active = item;
          console.log(item.status);
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
              Sex: item.status,
              Address: this.reqMsg.Address
            }
          }).then((res) => {
            console.log(res.data.State);
            console.log(res.data.Data);
          });
        history.back(-1);
      }
    },
    mounted () {
      this.sexInfo = this.$store.state.memberInf.Sex;
//      console.log(this.sexInfo);
      this.reqMsg = this.$store.state.memberInf;
      this.currentIndex = this.sexInfo;
      this.$store.dispatch('pageChange', {pageName: 'updateuser', pageTitle: '性别'});
      console.log(this.$store.state.currentPage);
    }
  }
</script>
<style>
@import "../css/member.css";
</style>
