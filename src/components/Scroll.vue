<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

// 节流函数
import {throttle} from '../utils/methods'

export default {
  name:'Scroll',
  // 初始化组件
  mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper, this.option);
  },

  // 配置信息
  props: {
    option: {
      type: Object,
      default(){
          return{
              click:true
          }
      }
    }
  },

  data(){
      return{
          scroll:null
      }
  },


  methods: {
    // 滚动至某元素
    scrollToElement(el, speed) {
      this.scroll.scrollToElement(el, speed);
    },

    // 监听
    on(event, callback) {
      this.scroll.on(event, throttle(callback,100))
    }
  }
};
</script>

<style>
</style>