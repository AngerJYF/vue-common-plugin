## 基于 vue 开发的项目,常用插件 及 简单使用 (本文提到 npm 安装命令仅适用于，非 mac 电脑！)
### 1. [vue-router](https://router.vuejs.org/zh/installation.html)

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
### 2. [vuex](https://vuex.vuejs.org/zh/)

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
       
   + **请官人驻足，仔细阅读**
 
      - #### store
         > vuex 状态存储,模块化分类, 对于新的module，新建文件，统一在入口文件引入。
         
      - 目录结构：
      
      ```javascript
         |-- store 文件夹(没有就新建,OK?)  // 与main.js 文件同级
               |-- module 文件夹
                     |-- module1.js 文件
                     |-- module2.js 文件
               |-- index.js 文件    
      ```
      - 写法：
      
      ```javascript
      
         // index.js 文件写法：
         
         import Vue from 'vue'
         import vuex from 'vuex'
         Vue.use(vuex);
         
         // 变量名自己随意起, 起 Loading 是为了便于理解下面 element-ui 中 v-loading 插件的使用
         import Loading from './module/module1.js';  
         import module2 './module/module2.js';
         export default new vuex.Store({
           modules: {
             Loading,
             module2
           }
         })
         
         
        // module1.js || module2.js 写法：
        export default {
             state:{
                 loading: false
             },
             mutations:{
                setAppLoading(state, value) {
                   state.loading = value
                },
            }
        }
      ```
      
   
### 3. axios (配合 qs 使用)
### 4. qs (配合 axios 使用)

   + **Vue中，序列化字符串，处理发送请求的参数使用工具 qs 来处理参数**
   + 通过 npm 安装
      
      ```js
         npm i qs 
       ```
   + 需要引入 qs 的文件中引入
   
      ```js
         import QS from 'qs'
      ```
   + 写法：
      
      ```js
         //qs主要有两个方法 ：
         
         //方法一：将对象序列化，多个对象之间用&拼接（拼接是由底层处理，无需手动操作）
	      //转换成查询字符串
         QS.stringify();
         let comments = {content: this.inputValue}
         let comValue = qs.stringify(comments)
         
         //方法二：将序列化的内容拆分成一个个单一的对象
         //转换成json对象
         QS.parse() 
         let comValue = QS.parse(comments)

      ```
     + **What ? 看不懂 !** 转外链看吧  [Fllow Me！](https://blog.csdn.net/suwu150/article/details/78333452)
     
### 5. [lodash](https://vuex.vuejs.org/zh/installation.html)

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
### 6. element-ui

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
### 7. moment
### 8. vue-echarts
