<template>
  <div>
      <HeadNav/>
        <NavBread><span>商品</span></NavBread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                      <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'} " @click="setPriceFilter('all')">All</a></dd>
                      <dd v-for="(price , index) in priceFilter" :key="index" >
                        <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                      </dd>
                        <!--<dd>-->
                            <!--<a href="javascript:void(0)">100 - 500</a>-->
                        <!--</dd>-->
                        <!--<dd>-->
                            <!--<a href="javascript:void(0)">500 - 1000</a>-->
                        <!--</dd>-->
                        <!--<dd>-->
                            <!--<a href="javascript:void(0)">1000 - 2000</a>-->
                        <!--</dd>-->
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in list" :key='index'>
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            ...
                          </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footers/>
  </div>
</template>
<script>
import HeadNav from '@/components/Head'
import NavBread from '@/components/NavBread'
import Footers from '@/components/Footer'
import axios from 'axios'
export default {
    data(){
        return{
            list:[],
          sortFlag:true,
          priceChecked:'all',
          busy:true,
          page:1,
          pagesize:8,
          flag:false,
          priceFilter:[
            {
              startPrice:'0',
              endPrice:'100'
            },
            {
              startPrice:'100',
              endPrice:'500'
            },
            {
              startPrice:'500',
              endPrice:'2000'
            },
            {
              startPrice:'2000',
              endPrice:'5000'
            }
          ]




        }
    },
    components:{
        HeadNav,
        NavBread,
        Footers
    },
    created(){
        this.getGoods();
    },
    methods:{
        getGoodsList(){
            axios.get('测试接口')
            .then(res=>{

                res = res.data.data;
                // this.list = res;
            })
        },
        getGoods(flag){let sort = this.sortFlag ? 1 : -1;
                    axios.get('/goods/list',{params:{sort:sort,priceLevel:this.priceChecked,page:this.page,pagesize:this.pagesize}}).then(res=>{
                      if (flag){
                        if (res.data.result.length==0){
                          this.busy=true;
                }else {
                 this.busy=false;
                 this.list=this.list.concat(res.data.result);
                }
              }else {
                this.list= res.data.result;
                this.busy = false;
              }
          })
        },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.getGoods();
      },
      setPriceFilter(index){
        this.priceChecked = index;
        this.page=1;
        this.getGoods();
      },
      loadMore: function() {
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
          this.page++;
          this.getGoods(true);
        }, 1000);
      }
    }
}
</script>
<style>

</style>


