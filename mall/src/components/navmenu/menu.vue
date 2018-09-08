<template>
	<div class="menu-wrapper">
  		<ul>
        <router-link tag="li" to="/mall" class="menu-item" ><i class="icon-home"></i><span>首页</span></router-link>
        <li tag="li" to="/login" class="menu-item" @click="checkLogin()"><i class="icon-file-text2"></i><span>订单</span></li>
        <router-link tag="li" to="/shoppingcar" class="menu-item "><i class="icon-cart"></i><span>购物车</span></router-link>
        <router-link tag="li" to="/center" class="menu-item "><i class="icon-user"></i><span>我的</span></router-link>
  		</ul>
  	</div>
</template>

<script>
	export default {
	    data() {
	        return {
        }
      },
      methods: {
      checkLogin() {
          if (sessionStorage.No) {
            this.$router.push('/allorders');
          } else if (sessionStorage.No === undefined) {
            this.$router.push('/login');
          }
        console.log(sessionStorage.No);
      }
    }
  }
</script>

<style>
	.menu-wrapper{
		width: 100%;
		height: 44px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 500;
		background: #fff;
	}
	.menu-wrapper ul{
		width: 100%;
		height: 100%;
		display: flex;
		font-size: 0;
		border-top: 1px solid #dfdfdf;
	}

	.menu-wrapper ul .menu-item:last-child{
		border-right: 0;
	}
  .menu-wrapper .router-link-active i,.menu-wrapper .router-link-active span{
    color:#ff6060!important;
  }
  .menu-item{
    display: flex;
    flex-direction:column ;
    flex: 1;
    padding: 4px 0;
    font-size: 14px;
    color:#aaa;
    text-align: center;
  }
  .menu-item i{
    font-size: 20px;
    line-height: 20px;
    color:#aaa;
  }
  .menu-item span{
    font-size: 14px;
    line-height: 22px;
    color:#aaa;
  }
</style>
