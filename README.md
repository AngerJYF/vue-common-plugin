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
   + 通过 npm 安装
      
      ```js
         npm install axios
       ```
   + 作者本人写项目的 axios 文件写法 (请不要照抄!!!!!)
   
	   ```js
		import axios from "axios";
		import QS from "qs";
		import { Message } from 'element-ui'

		// post请求头
		axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

		const SUCCESS_CODE = 200;

		/**
		 * get方法，对应get请求
		 * @param {String} url [请求的url地址]
		 * @param {Object} params [请求时携带的参数]
		 */
		export function get(url, params) {
		  return new Promise((resolve, reject) => {
		    axios
		      .get(url, {
			params: params
		      })
		      .then(res => {
			//console.log(res)
			if (res.data.code != SUCCESS_CODE) {
			  Message({
			    message: `服务器错误,状态码${res.data.code}`,
			    type: 'error',
			    duration: 2000
			  });
			  // return
			}
			resolve(res.data);
		      })
		      .catch(err => {
			Message({
			  message: `服务器错误!`,
			  type: 'error',
			  duration: 2000
			});
			reject(err.data);
		      });
		  });
		}

		/**
		 * post方法，对应post请求
		 * @param {String} url [请求的url地址]
		 * @param {Object} params [请求时携带的参数]
		 * 使用Qs,转换请求类型为application/x-www-form-urlencoded;charset=UTF-8,
		 * 不使用会使用application/json;charset=UTF-8，根据后台需求来定
		 */
		export function post(url, params, message = "服务器错误") {
		  return new Promise((resolve, reject) => {
		    axios
		      .post(url, QS.stringify(params))
		      .then(res => {
			if (res.data.code != SUCCESS_CODE) {
			  Message({
			    // message: `${message},状态码${res.data.code}`,
			    message: message == "政务信息已存在" ? message : `${message},状态码${res.data.code}`,
			    type: 'error',
			    duration: 2000
			  });
			  // return
			}
			resolve(res.data);
		      })
		      .catch(err => {
			Message({
			  message: `服务器错误!`,
			  type: 'error',
			  duration: 2000
			});
			reject(err.data);
		      });
		  });
		}

		```
   + **What ? 不明白 !**
   	- 移步外网 [中文](https://www.kancloud.cn/yunye/axios/234845)  [English](https://www.npmjs.com/package/axios)
	
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
### 6. [element-ui](http://element-cn.eleme.io/2.0/#/zh-CN/component/installation)

   + 通过 npm 安装
	  ```js
	    npm i element-ui -S
	  ```
   + 在 main.js 文件中引入
	 ```js
	   import Vue from 'vue';
	   import ElementUI from 'element-ui';
	   import 'element-ui/lib/theme-chalk/index.css';
	   import App from './App.vue';

	   Vue.use(ElementUI)

	  new Vue({
	   el: '#app',
	   render: h => h(App)
	  })
	 ```
  + [组件使用](http://element-cn.eleme.io/2.0/#/zh-CN/component/quickstart),注意全局组件和局部组件的不同使用方法!
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
### 7. [moment](http://momentjs.cn/)
+ 一个非常实用的日期工具类 moment.js ,日期获取,格式化等。适用 element-ui 的时间日期组件
+ 通过 npm 安装
```js
	npm install moment --save
```
+ 在 main.js 中注册;
```js
	import moment from 'moment';
	Vue.prototype.$moment = moment;
```
+ 子组件中写法：
```js
	this.$moment("getTime").format("YYYY-MM-DD");
```
+ 将已经转换格式的时间转回原来的格式
```js
	new Date("getTime");
```

### 8. [vue-echarts](https://github.com/ElemeFE/v-charts)
+ 通过 npm 安装
```js
	npm i v-charts echarts -S
```
+ 在 main.js 中注册
```js
	// Echarts 使用 
	import ECharts from 'vue-echarts/components/ECharts.vue';
	Vue.component('v-chart', ECharts);
	
	// 手动引入 ECharts 各模块来减小打包体积
	import 'echarts/lib/chart/line';
	import 'echarts/lib/chart/bar';
	import 'echarts/lib/chart/pie';
	import 'echarts/lib/chart/map';
	import 'echarts/map/js/china.js';
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/polar';
	import 'echarts/lib/component/legend';
	import 'echarts/lib/component/title.js';
```
+ 外链查看 [Fllow Me!](https://blog.csdn.net/weixin_42288815/article/details/80856999)
+ 作者本人项目(不要抄写!!!!!!)
```js
	 <template>
	  <!-- 地图 -->
	  <div class="china">
	    <v-chart :options="map" auto-resize></v-chart>
	  </div>
	</template>
	
	<script>
	import { maxBy, minBy, cloneDeep } from "lodash";
	export default {
	  props: ["newMapData"],
	  methods: {
	    getOptions(dataList, max, min) {
	      return {
		tooltip: {
		  formatter: function(params) {
		    if (!params.name) return "暂无数据";
		    return (
		      params.data["full_name"] +
		      "<br>" +
		      "信息数量: " +
		      params.data["value"]
		    );
		  }
		}, // 鼠标移到图里面的浮动提示框
		visualMap: {
		  type: "continuous",
		  min: min,
		  max: max,
		  left: "left",
		  top: "bottom",
		  //text: ["高", "低"], // 文本，默认为数值文本
		  calculable: true,
		  itemHeight: 130, //图形的高度，即长条的高度。
		  inRange: {
		    symbolSize: [10, 90],
		    color: ["#b4d1ec", "#5b99d7", "#0456b0", "#114499"]
		  }
		},
		grid: {
		  left: 30,
		  right: 30
		},
		geo: {
		  // 这个是重点配置区
		  map: "china", // 表示中国地图
		  roam: true,
		  itemStyle: {
		    normal: {
		      borderColor: "rgba(0, 0, 0, 0.2)"
		    },
		    emphasis: {
		      areaColor: null,
		      shadowOffsetX: 0,
		      shadowOffsetY: 0,
		      shadowBlur: 20,
		      borderWidth: 0,
		      shadowColor: "rgba(0, 0, 0, 0.5)"
		    }
		  }
		},
		series: [
		  {
		    type: "scatter",
		    coordinateSystem: "geo" // 对应上方配置
		  },
		  {
		    //name: "启动次数", // 浮动框的标题
		    type: "map",
		    geoIndex: 0,
		    /* data: [
		      { name: "北京", value: 177 },
		      { name: "天津", value: 42 },
		      { name: "河北", value: 102 },
		      { name: "山西", value: 81 },
		      { name: "内蒙古", value: 47 },
		      { name: "辽宁", value: 67 },
		      { name: "吉林", value: 82 },
		      { name: "黑龙江", value: 66 },
		      { name: "上海", value: 24 },
		      { name: "江苏", value: 92 },
		      { name: "浙江", value: 114 },
		      { name: "安徽", value: 109 },
		      { name: "福建", value: 116 },
		      { name: "江西", value: 91 },
		      { name: "山东", value: 119 },
		      { name: "河南", value: 137 },
		      { name: "湖北", value: 116 },
		      { name: "湖南", value: 114 },
		      { name: "重庆", value: 91 },
		      { name: "四川", value: 125 },
		      { name: "贵州", value: 62 },
		      { name: "云南", value: 83 },
		      { name: "西藏", value: 9 },
		      { name: "陕西", value: 80 },
		      { name: "甘肃", value: 56 },
		      { name: "青海", value: 10 },
		      { name: "宁夏", value: 18 },
		      { name: "新疆", value: 67 },
		      { name: "广东", value: 123 },
		      { name: "广西", value: 59 },
		      { name: "海南", value: 14 }
		    ], */
		    data: dataList
		  }
		]
	      };
	    }
	  },
	  data() {
	    return {
	      map: {}
	    };
	  },
	  watch: {
	    newMapData: {
	      handler(newValue) {
		if (newValue) {
		  let maxVal = maxBy(newValue, "value").value;
		  let minVal = minBy(newValue, "value").value;
		  this.map = this.getOptions(newValue, maxVal, minVal);
		}
	      },
	      deep: true
	    }
	  }
	};
	</script>
	<style scoped>
	.china {
	  width: 100%;
	  height: 100%;
	}
	<style>
	.echarts {
	  width: 100%!important;
	  height: 100%!important;
	}
	</style>
</style>

```






