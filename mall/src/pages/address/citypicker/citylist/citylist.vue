<template>
  <div class="city-list" >
    <!--顶部-->
    <top></top>
    <div class="city-container" ref="cityWrapper">
    <ul class="city-wrapper" >
      <li class="select-list" v-for="item in cities"  @click="citySelected(item)">
        <router-link to="/district">
        <p>{{item.name}}</p><i class="el-icon-arrow-right"></i>
        </router-link>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../../../components/malltop/top.vue';
    export default {
        components: {
            top
        },
      data() {
            return {
                province: [],
                provincename: [],
                cities: [],
                addname: [],
                addphone: []
            }
      },
      created() {
          this.$nextTick(() => {
              this._Initscroll()
          })
      },
      methods: {
        citySelected(item) {
            this.$store.dispatch('selectChange', {DetailAdd: this.province, city: item, district: ''});  // 取到item的值 存储到store中 citylist为数组 在citylist中接收
        },
        _Initscroll() {
            if (!this.menuscroll) {
                this.menuscroll = new BScroll(this.$refs.cityWrapper, {
                      click: true,
                      probeType: 3
                })
            } else {
              this.menuscroll.refresh();
            }
        }
      },
      mounted() {
        this.$store.dispatch('pageChange', {pageName: 'citylist', pageTitle: '选择市'});
        console.log(this.$store.state.currentPage);
        this.province = this.$store.state.DetailAdd;   // 接收来自list的对象值
        this.cities = this.$store.state.DetailAdd.city;
        console.log(this.province);
        console.log(this.cities);
        this.member = this.$store.state.addName;
        this.addphone = this.$store.state.addPhone;
      }
//      computed: {
//        list () {
//          return this.$store.state.citylist; // 接收来自list的对象值
//        }
//      }
    }
</script>
<style>
.city-wrapper{
  position: fixed;
  width: 100%;
  padding-bottom: 44px;
  top:44px;
  left: 0;
  overflow: hidden;
}
.city-container{
  position: fixed;
  width: 100%;
  height: 100%;
  padding-bottom: 44px;
  top:44px;
  left: 0;
}
.city-list{
  position: fixed;
  top:44px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
