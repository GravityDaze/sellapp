<template>
  <div class="business">
    <div class="mask" :style="{backgroundImage:`url(${seller.avatar})`}"></div>
    <div class="info">
      <!-- 商家头像 -->
      <div class="avatar">
        <img :src="seller.avatar" alt />
      </div>
      <!-- 文字信息 -->
      <div class="text-info">
        <h2 class="brand">
          <img src="../assets/imgs/brand@2x.png" alt />
          <span>{{seller.name}}</span>
        </h2>
        <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div>
          <img src="../assets/imgs/decrease_1@2x.png" alt />
          <span>优惠信息</span>
        </div>
      </div>
      <!-- 按钮 -->
      <Button shape="circle" ghost>5个 <Icon type="ios-arrow-forward" /></Button>
    </div>

    <!-- 公告 -->
    <div class="bulletin">
      <img src="../assets/imgs/bulletin@2x.png" alt />
      <p>{{seller.bulletin}}</p>
     <Icon type="ios-arrow-forward" />
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {};
  },
  props: {
    seller: {
      type: Object
    }
  },
};
</script>

<style lang="less">
// 文字颜色
@color: #fff;

.business {
  position: relative;
  z-index:9;
  height: 150px;
  color: @color;
  overflow: hidden;

  // 蒙版
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    filter: blur(5px);
    width: 100%;
    height: 100%;
    z-index: -5;
  }

  .info {
    position: relative;
    display: flex;
    height: 80%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);

    // 头像
    .avatar {
      margin-right: 15px;
      width: 80px;
      height: 80px;

      img {
        border-radius: 4px;
        height:100%;
        width:100%;
      }
    }

    // 文字信息
    .text-info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      // 店名
      .brand {
        display: flex;
        align-items: center;
        font-size:18px;

        img {
          width: 34px;
          margin-right: 8px;
        }
      }

      // 送达时间

      // 优惠信息
      div {
        img {
          width: 14px;
          margin-right: 5px;
        }
      }
    }

    button {
      position: absolute;
      right: 20px;
      bottom: 20px;
      padding: 0 10px;
    }
  }

  // 公告
  .bulletin {
    background: rgba(0, 0, 0, 0.7);
    height: 20%;
    padding: 0 18px 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 26px;
      margin-right: 5px;
    }

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>