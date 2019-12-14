
function getCommentsNum($postId) {
    //console.log("getCommentsNum-postId:"+$postId);
    let $commentsNum=0;
    $.ajax({
        cache:false,
        async: false,
        url:"http://localhost:8080/post//countCommentsNum",//./sources/commentsNum.json
        type:"post",
        dataType:"json",
        data:{
            'postId':$postId,
        },
        success:function (data) {
            $commentsNum=data.commentsNum;
            //console.log($commentsNum);
            return $commentsNum;
        },
        error:function () {
        }
    });
    return $commentsNum;
}

function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function getAllPosts() {

    var token=localStorage.getItem("bbsNCU");

    var href=window.location.href;
    var param=getUrlParam(href);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/admin/findByPostUserId',
        contentType: "application/json",
        headers:{
            "token":token
        },
        dataType:"json",
        data:JSON.stringify({
            "userName":param
        }),
        success:function (jsonArray) {
            var post={};
            for(var i=0;i<jsonArray.size();i++){
                post.postTitle=jsonArray[i].postTitle;
                post.postCategoryName=jsonArray[i].postCategoryName;
                post.commentsNum=jsonArray[i].postId;
            }
        }

        })
}