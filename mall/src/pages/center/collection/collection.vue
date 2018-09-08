<template>
        <div class="mycollection">
          <top></top>
                    <div class="collection_top" >
                      <p>你收藏了<span>{{collecton_count}}</span>个商品</p>
                      <span @click="clear_item()">{{text}}</span>
                    </div>
                      <div class="collection_wrapper" ref="collectionWrapper">
                     <div class="collection_list">
                      <ul>
                        <li class="collection_item" v-for="item in collection">
                          <img :src="item.Image" alt="">
                          <div class="collection_name">
                              <h4>{{item.data}}</h4>
                              <p>数量&#58;&nbsp;<span>{{item.count}}</span>盒</p>
                                <span>&yen;&nbsp;<font>{{item.Price}}</font></span>
                          </div>
                          <div class="collection_select" v-show="delete_i">
                                  <span>&nbsp;</span>
                                  <i class="collection_radio" @click="select_item(item)" ></i>
                                   <span>&nbsp;</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                      </div>
          <!--底部-->
          <!--<div class="collection_delete" @click="delete_c(item)">-->
            <!--<p>删除</p>-->
          <!--</div>-->
          <!--删除-->
          <div class="delete_bg" v-show="sur">
            <div class="delete_wh">
              <h4>确认要删除该收藏？</h4>
              <p>
                <a class="alert_left" @click="return_it">取消</a>
                <a class="alert_right" @click="makesure">确认</a>
              </p>
            </div>
          </div>

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
                coll: ['./static/img/mall/tea.jpg'],
                text: '编辑',
                checked: false,
                collecton_count: '',
                collection: [],
                sur: false,
                collection_p: [],
                delete_i: false
            }
        },
      created () {
        this.$http.get('static/data.json').then((res) => {
            this.collection = res.data.collection;
            this.collecton_count = res.data.collection.length;
            console.log(this.collection);
          this.$nextTick(() => {
            this._initScroll();
          })
        })
      },
      methods: {
            _initScroll () {
                this.munescroll = new BScroll(this.$refs.collectionWrapper, {
                    click: true
                });
            },
          select_item(item) {
                this.sur = true;
                this.collection_p = this.item;
                console.log(item)
        },
        clear_item() {
                if (this.delete_i === true) {
                  this.text = '编辑'
                } else {
                  this.text = '完成'
                }
                this.delete_i = !this.delete_i;
        },
        return_it() {
          this.sur = false;
        },
        makesure() {
          this.sur = false;
          let index = this.collection.indexOf(this.collection_p);
          this.collection.splice(index, 1);
          this.collecton_count--;
        }
      },
      mounted () {
        this.$store.dispatch('pageChange', {pageName: 'collection', pageTitle: '我的收藏'});
        console.log(this.$store.state.currentPage);
      }
    }
</script>
<style>
  .mycollection{
    position: fixed;
    height: 100%;
    width: 100%;
    top:40px;
    left: 0;
    z-index: 500;
    background: #fff;
  }
  .collection_top{
    padding: 10px;
    display: flex;
    background: #eee;
    justify-content: space-between;
  }
  .collection_top p{
    font-size: 14px;
    line-height: 20px;
    color:#888;
  }
  .collection_top p span{
    color:#ff6060;
  }
  .collection_top span{
    color:#0476FF;
  }
  .collection_wrapper{
    margin-top: 5px;
    position: fixed;
    width: 100%;
    height: 100%;
    top:80px;
    overflow: hidden;
  }
  .collection_list{
    width: 100%;
    overflow: hidden;
    padding-bottom: 80px;
  }
  .collection_list ul{
    margin-bottom: 2px;
  }
  .collection_item{
    background: #fff;
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }
  .collection_item img{
    flex: 0 0 100px;
    width: 100px;
    height: 110px;
    float: left;
  }
  .collection_name{
    flex: 1 1 auto;
    overflow-x: hidden;
    height: 110px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .collection_name h4{
    font-size: 14px;
    line-height: 20px;
  }
  .collection_name p{
    font-size: 12px;
    line-height: 30px;
    color: #888;
  }
  .collection_name p span{
    font-size: 12px;
    line-height: 30px;
    color: #888;
  }
  .collection_name span{
    font-size: 16px;
    line-height: 20px;
    color: #FA5037;
  }
  .collection_radio{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/delete.png") no-repeat;
    background-size: cover;
    background-position: left 0;
  }
  .selected_item{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("../../../../static/img/mall/radio_icon.png") no-repeat;
    background-size: cover;
    background-position: right 0
  }
  .collection_select{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .collection_delete{
    position: fixed;
    width: 100%;
    left: 0;
    bottom:0;
  }
  .collection_delete p{
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    background: #ff7e4d;
  }
</style>
