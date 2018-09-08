import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  pageTitle: '', // 当前页面标题名称
  currentPage: '',  // 当前页面的名称
  centerTop: '',     // 个人中心顶部
  shoppingTop: '',       // 购物车顶部
  mallTop: '',           // 熊猫主页
  productList: {},         // 用于储存点击获取的产品
  currentProduct: [],
  selectList: {},            // 用于储存点击后的选择
  addressTop: {},           // 地址头部
  city: {},                //  选择的地址列表
  provinces: {},             // 省份选择
  district: {},            // 区县选择
  DetailAdd: [],          // 选择的地址
  memberInf: [],           // 点击获取会员信息
  addName: [],
  addPhone: [],
  memberNo: [],
  data: [],
  message: [],              // 留言
  raddr: [],
  membername: [],
  memberTitle: [],
  goodsCount: [],          // 提交数量
  goodDetail: [],           // 提交订单的详情
  orderMsg: [],            // 订单提交
  remark: [],               // 留言
  countS: [],                //  数量
  tPrice: [],              // 总金额
  phoneN: []
};
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters: {
	}
});
