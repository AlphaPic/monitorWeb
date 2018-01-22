'use strict';

document.write("<script type='text/javascript' src='httpHandle.js'></script>");
document.write("<script type='text/javascript' src='lib/encriptUtil/sha256.js'></script>");

/** 登录 */
function login(){
    var login = $("#login-btn");

    var userNameInfo = $("#username");
    var passwordInfo = $("#password");

    /** 对用户名进行判空处理 */
    if(userNameInfo.val() === null || userNameInfo.val() === undefined || userNameInfo.val() === ""){
        var parent = userNameInfo.parent();
        parent.addClass("has-error");
        var userNameErrorTip = $("#userNameErrorTip");
        userNameErrorTip.remove();
        parent.append('<span id=\"userNameErrorTip\" class=\"help-block\">用户名不能为空</span>');
        return false;
    }

    /** 对密码进行判空处理 */
    if(passwordInfo.val() === null || passwordInfo.val() === undefined || passwordInfo.val() === ""){
        var parent = passwordInfo.parent();
        parent.addClass("has-error");
        var passwordErrorTip = $("#passwordErrorTip");
        passwordErrorTip.remove();
        parent.append('<span id=\"passwordErrorTip\" class=\"help-block\">密码不能为空</span>');
        return false;
    }

    login.text("正在登录,请稍后...").attr("disabled","disabled");

    var paramObj = createBaseRequestParam("","1.0.0");
    paramObj.userName = userNameInfo.val();
    paramObj.password = getHashNumber(passwordInfo.val());

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status === 200){
                loginSucceed(request.response);
            }else {
                loginFailed(request.response);
            }
        }else{

        }
    }

    var paramString = setParams(paramObj);
    request.open('POST','http://pc.pavingstone.com/monitor/rest.do?',true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(paramString);
    return false;
}

/** 获取密码的hash */
function getHashNumber(password){
    if(password === null || password === undefined || password === ""){
        return null;
    }

    return sha256(password);
}

/** 登录成功 */
function loginSucceed(response){
    setInterval("mainpage.html",1);//验证码验证成功之后跳往
}

/** 登录失败 */
function loginFailed(response){
    $("#login-btn").text("登录").removeAttr("disabled");
    var parent = $("#login-btn").parent();
    $("#username").parent().addClass("has-error");
    $("#password").parent().addClass("has-error");
    parent.append("<span id=\"loginErrorTip\" class=\"help-block\">用户名或者密码错误</span>");
}


/** -----------------------------------------------------------响应事件----------------------------------------------------------- */
$(document).on('ready',function(){ 
    /** 用户名输入框 */
    $("#username").on("input", function () {
        // 捕捉事件并响应
        var userNameInput = $('#username');
        
        if(userNameInput.text() !== null){
            var father = userNameInput.parent();
            if(father.hasClass('has-error') === true){
                father.removeClass('has-error');
                $('#userNameErrorTip').remove();
            }
        }

        $("#loginErrorTip").remove();
    });

    /** 密码输入框 */
    $("#password").on("input", function () {
        // 捕捉事件并响应
        var passwordInput = $('#password');
        
        if(passwordInput.text() !== null){
            var father = passwordInput.parent();
            if(father.hasClass('has-error') === true){
                father.removeClass('has-error');
                $('#passwordErrorTip').remove();
            }
        }

        $("#loginErrorTip").remove()
    });
});