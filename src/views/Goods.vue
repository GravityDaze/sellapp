<template>
  <div class="goods">
    <!-- 左烂 -->
    <div class="categroy" ref="categroy">
      <ul class="content">
        <ul class="cate-list">
          <li
            v-for="(catalog,i) in goods"
            :key="i"
            @click="categoryClick(i)"
            :class="{selected:i===curSelect}"
          >
            <div class="text">
              <p>
                <img v-show="catalog.type===1" src="../assets/imgs/discount_3@2x.png" alt />
                <img v-show="catalog.type===2" src="../assets/imgs/decrease_3@2x.png" alt />
                <img v-show="catalog.type===3" src="../assets/imgs/special_3@2x.png" alt />
                {{catalog.name}}
              </p>
            </div>
          </li>
        </ul>
      </ul>
    </div>

    <!-- 右栏 -->
    <div class="right-content" ref="rightContent">
      <ul class="content">
        <div class="goods-list" v-for="(catalog,supIndex) in goods" :key="supIndex" :id="supIndex">
          <div class="goods-categroy">{{catalog.name}}</div>
          <div class="goods-item" v-for="(item,subIndex) in catalog.foods" :key="item.name">
            <!-- 商品图片 -->
            <div class="goods-img">
              <img :src="item.image" alt />
            </div>
            <!-- 商品信息 -->
            <div class="goods-info">
              <h4>{{item.name}}</h4>
              <span class="taste">{{item.description}}</span>
              <p class="sale">月售{{item.sellCount}}份 好评率{{item.rating}}%</p>
              <p class="price">
                <span>￥</span>
                <strong>{{item.price}}</strong>
                <em>￥{{item.oldPrice || item.price}}</em>
              </p>
            </div>
            <!-- 按钮 -->
            <div class="num-selector">
              <div
                class="sub"
                @click="add(supIndex,subIndex,-1)"
                v-show="goods[supIndex].foods[subIndex].num!==0"
              >-</div>
              <div class="count" v-show="goods[supIndex].foods[subIndex].num!==0">{{item.num}}</div>
              <div class="add" @click="add(supIndex,subIndex,1)">+</div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";

// 引入插件
import BScroll from "better-scroll";

export default {
  created() {
    this.getGoods();
  },

  mounted() {
    //  初始化数据
    this.left = new BScroll(this.$refs.categroy, {
      click: true
    });

    this.right = new BScroll(this.$refs.rightContent, {
      click: true,
      probeType: 3
    });

    // 监听右栏滚动
    this.right.on("scroll", pos => {
      this.scrollY = Math.abs(pos.y);
      for (let i = 0; i < this.heights.length; i++) {
        if (this.scrollY > this.heights[i]-50) {
          this.curSelect = i;
        }
      }
    });
  },

  watch: {

    // 监听goods的变化
    goods() {
      // 获取每一个li的高度
      this.$nextTick(() => {
        const list = document.querySelectorAll(".goods-list");
        let curHeight = 0;
        for (let i = 0; i < list.length; i++) {
          curHeight += list[i].clientHeight;
          this.heights.push(curHeight);
        }
      });
    },

    curSelect(val){
        console.log(val)
        this.left.scrollToElement(document.querySelectorAll('.cate-list li')[val],0)

    }
  },

  data() {
    return {
      goods: {},
      curSelect: 0,
      scrollY: 0,
      heights: [0],
    };
  },

  methods: {
    getGoods() {
      getGoods().then(res => {
        if (res.status === 200) {
          this.goods = res.data.data;
        }
      });
    },
    // 增加减少数量
    add(supIndex, subIndex, num) {
      this.goods[supIndex].foods[subIndex].num += num;
    },

    // 滚动
    categoryClick(i) {
      this.curSelect = i;
      this.right.scrollToElement(document.getElementById(i), 0);
    }
  }
};
</script>

<style lang="less">
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 60px;
  width: 100%;

  // 分类
  .categroy {
    background: #f3f6f6;
    width: 80px;
    line-height: 1;
    overflow: scroll;

    .cate-list {
      li {
        padding: 0 10px;
        height: 60px;

        .text {
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
          border-bottom: 1px solid #d9dde1;

          img {
            width: 16px;
            vertical-align: top;
          }
        }
      }

      // 选中效果
      .selected {
        background: #fff;
        margin-top: -2px;
        height: 62px;
        .text {
          border: 0;
        }
      }
    }
  }

  .right-content {
    overflow: scroll;
    flex: 1;

    // 商品类
    .goods-categroy {
      border-left: 2px solid #d9dde1;
      padding-left: 10px;
      background: #f3f6f6;
      line-height: 25px;
      color: #979b9f;
    }

    // 商品
    .goods-item {
      position: relative;
      display: flex;
      padding: 15px;

      // 商品图片
      .goods-img {
        height: 80px;
        width: 80px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }

      //商品信息
      .goods-info {
        flex: 1;
        // 商品名
        h4 {
          color: #000;
          font-size: 14px;
        }

        // 商品其他信息
        .taste,
        .sale {
          color: #93979b;
          font-size: 12px;
        }

        // 价格
        .price {
          strong {
            font-size: 18px;
            color: red;
          }

          span {
            color: red;
          }

          em {
            margin-left: 5px;
            color: #93979b;
            font-weight: bold;
            text-decoration: line-through;
          }
        }
      }

      // 数量选择
      .num-selector {
        position: absolute;
        right: 20px;
        bottom: 15px;
        display: flex;
        height: 24px;
        // justify-content: space-between;

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