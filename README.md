### 基于 vue 开发的项目,常用插件 及 简单使用
#### 1.vue-router
#### 2.vuex
#### 3.axios
#### 4.element-ui
#### 5.[lodash](https://www.lodashjs.com/)
   + 通过 npm 安装
     ```javascript
      $ npm i -g npm
      $ npm i --save lodash
     ```
   + 使用方法 (两种)
      + 方法一： main.js 文件中引入，全局注册
      ```javascript
         import lodash from 'lodash';
         Vue.prototype.$lodash = lodash;
         
         子组件中用法 (例)：
         
         this.$lodash.maxBy(objects,key);
         this.$loadsh.minBy(objects,key);
     ```
      + 方法二： 只在组件中引入使用
      ```javascript
         import { maxBy, minBy, cloneDeep } from "lodash";
         
         子组件中用法 (例)：
         maxBy(objects,key)；
         minBy(objects,key)；
      ```
#### 6.qs
#### 7.moment
#### 8.vue-echarts
