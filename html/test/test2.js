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
        // callbackTimer(60);
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