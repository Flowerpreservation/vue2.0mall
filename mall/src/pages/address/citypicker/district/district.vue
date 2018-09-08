<template>
  <div class="district-list" >
    <!--顶部-->
    <top></top>
    <div class="district-container" ref="districtWrapper">
    <ul class="district-wrapper">
        <li class="select-list" v-for="item in county" @click="districtSelected(item)">
          <router-link to="/newaddress">
          <p>{{item.name}}</p><i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
    </ul>
    </div>
        <div>
          <span>{{scity}}</span>
          <span>{{ucity}}</span>
          <span>{{fcity}}</span>
        </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../../../components/malltop/top.vue';
    export default {
          components: {
              top
          },
          data () {
              return {
                list: [],
                districtlist: [],
                county: '',
                scity: '',
                ucity: '',
                fcity: '',
                province: '',
                city: [],
                addname: [],
                addphone: []
              }
          },
      created() {
        this.$nextTick(() => {
            this._Initscroll();
        })
      },
          methods: {
            districtSelected (item) {
            this.$store.dispatch('selectChange', {city: this.city, district: item, DetailAdd: this.detaeiladd});  // 取到item的值 存储到store中  在newaddress中接收
            console.log(item);
          },
            _Initscroll() {
                if (!this.menuscroll) {
                    this.menuscroll = new BScroll(this.$refs.districtWrapper, {
                        click: true,
                        probeType: 3
                    })
                } else {
                    this.menuscroll.refresh();
                }
            }
          },
          mounted() {
            this.$store.dispatch('pageChange', {pageName: 'district', pageTitle: '选择区县'});
              console.log(this.$store.state.currentPage);
              this.detaeiladd = this.$store.state.DetailAdd;
              this.city = this.$store.state.city;
              this.county = this.$store.state.city.district;
              console.log(this.city);
              console.log(this.detaeiladd);
              this.member = this.$store.state.addName;
              this.addphone = this.$store.state.addPhone;
          }
    }
</script>
<style>
  .district-container{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    top:44px;
    left:0;
  }
  .district-list{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    top:44px;
    left:0;
  }
  .select-list a{
    display: flex;
    justify-content: space-between;
  }
  .district-wrapper{
    position: fixed;
    width: 100%;
    padding-bottom: 44px;
    top:44px;
    left:0;
    overflow: hidden;
  }
</style>
