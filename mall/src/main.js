// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios';
import Mint from 'mint-ui';
import App from './App';
import routes from './router';
import store from './store';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题
import VueScroller from 'vue-scroller';
import wx from 'weixin-js-sdk'
Vue.use(wx);
Vue.use(VueScroller);
Vue.use(MuseUI);
Vue.use(Mint);
Vue.prototype.$http = axios;
Vue.use(Element);
Vue.config.productionTip = false;
Vue.use(Router);
const router = new Router({
	routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
