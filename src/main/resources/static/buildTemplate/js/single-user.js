
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
function addPostToList(post){
    $("#needClear").append("<div class=\"tt-col-description\">\n" +
        "                               <h6 class=\"tt-title\"><a href=\"#\">\n" +
        "                                   <!--前面的小图标可省-->\n" +
        "                                    <!--<svg class=\"tt-icon\">-->\n" +
        "                                      <!--<use xlink:href=\"#icon-pinned\"></use>-->\n" +
        "                                    <!--</svg>-->\n" +
                                            post.postTitle +
        "                                </a></h6>\n" +
        "                                <!--可删？下面的1h不明-->\n" +
        "                                <!--<div class=\"row align-items-center no-gutters\">-->\n" +
        "                                    <!--<div class=\"col-11\">-->\n" +
        "                                        <!--<ul class=\"tt-list-badge\">-->\n" +
        "                                            <!--<li class=\"show-mobile\"><a href=\"#\"><span class=\"tt-color01 tt-badge\">politics</span></a></li>-->\n" +
        "                                            <!--<li><a href=\"#\"><span class=\"tt-badge\">contests</span></a></li>-->\n" +
        "                                            <!--<li><a href=\"#\"><span class=\"tt-badge\">authors</span></a></li>-->\n" +
        "                                        <!--</ul>-->\n" +
        "                                    <!--</div>-->\n" +
        "                                    <!--<div class=\"col-1 ml-auto show-mobile\">-->\n" +
        "                                        <!--<div class=\"tt-value\">1h</div>-->\n" +
        "                                    <!--</div>-->\n" +
        "                                <!--</div>-->\n" +
        "                            </div>\n" +
        "                            <div class=\"tt-col-category\"><span class=\"tt-color01 tt-badge\">"+post.postCategoryName+"</span></div>\n" +
        "                            <div class=\"tt-col-value hide-mobile\">？？？</div>\n" +
        "                            <div class=\"tt-col-value tt-color-select  hide-mobile\">？？？</div>\n" +
        "                            <div class=\"tt-col-value hide-mobile\">15.1k?</div></div>")
}
function getAllPosts() {

    var token=localStorage.getItem("bbsNCU");

    var href=window.location.href;
    var param=getUrlParam(href);
    $("#needClear").clear();
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
                post.commentsNum=getCommentsNum(jsonArray[i].postId);
            }
        }

        })
}