'use strict';

/** 引入功能js文件 */
document.write("<script type='text/javascript' src='httpHandle.js'></script>");  
document.write("<script type='text/javascript' src='regex.js'></script>");

/** 相应下拉框的响应事件 */
function show_payee(){
    var focusValue = $("#contract-way").val();
    var inputText  = $("#contract-text");
    if(focusValue === 'mobile'){
        inputText.attr('placeholder','Enter Mobile');
    }else if(focusValue === 'email'){
        inputText.attr('placeholder','Enter Email');
    }else{
        return false;
    }
    return true;
}

/** ---------------------------------------获取验证码---------------------------------------- */
/** 获取短信验证码 */
function getAuthCode(){
    var registryWay = $('#contract-way').val();
    var registryNum = $('#contract-text');
    var root =  registryNum.parent();
    var channelErrTips = $('#channelErrTips');
    if(registryWay === "mobile"){
        if(checkMobileSyntax(registryNum.val()) == false){
            /** 设置提示 */
            root.addClass('has-error');
            if(channelErrTips !== null){
                channelErrTips.remove();
            }
            registryNum.after('<span id=\"channelErrTips\" class=\"help-block\">手机格式不对</span>');
            return false;
        }
    }else if(registryWay === "email"){
        if(checkEmailSystax(registryNum.val()) === false){
            /** 设置提示 */
            root.addClass('has-error');
            if(channelErrTips !== null){
                channelErrTips.remove();
            }
            registryNum.after('<span id=\"channelErrTips\" class=\"help-block\">邮箱格式不对</span>');
            return false;
        }
    }else{
        return false;
    }
    var btnText = $("#getAuthcode-btn").text();
    if(btnText.indexOf("s后重试") === -1){
        sendAuthCode(registryWay,registryNum.val()); //发送验证码
        callbackTimer(60);
        return true;
    }else{
        return false;
    }
}

/** 发送验证码 */
function sendAuthCode(type,channel){
    if(arguments.length !== 2){
        return false;
    }
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status === 200){
                success("success");
            }else {
                fail("fail");
            }
        }else{

        }
    }


    var paramObj = {
        method:'api.user.registry.getAuthCode',
        version:'1.0.0',
        registryType:type,
        mobile:type === "mobile" ? channel : null,
        email:type === "email" ? channel : null
    };
    var paramString = setParams(paramObj);
    console.log(paramString);
    request.open('GET','http://pc.pavingstone.com/monitor/rest.do?' + paramString,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send();
    return true;
}

/** 发送验证码成功处理方法 */
function success(){
    alert("success");
}

/** 发送验证码失败处理方法 */
function fail(){
    alert("fail");
}

/** 进行倒计时 */
function callbackTimer(time){
    if(time === 0){
        $("#getAuthcode-btn").removeClass("disabled").text("重新发送");
    }else{
        time--;
        $("#getAuthcode-btn").addClass("disabled").text("已发送" + time + "s后重试");
        setTimeout(function() {
            callbackTimer(time)
           },
           1000);
        
    }
}

/** 文本框值改变事件 */
$(document).on('ready',function(){ 
    $("#contract-text").on("input", function () {
        // 捕捉事件并响应
        var inputChannel = $('#contract-text');
        
        if(inputChannel !== null){
            var father = $('#text-div');
            if(father.hasClass('has-error') === true){
                father.removeClass('has-error');
                $('#channelErrTips').remove();
            }
        }
    });
});


/** ---------------------------------------校验验证码---------------------------------------- */
/** 校验短信验证码 */
function verifyAuthcode(){
    var localAuthCode  = $("#authCode");
    
    remoteAuthCodeCheck(localAuthCode.val());
    
    /** 不管如何，都需要将按钮置为不可用状态 */
    var verifyBtn = $("#login-btn");
    verifyBtn.attr("disabled","disabled");
    verifyBtn.text("正在校验,请稍后...");

    return false;
}

/** 验证服务端的验证码 */
function remoteAuthCodeCheck(authCodeParam,alphaCookieParam){

    /** 校验验证码 */
    if(checkAuthCode(authCodeParam) == false){
        return false;
    }

    /** 判断传入的参数中有没有cookie，没有的话拿浏览器中的cookie进行传入 */
    if(alphaCookieParam === null || alphaCookieParam === undefined){
        alphaCookieParam = getLocalCookie();
    }

    return false;

    var paramObj = {
        method:'api.user.registry.verifyRegistryCode',
        version:'1.0.0',
        alphaCookie:1,
        authCode:authCodeParam,
    }

    /** 进行校验的请求 */
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status === 200){
                checkSuccess();
            }else {
                checkFail();
            }
        }else{

        }
    }
    

    var paramString = setParams(paramObj);
    console.log(paramString);
    try {
        request.open('POST','http://pc.pavingstone.com/monitor/rest.do?');
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(paramString);
    } catch (error) {
        console.log(error);
    }

    return true;
}

/** 校验成功, 重定向到注册详情的页面 */
function checkSuccess(){
    setInterval("redirect()",1);//验证码验证成功之后跳往
}

/** 校验失败 */
function checkFail(){
    var localAuthCode  = $("#authCode");
    var parent = localAuthCode.parent();
    parent.addClass("has-error");
    $("#localAuthCodeErrMsg").remove();//先删除
    localAuthCode.after('<span id=\"localAuthCodeErrMsg\" class=\"help-block\">验证码错误</span>');
    $("#login-btn").text("校验").removeAttr("disabled");//移除禁用属性，使其可以再次使用
    return false;
}


/** 重定向到一个新的页面 */
function redirect(){
    location.href='test1.html'; 
}


