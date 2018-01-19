'use struct';

/* 注册逻辑 */
// $("#datetimepicker").datetimepicker({format: 'yyyy-mm-dd'});

function checkForm(){
    var 
        /* --------------------必须信息--------------------- */
        userNameInput       = $("#text-username"),
        passwordOrigin      = $("#text-password-origin"),
        passwordEnsure      = $("#text-password-ensure"),
        born                = $("#datetimepicker"),

        /* --------------------非必须信息------------------- */
        addressDetail       = $("#text-address-detail"),
        company             = $("#text-company"),
        mobile              = $("#text-mobile"),
        email               = $("#text-email"),
        hobby               = $("#text-hobby");

    var userNameReg = new RegExp('^[0-9a-zA-Z]{9,16}$'); //用户名必须是9位数以上的数字或者英文字母
    
    /* 判断用户名的合法性 */
    if(userNameReg.test(userNameInput.val()) == false){
        var warnMsg = $("#helpBlockUserName");
        userNameInput.parent().addClass("has-error");
        warnMsg.css('color','#ff0000').text("用户名必须为9~16位的数字或者字符串");
        return false;
    }

    var passwordReg = new RegExp('^[0-9a-zA-Z]{9,20}$');

    /* 判断密码的合法性 */
    if(passwordReg.test(passwordOrigin.val()) == false){
        var warnMsg = $("#helpBlockPassword");
        passwordOrigin.parent().addClass("has-error");
        warnMsg.css('color','#ff0000').text("密码必须为9~20位的以大写字母开头的数字或者字符串");
        return false;
    }

    /* 判断两个密码是不是相等 */
    if(passwordReg.test(passwordEnsure.val()) == false || passwordEnsure.val() !== passwordOrigin.val()){
        var parent = passwordEnsure.parent();
        parent.addClass("has-error");
        $("#helpBlockPasswordEnsure").remove();//先删除
        passwordEnsure.after('<span id=\"helpBlockPasswordEnsure\" class=\"help-block\">密码不一致</span>');
        return false;
    }
    alert("成功");
    return false;
}