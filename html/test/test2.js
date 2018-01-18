'use strict';

document.write("<script type='text/javascript' src='httpHandle.js'></script>");  


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

/** 获取短信验证码 */
function getAuthCode(){
    var btnText = $("#getAuthcode-btn").text();
    if(btnText.indexOf("s后重试") === -1){
        sendAuthCode(); //发送验证码
        callbackTimer(60);
        return true;
    }else{
        return false;
    }
}

/** 发送验证码 */
function sendAuthCode(){
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


    var param = setParams('api.base.test','1.0.0');
    request.open('GET','http://pc.pavingstone.com/monitor/rest.do');
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(param);
}

/** 进行倒计时 */
function callbackTimer(time){
    if(time === 0){
        $("#getAuthcode-btn").removeClass("disabled").text("重新发送");
    }else{
        time--;
        $("#getAuthcode-btn").addClass("disabled").text(time + "s后重试");
        setTimeout(function() {
            callbackTimer(time)
           },
           1000);
        
    }
}

/** 校验短信验证码 */
function verifyAuthcode(){
    var localAuthCode  = $("#authCode");
    var remoteAuthCode = getRemoteAuthCode();
    
    if(localAuthCode.val() !== remoteAuthCode){
        var parent = localAuthCode.parent();
        parent.addClass("has-error");
        $("#localAuthCodeErrMsg").remove();//先删除
        localAuthCode.after('<span id=\"localAuthCodeErrMsg\" class=\"help-block\">验证码错误</span>');
        return false;
    }
    setInterval("redirect()",1);//验证码验证成功之后跳往
    return true;
}

/** 获取服务端的验证码 */
function getRemoteAuthCode(){
    return 123;
}


function redirect(){
    location.href='test1.html'; 
}
