<template>
  <div class="cart">
    <div class="left-bar">
      <!-- 图标 -->
      <i class="icon">
        <img src="../assets/imgs/cart.png" alt />
      </i>

      <!-- 价格区域 -->
      <h4>
        <span>￥</span>
        <em>0</em>
      </h4>

      <!-- 提示信息 -->
      <p class="info">另需配送费￥4元</p>
    </div>

    <!-- 提交 -->
    <div class="submit">
      <span>￥20起送</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.cart {
  position: fixed;
  display:flex;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: rgb(19, 29, 38);
  color: #909297;

  .left-bar {
    width: 75%;
    display: flex;
    padding-left:80px;
    align-items: center;

    i {
      position: absolute;
      top: -10px;
      left: 10px;
      border-radius: 50%;
      background: rgb(19, 29, 38);
      padding: 10px;

      img {
        width: 50px;
        opacity: 0.4;
      }
    }

    h4 {
      font-size: 24px;
      border-right: 1px solid #2b353f;
      padding-right: 15px;
      margin-right: 15px;
    }

    .info{
        font-size:12px;
    }
  }

  .submit {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    background: #2a353a;
    height: 100%;
    width: 25%;
  }
}
</style>