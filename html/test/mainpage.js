'use strict';

/** 展示请求链接的详情 */
function showRequestDetail(){
    alert("好的，我会展开的");
}

/** 增加请求的div块 */
function createRequestDiv(lastRequestNodeId){
    var arr = lastRequestNodeId.split('-');
    var prevId = arr[0] + "-" + (parseInt(arr[1],10) + 1);
    var requestElem = '<div class=\"request-link-detail\" id=\"' + prevId + '\"><button class="btn btn-default btn-req" onclick="showRequestDetail()"><span class="fui-arrow-left"></span></button></div>';

    return requestElem;
}

/** 预览页面 */
function previewPage(){
    var root = $("#preview-pane");
    root.empty();
    /** 创建基本信息节点 */
    var baseInfoString = '<div class="api-basic-info-edit-layout"></div>';

    root.append(baseInfoString);

    var baseInfoNode = $(".api-basic-info-edit-layout");

    baseInfoNode.append(`<table class="table table-bordered table-condensed" id="baseinfo-table">\
                            <thead>\
                                <tr>\
                                    <th>名称</th>\
                                    <th>说明</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <th>API</th>\
                                    <th>${$("#input-api-name").val()}</th>\
                                </tr>\
                                <tr>\
                                    <th>版本号</th>\
                                    <th>说明</th>\
                                </tr>\
                                <tr>\
                                    <th>作者</th>\
                                    <th>说明</th>\
                                </tr>\
                                <tr>\
                                    <th>调用方式</th>\
                                    <th>说明</th>\
                                </tr>\
                            </tbody>\
                        </table>`);
    
}


/** 事件监听器 */
$(document).on('ready',function(){ 

    var addListener = $("#addRequestBtn").click(function (){
        var parent = $(this).parent();

        /** 获取父节点的前一个节点 */
        var lastRequestNode   = parent.prev(".request-link-detail");
        var lastRequestNodeId = lastRequestNode.attr("id"); 

        var newNode = createRequestDiv(lastRequestNodeId);
        if(newNode !== null || newNode !== undefined || newNode !== ""){
            parent.before(newNode);
        }
        $("#showRequestDetail-2").on(expressListener);
    });

    $("#preview-pane").on('change',function(){
        alert("asda");
    });

    /** 预览tab,加载编辑页面的元素 */
    $("#preview-tab").click(function(){
        previewPage();
    });
    
    /** 编辑tab */
    $("#edit-tab").click(function(){
        console.log("edit");
    });
});