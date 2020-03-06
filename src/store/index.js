import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        // 商品列表
        goods: [],
        seller: {},
        ratings:[]
    },

    mutations: {
        // 获取商品列表
        getGoods(state, res) {
            state.goods = res
        },

        // 获取店铺信息
        getSeller(state, res) {
            state.seller = res
        },

        // 获取评论信息
        getRatings(state,res){
            state.ratings=res
        },

        // 清空购物车
        removeItem(state) {
            for (let item of state.goods) {
                for (let subItem of item.foods) {
                    subItem.num = 0
                }
            }
        },

        // 更新商品数量
        updatedNum(state, res) {
            for (let item of state.goods) {
                for (let subItem of item.foods) {
                    if (subItem.name === res.item.name) {
                        // 排除transition组件带来的意料之外的负数
                        if (res.num === -1 && subItem.num === 0) return
                        subItem.num += res.num
                    }
                }
            }
        }
    },

    getters: {

        // 获取购物车中的商品
        inCart(state) {
            const inCartFoods = []
            let total = 0,
                count = 0,
                lock = false
            for (let item of state.goods) {
                for (let subItem of item.foods) {
                    // 获取所有数量不为0的商品
                    if (subItem.num !== 0) {
                        // 数组去重
                        for (let check of inCartFoods) {
                            lock = subItem.name === check.name
                            // 检测到重复项则终止循环
                            if (lock) break
                        }
                        
                        // 为false则push进数组
                        if (!lock) {
                            inCartFoods.push(subItem)
                            // 获取总金额
                            total += subItem.num * subItem.price
                            // 获取总数量
                            count += subItem.num
                        }
                    }
                }
            }
            return { inCartFoods, total, count }
        }

    }
})

export default store