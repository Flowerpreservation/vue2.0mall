import * as types from './mutation-types';

export default {
	pageChange ({commit, state}, toptname) {
		if (!toptname) {
			return;
		}
		commit(types.CHANGE_TOP, toptname);
	},
  selectChange ({commit, state}, current) {
    if (!current) {
      return;
    }
    commit(types.SELECT_CHANGE, current);
  },
  memberChange ({commit, state}, select) {
    if (!select) {
      return;
    }
    commit(types.MEMBER_CHANGE, select);
  },
  orderChange ({commit, state}, selected) {
	  if (!selected) {
	    return;
    }
    commit(types.ORDER_CHANGE, selected);
  },
  addrChange ({commit, state}, revise) {
    if (!revise) {
      return;
    }
    commit(types.ADDRESS_CHANGE, revise);
  },
  msgChange ({commit, state}, member) {
    if (!member) {
      return;
    }
    commit(types.MES_CHANGE, member);
  }
}
