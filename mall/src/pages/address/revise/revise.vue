<template>
        <div class="revise">
            <top></top>
          <div class="address_detail">
            <ul>
              <li><label for="">收货人</label> <input type="text" placeholder="姓名" v-model="items.name" ref="name"></li>
              <li><label for="">联系方式</label>  <input type="number" placeholder="手机号码" v-model="items.phone" ref="phone"></li>
              <li class="detail_row">
                <label for="">地&nbsp;址</label>
                <textarea name="" id=""  rows="3" v-model="items.daddr" ref="daddr"></textarea>
                <!--<span></span>-->
              </li>
            </ul>
          </div>
          <div class="get_address">
            <p @click="sure_revise()">确定</p>
          </div>
        </div>
</template>
<script>
  import top from '../../../components/malltop/top.vue';
    export default {
        components: {
            top
        },
      data () {
            return {
                items: {
                    name: '1',
                    phone: '2',
//                    addr: '3',
                    daddr: ''
                },
                reviseaddress: [],
                addressN: [],
                addname: [],
                addphone: [],
                detailaddr: [],
                addrdefL: ''
            }
      },
      methods: {
        sure_revise() {
            if (sessionStorage.No) {
              this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
                Function: 'SaveAddress',
                Data: {
                  MemberNo: sessionStorage.No,
                  ID: this.addressN,
                  Address: this.$refs.daddr.value,
                  Linkman: this.$refs.name.value,
                  MobileNo: this.$refs.phone.value,
                  IsDefault: this.addrdefL
                }
              }).then((res) => {
                console.log(res.data.State);
                console.log(res.data.Data);
              });
            } else {
            }
              history.back(-1)
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'revise', pageTitle: '修改地址'});
        console.log(this.$store.state.currentPage);
        console.log(this.$store.state.raddr);
        this.reviseaddress = this.$store.state.raddr;
        this.items.name = this.reviseaddress.Linkman;
        this.items.phone = this.reviseaddress.MobileNo;
//        this.items.addr = this.reviseaddress.Address;
        this.items.daddr = this.reviseaddress.Address;
        this.addressN = this.reviseaddress.ID;
        this.addrdefL = this.reviseaddress.IsDefault;
        console.log(this.addressN);
        console.log(this.addrdefL)
      },
      watch: {                            //  监听input值
        items: {
          handler: function (val, oldval) {
            this.addname = this.$refs.name.value;
            console.log(this.addname);
            this.addphone = this.$refs.phone.value;
            console.log(this.addphone);
            this.detailaddr = this.$refs.daddr.value;
            console.log(this.detailaddr)
          },
          deep: true
        }
      }
    }
</script>
<style>

</style>
