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
