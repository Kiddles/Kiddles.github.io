import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/font-awesome-4.7.0/css/font-awesome.min.css';       // 图标
import "babel-polyfill";
import './mock/index.js';
import api from '../config/api.js';
import url from '../config/url.js';
import util from '../config/util.js';
/*import VueQuillEditor from 'vue-quill-editor';
import Quill from 'quill';*/

// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.prototype.url = url;
//工具类：分页选中功能
Vue.prototype.util = util;
Vue.prototype.isNull = function(string){
  if ((string == null) || (string == undefined) || (string == '') || (string == "")) { 
    return true;
}else{
    return false;
}
};
Date.prototype.format = function(fmt){
	var o = { 
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    }; 
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
       }
   }
   return fmt; 
}
Vue.use(ElementUI);
// Vue.use(VueQuillEditor);
Vue.prototype.$axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');