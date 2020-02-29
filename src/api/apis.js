import axios from 'axios'

const req = axios.create({
    baseURL:'http://192.168.2.100:3000',
    timeout:10000
})


// 获取商家信息
export function getSeller(){

    return req({
        url:'/api/seller',
    })
    
}



//获取商品列表
export function getGoods(seller){

return req({
    url:'/api/goods',
    params:{
        seller
    }
})
}


//获取商品列表
export function getRatings(){

    return req({
        url:'/api/ratings',
    })
    }