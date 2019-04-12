## 基于 vue 开发的项目,常用插件 及 简单使用
### 1.[vue-router](https://router.vuejs.org/zh/installation.html)

   + 通过 npm 安装 
   
        ```javascript
        npm install vue-router
        ```
   + 使用方法, main.js 文件中引入，全局注册
  
     ```javascript
         import Vue from "vue";
         import App from "./App";
         import router from "./router.js"; 
         
         new Vue({
           el: "#app",
           router,
           components: { App },
           template: "<App/>"
         });
     ```
   + router 文件夹下 index.js 写法 (vue-cli 3.0+ 搭建的环境没有 router 文件夹,新建 router 文件夹，并创建 index.js 文件)
     
     ```javascript
         import Vue from 'vue'
         import Router from 'vue-router'

         Vue.use(Router)
         
         // 路由按需加载
         const Packages = () => import(/* webpackChunkName: "Packages" */ '@/views/Packages');

         export default new Router({
           routes: [
             {
               path: '/',
               name: 'Packages',
               component: Packages
             }
           ]
         })
     ```
### 2.[vuex](https://vuex.vuejs.org/zh/)

   + 通过 npm 安装
   
        ```javascript
          npm install vuex --save
        ```
        
   + 使用方法, main.js 文件中引入，全局注册
   
       ```javascript
         import Vue from 'vue';
         import Vuex from 'vuex';   // vuex 使用
         import store from './store';   // 状态管理

         Vue.use(Vuex)
         
         new Vue({
           el: "#app",
           store,
           components: { App },
           template: "<App/>"
         });
       ```
       
### 3.axios
### 4.qs
### 5.[lodash](https://vuex.vuejs.org/zh/installation.html)

   + **Lodash** 就是这样的一套工具库，它内部封装了诸多对字符串、数组、对象等常见数据类型的处理函数，其中部分是目前ECMAScript尚未制订的规范，但同时被业界所认可的辅助函数。
   
   + 通过 npm 安装
   
     ```javascript
       npm i -g npm
       npm i --save lodash
     ```
     
   + 使用方法 (两种)
   
      + 方法一： main.js 文件中引入，全局注册
      ```javascript
         import lodash from 'lodash';
         Vue.prototype.$lodash = lodash;
         
         子组件中写法 (例)：
         
         this.$lodash.maxBy(objects,key);
         this.$loadsh.minBy(objects,key);
     ```
      + 方法二： 只在组件中引入使用
      ```javascript
         import { maxBy, minBy, cloneDeep } from "lodash";
         
         子组件中写法 (例)：
         
         maxBy(objects,key)；
         minBy(objects,key)；
      ```
### 6.element-ui

+ ##### element-ui 中 loading 组件使用思路;
   ``` js
       1. 配合使用 vuex 状态管理来改变 v-loading 的状态值  true Or false;
       2. 在 main.js 中引入 vuex;

           import Vuex from "vuex";
           import store from './store';
           Vue.use(Vuex);

       3. 在 APP.vue 中引入 mapState,mapMutations;在父组件上写入 v-loding="getLoading";

           import { mapState, mapMutations } from "vuex";

           # 注: getLoading 为从 vuex 获取到的状态值;

           computed:{
               ...mapState({
                   getLoading (state){
                       return state.Loading.loading;                    
                   }
               })
           }
       4. 在子组件里更改 vuex 中 v-loading 的值;

          # 子组件引入  
             import { mapState, mapMutations } from "vuex";  
             
          # methods 中写入方法: 
           // 获取更改 loading 值得方法;
          ...mapMutations(["setLoading"]);

       5. 在发送 axios 请求之前设置 loading 状态值为 true;

          # this.setAppLoading(true) 

          请求数据成功与否,都再次更改 vuex 中loading 值为 false;

          # this.setAppLoading(false) 
   ```
### 7.moment
### 8.vue-echarts
