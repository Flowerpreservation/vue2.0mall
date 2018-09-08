 <template>
  <div id="app">
    <transition name="slide-left" mode="out-in" >
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
  #app{
    background: #eee;
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
	}
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .router-slide-enter{
    opacity: 0;
    transition: all .1s linear;
  }
  .router-slide-enter-active {
    transition: all .2s linear;
    transform: translate3d(100%,0,0);
  }
  .router-slide-leave{
    transition: all .2s linear;
  }
  .router-slide-leave-active {
    transition: all .2s linear;
  }
  .child-view {
    position: absolute;
    width:100%;
    transition: all .1s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
