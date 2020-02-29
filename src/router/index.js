import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [
  {path:'/',name:'main',component:Main,children:[
    {path:'goods',name:'goods',component:()=>import('../views/Goods.vue')},
    {path:'rating',name:'rating',component:()=>import('../views/Rating.vue')},
    {path:'business',name:'business',component:()=>import('../views/Business.vue')},

  ]}

]
const router = new VueRouter({
  routes
})

export default router
