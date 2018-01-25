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
    /** 创建基本信息节点 */
    var baseInfoString = '';

    root.append(baseInfoString);

    var baseInfoNode = $(".api-basic-info-edit-layout");

    baseInfoNode.append(``);

    /** 创建请求和响应参数节点 */

    /** 创建请求链接节点 */
}

/** 查找api */
function searchApi(keyVal){
    if(keyVal === null || keyVal === undefined || keyVal === ""){
        return false;
    }

    
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

    /** api查找框 */
    $("#api-search").on("input", function () {
        
    });

    /** 查找框响应回车键 */
    $("#api-search").keypress(function(){
        var keyCode = event.keyCode;
        var keyVal  = $(this).val();

        if(keyCode !== 13){
            return true;
        }else{
            searchApi(keyVal);
            return false;
        }
    });

    /** 请求按钮按下事件 */
    $("#RopRequest-btn").click(function(){
        // alert("hello");
    });

    /** 响应按钮按下事件 */
    $("#RopResponse-btn").click(function(){
        // alert("hello");
    });

    $(function () {
        $('[data-toggle=tooltip]').tooltip();
    });

    

    /** 查找模态框的显示 */
    $('#searchModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        // modal.find('.modal-title').text('Enter The ' + recipient)
        // modal.find('.modal-body input').val(recipient)
      })
});