<template>
  <div class="comment">
    <!--顶部-->
    <top></top>
    <div class="comment_wrapper" ref="commentWrapper">
    <div class="comment_container">
                <ul>
                  <li class="customer_comment" v-for="item in comments" @click="deleteit(item, $event)">
                  <div  class="comment_inner" ref="abc" >
                    <div class="customer_comment_left" >
                      <div class="avatar">
                        <img  :src="nameicno" style="width: 40px;height: 40px;" >
                      </div>
                      <div class="customer_detail">
                        <h4 class="customer_name">
                          <b>{{item.Name | filterName}}</b>
                        </h4>
                        <h5><span><i>{{item.date}}</i><font>{{item.time}}</font></span></h5>
                        <p>{{item.content}}</p>
                      </div>
                      <div class="prodectimg">
                        <img v-for="item in prodectimg" :src="item" style="width: 50px;height:50px;">
                      </div>
                    </div>
                    <transition name="router-slide">
                    <div class="delete"  :class="{'red_cover':item.red}" ref="nana" @click="deletecomment(item)">
                      <p>&nbsp;</p>
                      <p>删除</p>
                      <p>&nbsp;</p>
                     </div>
                    </transition>
                    </div>
                 </li>
                </ul>
    </div>
    </div>
    <!--删除遮罩-->
    <transition name="out">
      <div class="delete_bg" v-show="delete_cover">
        <div class="delete_wh">
          <h4>确认要删除该评论么?</h4>
          <p>
            <a class="alert_left" @click="delete_n">取消</a>
            <a class="alert_right" @click="delete_y(item)">确认</a>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import top from '../../../components/malltop/top.vue'
  export default {
    components: {
      top
    },
    data() {
        return {
            item: [],
            nameicno: ['./static/img/mall/header.png'],
            prodectimg: ['./static/img/mall/test.jpg', './static/img/mall/tea.jpg', './static/img/mall/test.jpg'],
//            delete_comment: false,
            comments: [],  // 评论
            delete_cover: false,
            x: 0,
            y: 0,
            vh: '',
            o: '',
            dh: '',
            ditem: [],
            red: false
             }
         },
        created() {
            this.$http.get('static/data.json').then((res) => {
                this.comments = res.data.comment;
                console.log(this.comments);
              this.$nextTick(() => {
                   this._initScroll();
              })
            })
                  },
         filters: {         // 过滤姓名显示
           filterName(value) {
//              value = value.toString();
              value = value.split('');    // 转换为数组
//            value = value.slice(1, 2);
             if (value.length === 3) {    // 判断字符长度
               value.splice(1, 1, '*');     // 设置隐藏星号
             } else {
               value.splice(1, 2, '*');
             }
                 // 把第二个字替换为*
              value = value.join('');     // 拼接为字符串
               return value;
         }
         },
        methods: {
            deleteit(item, e) {
//              this.delete_comment = !this.delete_comment;
//              console.log(item);
              this.x = e.screenX;
              console.log(this.x);
//              if (this.x > 200) {
              if (typeof item.red === 'undefined') {     // 添加属性
                this.$set(item, 'red', true);
              } else {
                item.red = !item.red;
              }
//              }
            },
            deletecomment(item) {
                this.delete_cover = true;
                this.ditem = item;
            },
            delete_n() {
            this.delete_cover = false;
            },
            delete_y() {
            let index = this.comments.indexOf(this.ditem);
            this.comments.splice(index, 1);
            this.delete_cover = false;
            console.log(index);
          },
          _initScroll() {
                this.menuscroll = new BScroll(this.$refs.commentWrapper, {
                    click: true,
                    probeType: 3
                })
          }
          },
          mounted () {
            this.$store.dispatch('pageChange', {pageName: 'comment', pageTitle: '评论'});
            console.log(this.$store.state.currentPage);
        }
  }
</script>
<style>
  /*删除曾动画*/
  .out-enter{
    transform: translate3d(100%,0,0);
  }
  .out-enter-active{
    transition: all .3s linear;
  }
  .out-leave-active{
    transform: translate3d(100%,0,0);
  }
  .outer-leave-active{
    transform: translate3d(0,100%,0);
  }
  .comment{
    position: fixed;
    height: 100%;
    width: 100%;
    background: #eee;
    top:0;
    left: 0;
    z-index: 600;
  }
  .customer_comment{
    padding: 5px 10px;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
  .comment_wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 44px;
  }
  .comment_container{
    width: 100%;
    overflow: hidden;
    padding-bottom: 44px;
  }
  .comment_container ul{
    margin-bottom: 5px;
  }
  .comment_inner{
    display: flex;
  }
  .customer_comment_left{
    overflow-x: hidden;
    flex:1 1 auto;
  }
  .avatar{
    float:left;
    border-radius: 10px;
  }
  .customer_name b{
    font-weight:normal;
    font-size:14px;
    line-height: 20px;
    color:#888;
  }
  .customer_name span{
    float:right;
  }
  .customer_name span i{
    font-style:normal;
    margin-right: 5px;
    font-size:14px;
    line-height: 20px;
    color:#888;
  }
  .customer_name span font{
    font-size:14px;
    line-height: 20px;
    color:#888;
  }
  .customer_detail p{
    font-size: 14px;
    line-height: 18px;
  }
  .prodectimg{
    padding: 10px 0;
    margin-left: 50px;
  }
  .prodectimg img{
    margin-right: 10px;
  }
  .customer_detail{
    margin-left: 50px;
    overflow-x: hidden ;
  }
  /*删除按钮*/
  .delete{
    flex: 0 0 50px;
    align-self: stretch;
    background: #F73536;
    vertical-align: middle;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    display: none;
  }
  .red_cover{
    display: block;
  }
  .delete p{
    font-size: 14px;
    line-height: 14px;
    color:#fff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top:-7px ;   /* 二分之一的height，width */
    margin-left: -14px;
  }
</style>
