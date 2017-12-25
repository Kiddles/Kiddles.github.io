/*
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//var keycloak = new Keycloak();
//或者
//本地
var keycloak = Keycloak('static/keycloak.json');
//测试
// var keycloak = Keycloak('../../web/static/keycloak.json');
//认证失败
function notAuthenticated() {
    document.getElementById('not-authenticated').style.display = 'block';
    document.getElementById('authenticated').style.display = 'none';
}

//认证成功
function authenticated() {
    userName=keycloak.tokenParsed['preferred_username'];
    accessToken=keycloak.token;
    // console.log('accessToken' + accessToken);
}


// 调用API 时带上 accessToken
function request(endpoint) {
    var req = function() {
        var req = new XMLHttpRequest();        
        req.open('GET', endpoint, true);
        if (keycloak.authenticated) {
            req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
        
        }
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var outputvalue = req.responseText;
                } else if (req.status == 0) {
                    var outputvalue = 'Request failed';
                } else {
                    var outputvalue = req.status + ' ' + req.statusText;
                }
            }
        };

        req.send();
    };

    if (keycloak.authenticated) {
        keycloak.updateToken(30).success(req);
    } else {
        req();
    }
}

// keyclaok 初始化函数
function keycloakinit() {
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).success(function () {
        if (keycloak.authenticated) {
            authenticated();
            window.location.href = window.location.href;
        } else {
            alert('notAuthenticated')
            //notAuthenticated();
        }
        
    });
}
keycloak.onAuthLogout = notAuthenticated;
keycloakinit();
