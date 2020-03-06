<template>
  <div class="main">
    <!-- 商家信息组件 -->
    <business :seller="seller" />
    <!-- 导航条 -->
    <nav-bar></nav-bar>
     <transition name="page-slide">   
        <keep-alive include="Goods">
          <router-view />
        </keep-alive>
     </transition>   
    <cart />
  </div>
</template>

<script>
// 组件
import Business from "@/components/Business";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";

// 请求
import { getSeller } from "@/api/apis.js";

// 工具函数
import {mapState} from 'vuex'

export default {
  created() {
    // 获取商家信息
    this.initSeller();
   
  },
  methods: {
    initSeller() {
      getSeller().then(res => {
        if (res.status === 200) {
          this.$store.commit("getSeller", res.data.data);
        }
      });
    },
  },

  computed:mapState(['seller']),

  components: {
    Business,
    NavBar,
    Cart
  }
};
</script>

<style lang='less' scoped>

.page-slide-enter-active {
  transition: .6s;
}
.page-slide-enter, .page-slide-leave-to
{
  transform: translateY(-5px);
  opacity: 0;
  
}

.main {
  display: flex;
  flex-flow: column;
}
</style>