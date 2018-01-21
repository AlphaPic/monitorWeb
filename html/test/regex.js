'use strict';

/** 校验邮件的格式 */
function checkEmailSystax(){
    var emailReg = new RegExp('^[0-9a-z.]+@[a-z0-9]+\.(com|org)$');

    if(arguments.length !== 1){
        return false;
    }

    var emailNum = arguments[0];

    return emailReg.test(emailNum);
}

/** 校验手机的格式 */
function checkMobileSyntax(){
    var mobileReg = new RegExp('^1[0-9]{10}$');
    if(arguments.length !== 1){
        return false;
    }
    var mobileNum = arguments[0];
    
    return mobileReg.test(mobileNum);
}

/** 验证码校验 */
function checkAuthCode(authCode){
    if(authCode == null){
        return false;
    }

    var authCodeReg = new RegExp("[a-z0-9]{8}");

    return authCodeReg.test(authCode);
}