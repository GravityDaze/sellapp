<template>
  <div class="goods">
    <!-- 左烂 -->
    <!-- <div > -->
      <scroll class="categroy" ref="categroy">
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
      </scroll>
    <!-- </div> -->

    <!-- 右栏 -->
     
      <scroll class="right-content" ref="rightContent" :option='option'>
        <div class="goods-list" v-for="(catalog,i) in goods" :key="i" :id="i">
          <div class="goods-categroy">{{catalog.name}}</div>
          <div class="goods-item" v-for="item in catalog.foods" :key="item.name">
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
             <transition name="slide">
              <div
                class="sub"
                @click="add(item,-1)"
                v-show="item.num &gt;0"
              >-</div>
               </transition>
              <div class="count" v-show="item.num &gt; 0">{{item.num}}</div>
              <div class="add" @click="add(item,1)">+</div>
             
            </div>
          </div>
        </div>
      </scroll>
      
  </div>
</template>

<script>
// 网络请求
import { getGoods } from "../api/apis";
// 引入better-scroll组件
import Scroll from "../components/Scroll";

export default {
  name:'Goods',
  created() {
    // 获取商品数据
    this.initGoods();
  },

  mounted() {
    // 监听右栏滚动
    this.rightScroll();
  },

  watch: {
    // 监听左侧索引的变化实时改变位置
    curSelect(val) {
      this.$refs.categroy.scrollToElement(
        document.querySelectorAll(".cate-list li")[val],
        300
      );
    }
  },

  data() {
    return {
      curSelect: 0,
      // 右侧BS配置项
      option:{
        click:true,
        probeType: 3
      },
    };
  },

  computed: {
    // 获取li当前高度
    listHeight() {
      const list = document.querySelectorAll(".goods-list");
      let heights = [0];
      let curHeight = 0;
      for (let i = 0; i < list.length; i++) {
        curHeight += list[i].scrollHeight;
        heights.push(curHeight);
      }
      return heights;
    },

    // 获取vuex中的商品数据
    goods(){
      return this.$store.state.goods
    }

  },
  methods: {
    // 获取商品列表数据
    initGoods() {
      getGoods().then(res => {
        if (res.status === 200) {
          this.$store.commit("getGoods",res.data.data)
        }
      });
    },

    // 数量选择
    add(item,num) {
      this.$store.commit('updatedNum',{item,num})
    },

    // 左栏点击事件
    categoryClick(i) {
      this.curSelect = i;
      this.$refs.rightContent.scrollToElement(document.getElementById(i), 300);
    },

    // 右栏滚动
    rightScroll() {

      this.$refs.rightContent.on("scroll", pos => {
        const scrollY = Math.abs(pos.y);
        for (let i = 0; i < this.listHeight.length; i++) {
          if (scrollY >= this.listHeight[i] && scrollY<this.listHeight[i+1]) {
            this.curSelect = i;
            return
          }
        }
      });
    }
  },

  components:{
    Scroll
  }
};
</script>

<style lang="less">
// 数量选择器动画
.slide-enter-active,.slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}


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
    overflow: hidden;

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
        margin-top: -1px;
        height: 60px;
        .text {
          border: 0;
        }
      }
    }
  }

  .right-content {
    overflow: hidden;
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