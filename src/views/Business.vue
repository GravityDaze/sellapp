<template>
  <scroll class="business-page">
    <div class="business-box">
      <div class="top-bar">
        <!-- 店铺资料 -->
        <div class="business-report">
          <h3>{{seller.name}}</h3>
          <Rate disabled allow-half v-model="seller.score" />
          <span style="margin:0 8px;">({{seller.ratingCount}})</span>
          <span>月售{{seller.sellCount}}单</span>
        </div>
        <!-- 收藏 -->
        <div class="collect">
          <Icon type="md-heart" />
          <span>已收藏</span>
        </div>
      </div>

      <div class="bottom-bar">
        <div>
          <span>起送价</span>
          <h4>
            {{seller.minPrice}}
            <span>元</span>
          </h4>
        </div>
        <div>
          <span>商家配送</span>
          <h4>
            {{seller.deliveryPrice}}
            <span>元</span>
          </h4>
        </div>
        <div>
          <span>平均配送时间</span>
          <h4>
            {{seller.deliveryTime}}
            <span>分钟</span>
          </h4>
        </div>
      </div>
    </div>

    <!-- 公告 -->
    <dl class="bulletin-box">
      <dt>公告与活动</dt>
      <dd class="bulletin">{{seller.bulletin}}</dd>
      <dd v-for="(item,index) in seller.supports" :key="index">
        <img src="../assets/imgs/decrease_3@2x.png" alt />
        {{item.description}}
      </dd>
    </dl>

    <!-- 商家实景 -->
    <dl class="live-action">
      <dt>商家实景</dt>
      <dd>
          <img v-for="pics in seller.pics" :src="pics" :key="pics"/>  
      </dd>
    </dl>

    <!-- 商家信息 -->
    <dl class="business-info">
      <dt>商家信息</dt>
      <dd v-for="(item,index) in seller.infos" :key="index">{{item}}</dd>
    </dl>
  </scroll>
</template>

<script>
import Scroll from '../components/Scroll'
export default {


  computed:{
    seller(){
        return this.$store.state.seller
      }
  },
  components:{
    Scroll
  }

};
</script>

<style lang="less">
.business-page {
  position: absolute;
  top: 190px;
  bottom: 60px;
  width: 100%;

  .business-box {
    padding: 20px;
    border-bottom: 1px solid #e8e8e8;

    .top-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
      padding: 20px 0;

      .business-report{
        // 店铺名
        h3 {
          color: #000;
          font-size: 18px;
          font-weight:normal;
        }

        div{
            margin:0;
        }
      }

      // 收藏
      .collect {
        display: flex;
        flex-flow: column;

        i {
          font-size: 26px;
          color: #f01514;
        }
      }
    }

    .bottom-bar {
      display: flex;
      padding-top: 20px;

      div {
        flex: 1;
        text-align: center;
        color: #959a9b;

        &:nth-child(2) {
          border-left: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
        }

        h4 {
          color: #000;
          font-weight: normal;
          font-size: 22px;

          span {
            font-size: 8px;
          }
        }
      }
    }
  }

  // 公告
  .bulletin-box {
    .dl();

    .bulletin {
      color: #f01514;
    }

    dd {
      padding: 10px;
      border-bottom: 1px solid #e8e8e8;
    }
  }

  //   商家实景
  .live-action {
    .dl();
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;

    dd {
      display: flex;
      overflow: scroll;
      img {
        width: 140px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }

  // 商家信息
  .business-info {
    .dl();

    dd {
      padding: 10px;
      border-top: 1px solid #e8e8e8;
    }
  }
}

// 定义列表混合
.dl() {
  padding: 20px;
  dt {
    color: #000;
    font-size: 18px;
  }
}
</style>