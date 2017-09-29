<template>
  <div>
    <div class="site-header" style="clear:both;">
      <div class="container">
        <div class="header-logo">
          <a href="index.php" title=""><img src="/static/img/vn-logo.png" /></a>
        </div>
        <div class="header-nav">
          <!--<ul class="nav-list">-->
            <!--<li class="nav-category">-->
              <!--<a class="btn-category-list" href="catalog.php" style="display:none;">全部商品分类</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="link" href="category.php?id=76"><span>购买电视与平板</span></a>-->
              <!--<div class='item-children'>-->
                <!--<div class="container">-->
                  <!--<ul class="children-list clearfix">-->

                  <!--</ul>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->

            <!--<li class="nav-item">-->
              <!--<a class="link" href="category.php?id=118"><span>小米生活方式</span></a>-->
              <!--<div class='item-children'>-->
                <!--<div class="container">-->
                  <!--<ul class="children-list clearfix">-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=89">纯色开衫卫衣 女款</a></div>-->
                      <!--<p class="price">129<em>元</em>元</p>-->
                    <!--</li>-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=90">企鹅版米兔</a></div>-->
                      <!--<p class="price">49<em>元</em>元</p>-->
                    <!--</li>-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=91">简约多功能双肩包</a></div>-->
                      <!--<p class="price">99<em>元</em>元</p>-->
                    <!--</li>-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=92">小米鼠标垫</a></div>-->
                      <!--<p class="price">5<em>元</em>元</p>-->
                    <!--</li>-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=43">小蚁蓝牙自拍杆</a></div>-->
                      <!--<p class="price">129<em>元</em>元</p>-->
                    <!--</li>-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=94">猫的秘密</a></div>-->
                      <!--<p class="price">199<em>元</em>元</p>-->
                    <!--</li>-->
                  <!--</ul>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
        <!-- <div class="container-user"> -->
        <div class="topbar-cart" id="ECS_CARTINFO">
          <a class="cart-mini " href="flow.php">
            <i class="iconfont">&#xe60c;</i> 购物车
                    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
          </a>
        </div>
        <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
          <span v-if="nickName" v-text="nickName"></span>
          <a class="link" href="javascript:void(0)" rel="nofollow" v-if="!nickName"@click="loginModalFlag  = true">登录</a>
          <span class="sep" v-if="nickName">|</span>
          <a class="link" href="javascript:void(0)" rel="nofollow" v-if="nickName" @click="logout">退出</a>
        </div>
        <!-- </div> -->
      </div>
      <div id="J_navMenu" class="header-nav-menu" style="display: none;">
        <div class="container"></div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition md-show" >
      <div class="md-modal-inner" v-if="loginModalFlag">
        <div class="md-top">
          <div class="md-title">login in</div>
          <button class="md-close">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" >用户名或密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>

          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login" >登录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    name:'header',
    data(){
      return{
        userName:'',
        userPwd:'',
        nickName:'',
        loginModalFlag:false
      }
    },
    mounted:function(){
      this.checkLogin();
    },
    methods:{
      login(){
        console.log(this.userName,this.userPwd);
        axios.post("/users/login",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then((result)=>{
          console.log(result.data);
          let res = result.data;
          this.nickName = res.result.userName;
          this.loginModalFlag = false;
        })
      },
      checkLogin(){
        axios.post('/users/checkLogin').then((result) => {
          let res = result.data;
          this.nickName = res.result;
        })
      },
      logout(){
        axios.post('/users/logout').then((result)=>{
          let res = result.data;
          this.nickName = '';
        })
      }
    }
  }
</script>
<style>

</style>

