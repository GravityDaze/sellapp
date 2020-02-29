<template>
  <div class="rating">
    <div class="rating-box">
      <!-- 综合评分 -->
      <div class="score">
        <h2>3.9</h2>
        <span>综合评分</span>
        <p>高于周边商家69.3%</p>
      </div>
      <!-- 评分信息 -->
      <div class="rating-info">
        <div>
          <span>服务态度</span>
          <Rate disabled />
        </div>
        <div>
          <span>服务态度</span>
          <Rate disabled />
        </div>
        <div>
          <span>服务态度</span>
          <Rate disabled />
        </div>
      </div>
    </div>

    <!-- 评价 -->
    <div class="comment">
      <!-- 选项区域 -->
      <div class="tab">
        <div class="btn">
          <div style="background:#00a1dc;color:#fff">
            全部
            <span>57</span>
          </div>
          <div style="background:#cceef7;color:#56585f">
            满意
            <span>57</span>
          </div>
          <div style="background:#e9ecec;color:#56585f">
            不满意
            <span>57</span>
          </div>
        </div>
        <Checkbox v-model="single">只看有内容的评价</Checkbox>
      </div>
      <!-- 评价内容 -->
      <div class="comment-content">
        <div class="comment-item" v-for="(item,index) in ratings" :key="index">
          <!-- 头像 -->
          <div class="left-bar">
            <Avatar icon="ios-person" />
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
                <Rate disabled />
                <span>{{item.deliveryTime || "未知"}}分钟送达</span>
              </div>
            </div>
            <!-- 评价内容 -->
              <p style="margin:10px 0">{{item.text || "该用户未评价"}}</p>
            <!-- tags -->
            <div class="tags" >
              <Icon type="md-thumbs-up" v-if="item.recommend.length !=0"/>
              <Tag type="border" v-for="recom in item.recommend" :key="recom">{{recom}}</Tag>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 网络请求
import {getRatings} from "../api/apis"

// 时间处理方法
import {dateParse} from "../utils/methods.js" 

export default {
    created(){
            this.getRatings()
    },
    data(){
        return{
            ratings:{},
            dateParse
        }
    },
    methods:{
        getRatings(){
            getRatings().then( res=>{
                if(res.status===200){
                    this.ratings=res.data.data
                    console.log(this.ratings)
                }
            } )
        },
 
    },

};
</script>

<style lang="less">
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

  .rating-info {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    flex: 6;
    font-size: 12px;

    div {
      span {
        margin-right: 5px;
      }

      //五角星
      div {
        margin: 0;
        font-size: 16px;
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

      div {
        display: inline-block;
        padding: 5px 8px;
        border-radius: 2px;
        margin-right: 10px;

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