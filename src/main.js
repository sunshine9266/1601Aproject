import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap'
//导入请求数据的axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
//初始化高德地图
Vue.use(AMap);
AMap.initAMapApiLoader({
key: '0e96c9281f28f99c7621464bf20a7e6f',
plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
// 默认高德 sdk 版本为 1.4.4
v: '1.4.4'
});


//使用图片懒加载插件
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
//Vue.use(VueLazyload)
// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
preLoad: 1.3,   
error: 'static/error.jpg',
loading: 'static/loading.gif',
attempt: 2
})
/* eslint-disable no-new */
new Vue({
el: '#app',
router,
components: { App },
template: '<App/>'
})

//详情页图潘轮播
//图片懒加载
//弹框

//import Vue from 'vue';
//import VueAMap from 'vue-amap';
//import App from './App.vue';
//Vue.use(VueAMap);
//
//import router from './router'
//
////导入请求数据的axios
//import axios from 'axios'
//Vue.prototype.$http = axios
//Vue.config.productionTip = false
//
//
////使用图片懒加载插件
//import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
////Vue.use(VueLazyload)
//// 或者添加VueLazyload 选项
//Vue.use(VueLazyload, {
//preLoad: 1.3,
//error: 'static/error.jpg',
//loading: 'static/loading.gif',
//attempt: 1
//})
//
//
//
//VueAMap.initAMapApiLoader({
//key: '0e96c9281f28f99c7621464bf20a7e6f',
//plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//// 默认高德 sdk 版本为 1.4.4
//v: '1.4.4'
//});
//
//
//new Vue({
//	el: '#app',
//	router,
//	components: {
//		App
//	},
//	template: '<App/>'
//})