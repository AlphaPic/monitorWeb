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
        addressDetail       = $("#text-address-detail").val(),
        company             = $("#text-company").val(),
        mobile              = $("#text-mobile").val(),
        email               = $("#text-email").val(),
        hobby               = $("#text-hobby").val();

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

    var parent = passwordEnsure.parent();
    /* 判断两个密码是不是相等 */
    if(passwordReg.test(passwordEnsure.val()) == false || passwordEnsure.val() !== passwordOrigin.val()){
        parent.addClass("has-error");
        $("#helpBlockPasswordEnsure").remove();//先删除
        passwordEnsure.after('<span id=\"helpBlockPasswordEnsure\" class=\"help-block\">密码不一致</span>');
        return false;
    }else{
        $("#helpBlockPasswordEnsure").remove();
        parent.removeClass("has-error");
    }

    /** 获取注册性别 */
    var sex = $("input[name='optionsRadios']:checked");
    if(sex.val() === undefined || sex.val() === null){
        $(".sex-not-selected").removeAttr("hidden");
        return false;
    }
    
    /** 获取国籍 */
    var country  = $("#select-country").val() === "请选择" ? null : $("#select-country").val();
    var province = $("#select-province").val() === "请选择" ? null : $("#select-province").val();
    var city     = $("#select-city").val() === "请选择" ? null : $("#select-city").val();
    
    /** 注册 */
    registry();

    $("#registry-btn").text("正在注册,请稍后...").attr("disabled","disabled");
    return false;
}

/** 性别按钮的选中事件 */
$(document).on('ready',function(){ 
    /** 性别的选择事件 */
    $("input[name='optionsRadios']").change(function () {
        //隐藏提示
        $(".sex-not-selected").attr("hidden","");
    });

    /** 国家的选择事件 */
    $("#select-country").change(function(){
        /** 删除省份和城市的所有信息 */
        var country = $("#select-country");

        getProvinceByCountry();
    });

    /** 省份的选择事件 */
    $("#select-province").change(function(){
        var province = $("#select-province");

        getCityByProvince();
    });
});

/** 通过国家来选择省份 */
function getProvinceByCountry(){

}

/** 通过省份来选择城市 */
function getCityByProvince(){

}

/** 注册参数 */
function registry(){

}