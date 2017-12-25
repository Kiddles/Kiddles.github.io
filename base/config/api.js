// import keycloak from '../static/js/app2';
//Vue.prototype.$api = api;

// 配置API接口地址
var root = process.env.API_ROOT;
// 引用superagent
var request = require('superagent');
// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filter_null(o) {
  for (var key in o) {
    if (o[key] == null) {
      delete o[key]
    }
    if (toType(o[key]) == 'string') {
      o[key] = o[key].trim()
      if (o[key].length == 0) {
        delete o[key]
      }
    }
  }
  return o
}
/*
  接口处理函数
  接口处理函数
  method:提交方式;url:提交路径;params：参数;success:提交成功回调;failure:提交失败回调;ismock：调用模拟接口;form:提交的表单;noupload：是否上传
*/
function _api_base(method, url, params, success, failure ,ismock,form, noupload) {
  // console.log('***************************keycloak.authenticated' + keycloak.authenticated + '*****************************');
  if (keycloak.authenticated) {
      keycloak.updateToken(30).success(function () {
        console.log('update token success!!!')
      }).error(function () {
        keycloak.login();
        return;
      });
  } else {
    keycloak.login();
    return;
  }
  if(!noupload){
    var r = request(method, url);
  }
  else if(ismock){
    var r = request('get', url);
  }
  else{
    var r = request(method, url).type('application/json;charset=utf-8');
  }
  var token;
  if (keycloak.authenticated) {
    token = keycloak.token;
  }
  //console.log("request token：" + token);
  if(!!token){
    r.set('Authorization','Bearer ' + token);
    //r.set('token','Bearer ');
    if (!noupload) {
      r.set('enctype', 'multipart/form-data');
    } else {
      r.set('Content-Type', 'application/json')
    }
  }
  if(!!form){
    r.type('form');
  }
  /*if(method === 'GET'){
    r.responseType('arraybuffer');
  }*/
  if (params) {
    //params = filter_null(params);
    if (method === 'POST' || method === 'PUT') {
      if (toType(params) == 'object') {
        params = JSON.stringify(params);
      }
      r = r.send(params)
    } else if (method == 'GET' || method === 'DELETE') {
      r = r.query(params);
    }
  }
  r.end(function(err, res) {
    if (err) {
      console.log('api error, HTTP CODE: ' + err.message);
      return;
    }else{
      if(method === 'POST'){
        if (JSON.parse(res.text).code == 'ACK') {
          success(JSON.parse(res.text));
        }
        else{
          failure(JSON.parse(res.text));
        }

      }
      else{
        if (JSON.parse(res.text).code == 'ACK') {
          success(JSON.parse(res.text));
        }
        else{
          failure(JSON.parse(res.text));
        }
        //return success(JSON.parse(res.text));
      }
    };
  });
};
// 返回在vue模板中的调用接口
export default {
  get: function(url, params, success, failure,ismock, form,upload) {
    return _api_base('GET',  url, params, success, failure,ismock,form,upload)
  },
  post: function(url, params, success, failure,ismock, form,upload) {
    return _api_base('POST',  url, params, success, failure,ismock,form,upload)
  },
  put: function(url, params, success, failure,ismock, form,upload) {
    return _api_base('PUT',  url, params, success, failure,ismock,form,upload)
  },
  delete: function(url, params, success, failure,ismock, form,upload) {
    return _api_base('DELETE',  url, params, success, failure,ismock,form,upload)
  },
  /*get: function(url, params, success, failure, form) {
    return _api_base('GET', root + '/' + url, params, success, failure,form)
  },*/
}
