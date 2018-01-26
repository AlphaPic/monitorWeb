'use strict';

/** 基本的请求对象 */
var baseRequestParam = {
    method:'method',
    version:'version'
};

/** 创建基本的请求对象 */
function createBaseRequestParam(method,version){
    var s = Object.create(baseRequestParam);
    s.method  = method;
    s.version = version;
    return s;
}

/** 设置请求的参数 */
function setParams(paramObj){
    if(arguments.length !== 1){
        return "";
    }
    
    if(("method" in paramObj === false) || ("version" in paramObj === false)){
        return "";
    }

    
    /** 设置所有方法的基本信息 */
    var requestString = "method=" + paramObj["method"] + "&version=" + paramObj["version"];

    for(var key in paramObj){
        if(key === "method" || key === "version"){
            continue;
        }
        var value = paramObj[key];
        var elem = key + "=" + value;
        requestString += "&" + elem;
    }
    return requestString;
}

/** 获取浏览器中的cookie */
function getLocalCookie(){
    var cookies = document.cookie;
    var arr = cookies.split(";");
    // for()
    return "";
}



/** 一个基本的promise请求 */
function ajax(method,url,data){
    var request = new XMLHttpRequest();
    return new Promise(function(success,fail){
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200){
                    success(request.responseText);
                }else{
                    fail(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}