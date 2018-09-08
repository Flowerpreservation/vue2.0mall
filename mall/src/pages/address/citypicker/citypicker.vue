<template>
          <div class="citypicker-wrapper">
            <!--顶部-->
            <top></top>
              <div class="province-container" ref="provinceWrappper">
                  <ul class="province-wrapper" >
                        <li class="select-list" v-for="item in provincename" @click="provinceSelected(item)">
                          <router-link to="citylist">
                          <p>{{item.name}}</p><i class="el-icon-arrow-right"></i>
                          </router-link>
                        </li>

                  </ul>
              </div>
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
          </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../../components/malltop/top.vue';
    export default {
        components: {
            top
        },
      data() {
            return {
              cityShow: false,
              provincename: [],
              selectedcity: [],
              addname: [],
              addphone: []
            }
      },
      created() {
              this.$http.get('static/city.json').then((res) => {
              this.provincename = res.data.province;
              this.$nextTick(() => {
                  this._Initscroll();
              });
              console.log(this.provincename);
//            this.city = this.province[0].city;
//            console.log(this.city);
      });
      },
        methods: {
          provinceSelected(item) {
            this.selectedcity = item;
//            console.log(this.selectedcity);
            this.$store.dispatch('selectChange', {DetailAdd: item, city: '', district: ''}); // 取到item的值 存储到store中 provinces 在citylist中接收
            console.log(this.$store.dispatch.DetailAdd);
        },
          _Initscroll() {
            if (!this.munescroll) {
              this.munescroll = new BScroll(this.$refs.provinceWrappper, {
                click: true,
                probeType: 3
              });
            } else {
              this.menuscroll.refresh();
            }
          }
      },
        mounted () {
        this.$store.dispatch('pageChange', {pageName: 'citypicker', pageTitle: '选择省份'});
        console.log(this.$store.state.currentPage);
          this.member = this.$store.state.addName;
          this.addphone = this.$store.state.addPhone;
      }
    }
</script>
<style>
  .citypicker-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: #fff;
  }
  .province-container{
    position: fixed;
    width: 100%;
    height: 100%;
    top:44px;
    left: 0;
    background: #fff;
  }
  .province-wrapper{
    position: fixed;
    width: 100%;
    padding-bottom: 44px;
    top:44px;
    left: 0;
    overflow: hidden;
  }
  .select-list a{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid rgba(243,243,243,0.8);
  }
  .select-list p{
    font-size: 16px;
    line-height: 20px;
  }
  .select-list i{
    font-size: 14px;
    line-height: 20px;
    color: #888;
  }

</style>
