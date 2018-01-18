'use strict';

/** 设置请求的参数 */
function setParams(method,version){
    if(arguments.length < 2 || arguments.length > 3){
        return "";
    }
    var basicReq = "method=" + method + "&version=" + version;
    
    alert(basicReq);
    if(arguments.length === 2){
        return basicReq;
    }

    
    /** 遍历参数 */
    var paramObj  = JSON.parse(arguments[2]);
    for(var key in paramObj){
        var member = "&" + key + "=";
        member += paramObj[key];
        basicReq += member;
    }
    return basicReq;
}