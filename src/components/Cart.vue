<template>
  <div class="cart">
    <div class="left-bar" @click="boardShow = !boardShow">
      <!-- 图标 -->
      <i :class="{icon:true,iconActive:total &gt;0}" >
        <Badge :count="count">
            <Icon type="md-cart" style="font-size:32px"/>
         </Badge>
      </i>

      <!-- 价格区域 -->
      <h4>
        <span>￥</span>
        <em>{{total}}</em>
      </h4>

      <!-- 提示信息 -->
      <p class="info">另需配送费￥4元</p>
    </div>

    <!-- 提交 -->
    <div
      class="submit"
      :style="{'background':total<20?'#2a353a':'#00a1dc','color':total<20?'#909297':'#fff'}"
    >
      <span>{{total&lt;20?"￥20起送":"去结算" }}</span>
    </div>

    <!-- 购物车板 -->
     <transition name="slide-fade">

    <div class="cart-board" v-show="boardShow">
      <div class="board-header">
        <span>购物车</span>
        <Icon class="clear" @click.native="clearCart" type="ios-trash-outline" />
      </div>
      <div class="cart-list">
        <div class="msg" v-if="inCartFoods.length==0">购物车空空如也</div>
        <div class="cart-goods-item" v-for="(item,index) in inCartFoods" :key="index">
          <span class="cart-goods-name">{{item.name}}</span>
          <div class="right-area">
            <span class="cart-goods-price">￥{{item.price}}</span>
            <!-- 按钮 -->
            <div class="num-selector">
              <div class="sub" @click="add(item,-1)">-</div>
              <div class="count">{{item.num}}</div>
              <div class="add" @click="add(item,1)">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </transition>


  </div>
</template>

<script>
export default {
  data() {
    return {
      boardShow: false
    };
  },
  computed: {
    // 购物车中的商品
    inCartFoods() {
      return this.$store.getters.inCart.inCartFoods;
    },
    // 总金额
    total() {
      return this.$store.getters.inCart.total;
    },
    // 总数量
    count(){
      return this.$store.getters.inCart.count;

    }
  },
  methods: {
    // 清除购物车
    clearCart() {
      this.boardShow = false;
      this.$store.commit("removeItem");
    },

    add(item, num) {
      this.$store.commit("updatedNum", { item, num });
    }
  }
};
</script>

<style lang="less">
// 定义购物车最小高度
@minHeight: 62px;

// 购物车动画
.slide-fade-leave-active ,.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.cart {
  position: fixed;
  display: flex;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: rgb(19, 29, 38);
  color: #909297;

  .left-bar {
    width: 75%;
    display: flex;
    padding-left: 80px;
    align-items: center;

    .icon {
      position: absolute;
      top: -10px;
      left: 10px;
      border-radius: 50%;
      background: #273039;
      box-sizing:border-box;
      border:8px solid rgb(19, 29, 38);
      padding: 10px;
      z-index: 9;

    }

    .iconActive{
      background: #00a1dc;
      border:8px solid #2b353f;

      i{
        color:#fff;
      }
    }

    h4 {
      font-size: 24px;
      border-right: 1px solid #2b353f;
      padding-right: 15px;
      margin-right: 15px;
    }

    .info {
      font-size: 12px;
    }
  }

  .submit {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    height: 100%;
    width: 25%;
  }

  // 购物车条
  .cart-board {
    position: fixed;
    width: 100%;
    bottom: 60px;
    background: #fff;

    .board-header {
      display: flex;
      height: 35px;
      background: rgb(244, 246, 248);
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .clear {
        font-size: 18px;
      }
    }

    .cart-list {
      display: flex;
      flex-flow: column;
      padding: 0 20px;
      min-height: @minHeight;
      max-height: @minHeight*4;
      overflow: scroll;

      .msg {
        margin: auto;
      }

      .cart-goods-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        align-items: center;
        padding: 20px 0;

        .cart-goods-name {
          color: #000;
        }
        .right-area {
          display: flex;

          .cart-goods-price {
            color: red;
            margin-right: 15px;
          }

          .num-selector {
            display: flex;

            .add {
              .num-selector();
              background: #00a1dc;
              color: #fff;
              border: 1px solid #00a1dc;
            }

            .sub {
              .num-selector();
              color: #00a1dc;
              border: 1px solid #00a1dc;
            }

            .count {
              width: 24px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

// 按钮混合
.num-selector() {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>