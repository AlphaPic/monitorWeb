'use strict';

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
    delete paramObj["method"];
    delete paramObj["version"];

    for(var key in paramObj){
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