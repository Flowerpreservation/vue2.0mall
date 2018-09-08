<template>
      <div class="center">
        <!--顶部-->
        <top></top>
        <div class="center_wrapper" ref="centerWrapper">
        <div class="center_contanier">
                <div class="center_massge">
                      <div class="center_name">
                        <dl>
                          <dt class="head_icon">
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <span class="center_i" @click="my_center()"></span>
                            <span class="setting" @click="setting()"></span>
                          </dt>
                            <dd class="center_n">
                              <p to="/login" @click="go_login()" :disabled="disabled"><span class="register_btn" >{{memberName}}</span></p>
                            </dd>
                        </dl>
                        <div class="cneter_score">
                          <router-link to="/integral">
                          <p>
                            <i class="integral"></i>
                            <span>积分</span>
                          </p>
                          </router-link>
                          <router-link to="/collection">
                          <p>
                            <i class="Collection"></i>
                            <span>收藏</span>
                          </p>
                          </router-link>
                            <router-link to="/aftersale">
                          <p>
                            <i class="Aftersale"></i>
                            <span>售后</span>
                          </p>
                            </router-link>
                        </div>
                        <!--<router-link to="/setting" class="setting_link">-->
                        <!--<span class="setting"></span>-->
                        <!--</router-link>-->
                      </div>
                </div>
          <!--订单-->
              <div class="myorder">
                    <ul>
                      <li class="order_center">
                        <router-link to="/myorders">
                        <span></span>
                        <i class="el-icon-arrow-right"></i>
                        <p>我的订单</p>
                        </router-link>
                      </li>

                      <li class="order_service">
                        <router-link to="/pending">
                        <dl>
                          <dt>
                           <span class="paring_icon">
                            <i class="paring"></i>
                            <span class="count">2</span>
                             </span>
                          </dt>
                            <dd>待付款</dd>
                        </dl>
                        </router-link>

                        <router-link to="/forship">
                        <dl>
                          <dt>
                           <span class="paring_icon">
                            <i class="ship"></i>
                            <span class="count" style="display:none">2</span>
                             </span>
                          </dt>
                          <dd>待发货</dd>
                        </dl>
                        </router-link>

                        <router-link to="/tobereceived">
                        <dl>
                          <dt>
                           <span class="paring_icon">
                            <i class="deliver"></i>
                            <span class="count" style="display:none">2</span>
                             </span>
                          </dt>

                          <dd>待收货</dd>
                        </dl>
                        </router-link>

                        <router-link to="/beevaluated">
                        <dl>
                          <dt>
                           <span class="paring_icon">
                            <i class="receipt"></i>
                            <span class="count" style="display:none">2</span>
                             </span>
                          </dt>
                          <dd>待评价</dd>
                        </dl>
                        </router-link>

                      </li>
                    </ul>
              </div>
          <!--主体-->
            <div class="center_body">
                    <ul>
                      <li>
                      <router-link to="/voucher">
                        <i class="el-icon-arrow-right"></i>
                        <span></span>
                        <p>我的优惠券</p>
                      </router-link >
                      </li>
                      <li>
                      <router-link to="/wallet">

                        <i class="el-icon-arrow-right"></i>
                        <span></span>
                        <p>我的钱包</p>
                      </router-link>
                      </li>
                      <li>
                      <router-link to="/comment">
                        <i class="el-icon-arrow-right"></i>
                        <span></span>
                        <p>我的评论</p>
                      </router-link>
                      </li>
                      <li>
                      <router-link to="/address">
                        <i class="el-icon-arrow-right"></i>
                        <span></span>
                        <p>我的地址</p>
                      </router-link>
                      </li>
                      <li>
                      <router-link to="/service">
                        <i class="el-icon-arrow-right"></i>
                        <span></span>
                        <p>客服与帮助</p>
                      </router-link>
                      </li>
                      <li class="li_opinion">
                      <router-link to="/opinion">
                        <span></span>
                        <i class="el-icon-arrow-right"></i>
                        <p>意见反馈</p>
                      </router-link>
                      </li>
                    </ul>
            </div>
        </div>
        </div>
        <!--底部-->
        <v-menu></v-menu>
        <transition name="router-fade">
          <keep-alive>
          <router-view ></router-view>
          </keep-alive>
        </transition>
      </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import top from '../../components/malltop/top.vue'
  import menu from '../../components/navmenu/menu'
//  import wx from 'weixin-js-sdk'
    export default {
      components: {
        'v-menu': menu,
        top
      },
      data () {
        return {
          stateNo: [],
          stateDt: [],
          stateDtd: [],
          stateDtdNo: [],
          Member: '',
          memberName: '',
          disabled: false
        }
      },
      created() {
          console.log(sessionStorage.No);
        if (sessionStorage.No) {
          this.$http.post('http://open.58youyu.cn/CRM/Member/Service.aspx', {
            Function: 'QueryMember',
            Data: {
              MemberNo: sessionStorage.No
            }
          }).then((res) => {
            this.stateNo = res.data.State; // 状态码
            this.stateDt = res.data.Data; // 状态码
//                console.log(this.stateNo);
//                console.log(this.stateDt);
            this.memberName = this.stateDt.Name;
            this.$router.push('/center');
          });
          this.$nextTick(() => {
            this._initScroll();
          });
        } else {
          this.$nextTick(() => {
            this._initScroll();
            this.memberName = '登录/注册';
//                this.$router.push('/login');
          });
        }
        this.$store.dispatch('pageChange', {pageName: 'center', pageTitle: '个人中心'});
        console.log(this.$store.state.currentPage);
      },
      methods: {
        _initScroll() {
          if (!this.munescroll) {
            this.munescroll = new BScroll(this.$refs.centerWrapper, {
              click: true,
              probeType: 3
            });
          } else {
            this.centerWrapper.refresh();
          }
        },
        go_login(event) {
          if (sessionStorage.No) {
            console.log(sessionStorage.No);
          } else if (sessionStorage.No === undefined) {
            this.$router.push('/login');
          }
          console.log(sessionStorage.No)
        },
        my_center() {
          if (sessionStorage.No) {
            this.$router.push('/member');
          } else {
          }
        },
        setting() {
          this.$router.push('/setting');
        }
      },
        mounted () {
          this.$store.dispatch('pageChange', {pageName: 'center', pageTitle: '个人中心'});
//          console.log(this.$store.state.currentPage);
        }
    }
</script>
<style>
@import "css/center.css";
</style>
