import * as types from './mutation-types';

export default {
	[types.CHANGE_TOP] (state, toptname) {
    state.centerTop = toptname.pageTitle;     // 个人中心顶部等于当前的页面标题
    state.currentPage = toptname.pageName;    // 当前页面名称等于topname的pageName名称
	},
  [types.SELECT_CHANGE] (state, current) {
    state.DetailAdd = current.DetailAdd;
    state.provinces = current.provinces;      // 省选择
    state.city = current.city;                // 城市选择
    state.district = current.district;        // 区域选择
    state.selectList = current.selectList;
    state.currentProduct = current.currentProduct;
  },
  [types.MEMBER_CHANGE] (state, select) {
    state.memberInf = select.memberInf;
    state.addPhone = select.addPhone;
    state.addName = select.addName;
  },
  [types.ORDER_CHANGE] (state, selected) {
    state.memberNo = selected.memberNo;
    state.message = selected.message;
    state.data = selected.data;
    state.goodsCount = selected.goodsCount;
    state.goodDetail = selected.goodDetail;
  },
  [types.ADDRESS_CHANGE] (state, revise) {
    state.raddr = revise.raddr;
    state.membername = revise.membername;
    state.orderMsg = revise.orderMsg;
    state.remark = revise.remark;
    state.countS = revise.countS;
    state.tPrice = revise.tPrice;
  },
  [types.MES_CHANGE] (state, member) {
    state.phoneN = member.phoneN;
  }
}
