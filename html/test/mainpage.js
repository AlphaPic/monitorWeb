'use strict';

/** 引入功能js文件 */
document.write("<script type='text/javascript' src='httpHandle.js'></script>");

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

/** 查找vo对象值的api */
function searchApi(keyVal,searchType){
    if(keyVal === null || keyVal === undefined || keyVal === "" || searchType === null || searchType === undefined || searchType === ""){
        return false;
    }

    var methodValue = (searchType === 'request' ? 'api.com.vo.getRequestInfo' : (searchType === 'response' ? 'api.com.vo.getResponseInfo' : null))
    var requestParam = {
        method:methodValue,
        version:"1.0.0",
        className:keyVal
    }
    var requestString = setParams(requestParam);
    var p = ajax('GET','http://pc.pavingstone.com/monitor/rest.do?' + requestString);    
    p.then(function(text){
        showVoTable(text);
    }).catch(function(status){
        alert(status);
    });
}

/** 显示vo的table */
function showVoTable(text){
    /** 解析json */
    var jsonObj = JSON.parse(text);
    var root    = $("#vo-table-info");

    root.empty();//请求root中的所有组件
    if(jsonObj.date.voTypeInfo === "request"){
        
        var head = `<div class="request-reponse-edit-layout">
                        <table class="table table-bordered">
                            <thead class="table-head-color">
                                <tr>
                                    <th>名称</th>
                                    <th>类型</th>
                                    <th>说明</th>
                                    <th>样例值</th>
                                </tr>
                            </thead>
                            <tbody>
                            `;
        var body = '';
       
        /** 遍历获取到的信息，然后放在table之中 */
        var bodyList = jsonObj.date.requestInfoList;
        for(var elem in bodyList){
            var bodyElem = '<tr>';
            bodyElem += '<td>' + bodyList[elem].name + '</td>';
            bodyElem += '<td>' + bodyList[elem].type + '</td>';
            bodyElem += '<td>' + bodyList[elem].description + '</td>';
            bodyElem += '<td>' + bodyList[elem].demoval + '</td>';
            bodyElem += '</tr>';
            body += bodyElem;
        }
        var tail = `</tbody>
                </table>
            </div>`
        root.append(head + body + tail);
    }else if(jsonObj.date.voTypeInfo === "response"){
        var head = `<div class="request-reponse-edit-layout">
                        <table class="table table-bordered">
                            <thead class="table-head-color">
                                <tr>
                                    <th>名称</th>
                                    <th>类型</th>
                                    <th>说明</th>
                                </tr>
                            </thead>
                            <tbody>
                            `;
                            var body = '';
       
        /** 遍历获取到的信息，然后放在table之中 */
        var bodyList = jsonObj.date.responseInfoList;
        for(var elem in bodyList){
            var bodyElem = '<tr>';
            bodyElem += '<td>' + bodyList[elem].name + '</td>';
            bodyElem += '<td>' + bodyList[elem].type + '</td>';
            bodyElem += '<td>' + bodyList[elem].description + '</td>';
            bodyElem += '</tr>';
            body += bodyElem;
        }
        var tail = `</tbody>
                </table>
            </div>`
        root.append(head + body + tail);                    
    }else if(jsonObj.date.voTypeInfo === "basicClass"){

    }else{
        alert("查不到你现在正在搜索的类型");
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
        var keyCode    = event.keyCode;
        var searchType = $('#api-search').attr('searchType'); 
        var keyVal     = $(this).val();

        if(keyCode !== 13){
            return true;
        }else{
            searchApi(keyVal,searchType);
            return false;
        }
    });

    /** 请求按钮按下事件 */
    $("#RopRequest-btn").click(function(){
        $("#vo-table-info").empty();
        $("#api-search").attr('placeholder','Enter request name...').attr('searchType','request');
    });

    /** 响应按钮按下事件 */
    $("#RopResponse-btn").click(function(){
        $("#vo-table-info").empty();
        $("#api-search").attr('placeholder','Enter response name...').attr('searchType','response');
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