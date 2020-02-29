<template>
  <div class="main">
      <!-- 商家信息组件 -->
      <business :seller="seller"/>
      <!-- 导航条 -->
      <nav-bar></nav-bar>
        <router-view />
      <cart /> 
  </div>
</template>

<script>
// 组件
import Business from '@/components/Business'
import NavBar from '@/components/NavBar'
import Cart from '@/components/Cart'

// 请求
import {getSeller} from '@/api/apis.js'



export default {

    created(){
        // 获取商家信息
        this.getSeller()
        console.log(this.seller)

    },

    data(){

        return{

            seller:{}


        }

    },

    methods:{

        getSeller(){
            getSeller().then( res=>{

                if(res.status === 200){

                    this.seller=res.data.data

                }
            })


        }


    },

    components:{
        Business,
        NavBar,
        Cart
    }

}
</script>

<style lang='less' scoped>
.main{
    display:flex;
    flex-flow: column;
}


</style>