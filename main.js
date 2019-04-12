// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import '@/assets/css/common.css';
import '@/assets/css/index.css';
import '@/assets/css/media.css';
import '@/assets/css/themify_icons.css';
import '@/assets/css/elementUi.css';
import moment from 'moment';
Vue.prototype.$moment = moment;

//import lodash from 'lodash';
//import Vconsole from 'vconsole';

//const vConsole = new Vconsole();
Vue.config.productionTip = false;
//Vue.prototype.$lodash = lodash;
// vuex 使用
// 状态管理
import Vuex from "vuex";
import store from './store'
Vue.use(Vuex);

// element-ui 使用
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//animate 动画使用
import animated from "animate.css";
Vue.use(animated);
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

//loading 动画
/* router.beforeEach((to, from, next) => {
  store.commit('setAppLoading', true);
})
router.afterEach(() => {
  store.commit('setAppLoading', false);
})  */ 

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
