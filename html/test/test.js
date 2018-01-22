'use strict';

/** 登录 */
function login(){
    var login = $("#login-btn");
    login.text("正在登录,请稍后...").attr("disabled","disabled");
    return false;
}
