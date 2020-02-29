<template>
  <div class="nav-bar">
    <div>
      <router-link to="/goods">商品</router-link>
    </div>
    <div>
      <router-link to="/rating">评价</router-link>
    </div>
    <div>
      <router-link to="/business">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){

      return{}

  },

 
  
};
</script>

<style lang="less">
.nav-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  box-shadow: 0 0 5px #ddd;

  .router-link-active {
    color: red;
  }
}
</style>