<template>
  <scroll class="rating">
    <div class="rating-box">
      <!-- 综合评分 -->
      <div class="score">
        <h2>{{seller.score}}</h2>
        <span>综合评分</span>
        <p>高于周边商家{{seller.rankRate}}%</p>
      </div>
      <!-- 评分信息 -->
      <div class="rating-info-box">
        <div class="rating-info">
          <p>
            <span>服务态度</span>
            <Rate disabled show-text allow-half v-model="seller.serviceScore">
              <span style="color: #f5a623">{{ seller.serviceScore }}</span>
            </Rate>
          </p>
          <p>
            <span>口味评分</span>
            <Rate disabled show-text allow-half v-model="seller.foodScore">
              <span style="color: #f5a623">{{ seller.foodScore }}</span>
            </Rate>
          </p>
          <p>
            <span>送达时间</span>
            <span>{{seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 评价 -->
    <div class="comment">
      <!-- 选项区域 -->
      <div class="tab">
        <div class="btn">
          <div @click="RateTypeChange(2)" :class='selectType===2?"btnActive":""' style="background:#00a1dc;color:#fff">
            全部
            <span>{{rateNum.positive+rateNum.negative}}</span>
          </div>
          <div @click="RateTypeChange(0)" :class='selectType===0?"btnActive":""' style="background:#cceef7;color:#56585f">
            满意
            <span>{{rateNum.positive}}</span>
          </div>
          <div @click="RateTypeChange(1)"  :class='selectType===1?"btnActive":""' style="background:#e9ecec;color:#56585f">
            不满意
            <span>{{rateNum.negative}}</span>
          </div>
        </div>
        <Checkbox v-model="onlyShowText">只看有内容的评价</Checkbox>
      </div>
      <!-- 评价内容 -->
      <div class="comment-content">
        <div class="comment-item" v-for="(item,index) in rateType" :key="index">
          <!-- 头像 -->
          <div class="left-bar">
            <Avatar icon="ios-person" :src="item.avatar" />
          </div>

          <div class="right-bar">
            <div class="userinfo">
              <!-- 用户名及时间 -->
              <div class="username">
                <span style="color:#000">{{item.username}}</span>
                <span>{{dateParse(item.rateTime)}}</span>
              </div>
              <!-- 送达时间及评价 -->
              <div class="rate">
                <Rate disabled allow-half v-model="item.score"/>
                <span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <!-- 评价内容 -->
            <p style="margin:10px 0">{{item.text || "该用户未评价"}}</p>
            <!-- tags -->
            <div class="tags">
              <Icon type="md-thumbs-up" v-if="item.recommend.length !=0" style="margin-right:5px" />
              <Tag type="border" v-for="recom in item.recommend" :key="recom">{{recom}}</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
// 网络请求
import { getRatings } from "../api/apis";

// 时间处理方法
import { dateParse } from "../utils/methods.js";

// better-scroll组件
import Scroll from '../components/Scroll'

import {mapState} from 'vuex'

export default {
  created() {
    //初始化评论
    this.initRatings();
  },
  data() {
    return {
      dateParse,
      onlyShowText: false, // 是否只显示有文本的
      selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
    };
  },
  methods: {
    initRatings() {
      // 初始化评论
      getRatings().then(res => {
        if (res.status === 200) {
          this.$store.commit("getRatings", res.data.data);
        }
      });
    },
    // 评论类型更改
    RateTypeChange(type) {
      this.selectType = type;
    }
  },

  computed: {
  ...mapState(['ratings','seller']),

    // 过滤评价
    rateType() {

      return this.$store.state.ratings.filter(rate => (this.selectType===2 || rate.rateType === this.selectType) && (!this.onlyShowText || rate.text ))
    },

    // 评价数量
    rateNum(){
      // 获取两种类的评论
     let positive = 0,
         negative=0
      for(let item of this.$store.state.ratings.filter( item=>this.onlyShowText?item.text:item)){
        item.rateType===0?positive++:negative++
      }
      return {positive,negative}

    }

  },
  components:{
    Scroll
  }


};
</script>

<style lang="less">
.rating{
  position:absolute;
  top: 190px;
  bottom: 60px;
  width: 100%;
}

.rating-box {
  display: flex;
  height: 100px;
  padding: 10px 15px;
  border-bottom: 2px solid #e7e7e7;

  .score {
    flex: 4;
    padding-right: 15px;
    text-align: center;
    border-right: 1px solid #e6e6e6;

    h2 {
      color: #f29a00;
    }

    p {
      font-size: 12px;
      color: #95999d;
    }
  }

  .rating-info-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 6;
    font-size: 12px;

    .rating-info {
      span {
        margin-right: 5px;
      }

      //五角星
      div {
        margin: 0;
        font-size: 16px;
        .ivu-rate-text {
          font-size: 14px;
        }
      }
    }
  }
}

// 评价
.comment {
  // 选项卡
  .tab {
    padding: 20px;
    border-bottom: 2px solid #e8e8e8;

    .btn {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e8e8e8;
      
      .btnActive{
        opacity:0.5;
        border: 1px solid skyblue;
      }  

      div {
        display: inline-block;
        padding: 5px 8px;
        border-radius: 2px;
        margin-right: 10px;
        border:1px solid transparent;

        span {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }
  }

  // 评价内容
  .comment-content {
    padding: 0 20px;

    .comment-item {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #e8e8e8;

      .left-bar {
        width: 15%;
      }

      .right-bar {
        width: 85%;

        .userinfo {
          color: #95999d;
          font-size: 12px;
          .username {
            display: flex;
            justify-content: space-between;
          }

          .rate {
            display: flex;
            align-items: center;

            // 五角星
            div {
              margin: 0;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>