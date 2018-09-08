import App from '../App';
// import index from '../pages/index/index'
import mall from '../pages/mall/mall.vue'; // 商城
import order from '../pages/order/order.vue'; // 订单
import shoppingcar from '../pages/shoppingcar/shoppingcar.vue'; // 购物车
import center from '../pages/center/center.vue'; // 个人中心
import Member from '../pages/center/Member/Member.vue';  // 会员信息
import updateName from '../pages/center/Member/updateName/updateName.vue'
import updateUser from '../pages/center/Member/updateUser/updateUser.vue'
import updateEmail from '../pages/center/Member/updateEmail/updateEmail.vue'
import updateBirth from '../pages/center/Member/updateBrith/updateBirth.vue'
import updatePhone from '../pages/center/Member/updatePhone/updatePhone.vue'
import updateAddr from '../pages/center/Member/updateAddr/updateAddr.vue'
import setting from '../pages/center/setting/setting.vue'; // 设置
import safe from '../pages/center/setting/safe/safe.vue';
import phoneNumber from '../pages/center/setting/phoneNumber/phoneNumber.vue';
import integral from '../pages/center/integral/ integral.vue'; // 积分
import collection from '../pages/center/collection/collection.vue'; // 收藏
import aftersale from '../pages/center/aftersale/aftersale.vue'; // 售后
import unpaid from '../pages/center/myorder/unpaid/unpaid.vue'; // 个人中心-我的订单
import myorders from '../pages/center/myorder/myorders.vue'; // 个人中心-我的订单
import allorders from '../pages/center/myorder/allorders/allorder.vue'; // 全部订单
import pending from '../pages/center/myorder/pending/pending.vue'; // 待付款订单
import forship from '../pages/center/myorder/forship/forship.vue'; // 待发货订单
import tobereceived from '../pages/center/myorder/tobereceived/tobereceived.vue';// 待收货订单
import beevaluated from '../pages/center/myorder/beevaluated/beevaluated.vue'; // 待评价订单
import par from '../pages/par/par.vue'; // 待评价订单
import voucher from '../pages/center/voucher/voucher.vue'; // 优惠券
import wallet from '../pages/center/wallet/wallet.vue'; // 钱包
import comment from '../pages/center/comment/comment.vue'; // 评论
import address from '../pages/address/address.vue'; // 地址
import provinces from '../pages/address/provincepicker/provinces.vue'
import cities from '../pages/address/provincepicker/cities.vue'
import districtes from '../pages/address/provincepicker/districtes.vue'
import newaddress from '../pages/address/newaddress/newaddress.vue'; // 新地址
import revise from '../pages/address/revise/revise.vue'; // 新地址
import citypicker from '../pages/address/citypicker/citypicker.vue'; // 选择地址
import citylist from '../pages/address/citypicker/citylist/citylist.vue'; // 选择城市
import district from '../pages/address/citypicker/district/district.vue'; // 选择区县
import service from '../pages/center/service/ service.vue'; // 客服
import opinion from '../pages/center/opinion/ opinion.vue'; // 意见
import specialty from '../pages/mall/specialty/specialty.vue';
import specialtyDetail from '../pages/mall/specialty/specialtyDetail/specialtyDetail.vue';
import login from '../pages/login/login.vue'; // 登录页面
import register from '../pages/login/register/register.vue';  // 注册页面
import codelogin from '../pages/login/codelogin/codelogin.vue';  // 注册页面
import password from '../pages/login/password/password.vue';  // 注册页面
export default [{
      path: '/',
      component: App,
      children: [
      // 如果地址为空时跳转到首页
      	{
      		path: '',
      		redirect: '/mall'
      	},
      	{
      		path: '/mall',
      		component: mall
      	},
        // 商城
        {
          path: '/mall',
          component: mall
        },
        // 特产
        {
          path: '/specialty',
          component: specialty,
          children: [         // 特产详情
            {
              path: '/specialtyDetail',
              component: specialtyDetail
            }
          ]
         },
            // 订单
          {
              path: '/order',
              component: order
          },
        // 登录
        {
              path: '/login',
              component: login,
              // 注册
              children: [
            {
              path: '/codelogin',
              component: codelogin
            },
            {
              path: '/password',
              component: password
            },
            {
              path: '/register',
              component: register
            }
          ]
        },
        // 地址
         {
          path: '/address',
          component: address
         },
         {
          path: '/newaddress',
          component: newaddress,
           children: [
             {
               path: '/cities',
               component: cities
             },
             {
               path: '/districtes',
               component: districtes
             },
             {
               path: '/provinces',
               component: provinces
             }
           ]
         },
         {
          path: '/citypicker',
          component: citypicker
           },
            {
              path: '/citylist',
              component: citylist
             },
            {
             path: '/district',
             component: district
            },
            {
              path: '/revise',
              component: revise
            },
        // 购物车
            {
              path: '/shoppingcar',
              component: shoppingcar
            },
       // 支付
          {
          path: '/par',
          component: par
        },
        // 个人中心
        {
          path: '/center',
          component: center
        },
            // 我的订单
            {
              path: '/myorders',
              component: myorders,
              redirect: '/allorders',
              children: [
                // 所有订单
                {
                  path: '/allorders',
                  component: allorders
                },
                // 待付款订单
                {
                  path: '/pending',
                  component: pending
                },
                // 待发货订单
                {
                  path: '/forship',
                  component: forship
                },
                // 待收货订单
                {
                  path: '/tobereceived',
                  component: tobereceived
                },
                // 待评价订单
                {
                  path: '/beevaluated',
                  component: beevaluated
                }
              ]
            },
            {
              path: '/unpaid',
              component: unpaid
            },
            // 待付款订单
            {
              path: '/pending',
              component: pending,
              children: [
                {
                  path: '/par',
                  component: par
                }
              ]
            },
            // 待发货订单
            {
              path: '/forship',
              component: forship
            },
            // 待收货订单
            {
              path: '/tobereceived',
              component: tobereceived
            },
            // 待评价订单
            {
              path: '/beevaluated',
              component: beevaluated
            },
            // 设置
            {
              path: '/setting',
              component: setting
            },
            {
              path: '/safe',
              component: safe
            },
            {
              path: '/phoneNumber',
              component: phoneNumber
            },
            // 积分
            {
              path: '/integral',
              component: integral
            },
            // 收藏
            {
              path: '/collection',
              component: collection
            },
            // 售后
            {
              path: '/aftersale',
              component: aftersale
            },
            // 优惠券
            {
              path: '/voucher',
              component: voucher
            },
            // 钱包
            {
              path: '/wallet',
              component: wallet
            },
            // 评论
            {
              path: '/comment',
              component: comment
            },
            // 客服
            {
              path: '/service',
              component: service
            },
            // 意见
            {
              path: '/opinion',
              component: opinion
            },
        // 会员信息
        {
          path: '/Member',
          component: Member
        },
        {
          path: '/updateName',
          component: updateName
        },
        {
          path: '/updateUser',
          component: updateUser
        },
        {
          path: '/updatePhone',
          component: updatePhone
        },
        {
          path: '/updateEmail',
          component: updateEmail
        },
        {
          path: '/updateBrith',
          component: updateBirth
        },
        {
          path: '/updateAddr',
          component: updateAddr
        }
      ]
  }]
