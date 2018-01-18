'use strict';

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
        callbackTimer(60);
        return true;
    }else{
        return false;
    }
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