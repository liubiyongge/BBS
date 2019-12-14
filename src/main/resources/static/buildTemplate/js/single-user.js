
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
            console.log("false");
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
function addSvg(){
    let $html="<div class=\"tt-col-avatar\">\n" +
        "                                <svg class=\"tt-icon\">\n" +
        "                                  <use xlink:href=\"#icon-ava-d\"></use>\n" +
        "                                </svg>\n" +
        "                            </div>";
    $("#tt1").append($html)
}
function addPostToList(post){
    let $html="" +
        "                            <div class=\"tt-col-description\">\n" +
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
        "                            <div class=\"tt-col-value tt-color-select  hide-mobile\">"+post.commentsNum+"</div>\n" +
        "                            <!--<div class=\"tt-col-value hide-mobile\">1h</div>-->\n" +
        "";
    $("#tt1").append($html);
}
function getAllPosts() {
    $("#tt1").empty();
    var token=localStorage.getItem("bbsNCU");

    var param=getUrlParam("userName");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/User/findByPostUserId',
        contentType: "application/json",
        headers:{
            "token":token
        },
        dataType:"json",
        data:JSON.stringify({
            "userName":param
        }),
        success:function (jsonArray) {
            console.log(jsonArray);
            addSvg();
            var post={};
            for(var i=0;i<jsonArray.length;i++){
                post.postTitle=jsonArray[i].postTitle;
                post.postCategoryName=jsonArray[i].postCategoryName;
                console.log(getCommentsNum(jsonArray[i].postId));
                console.log(getCommentsNum(2));
                var num=getCommentsNum(jsonArray[i].postId);
                post.commentsNum=num;
                addPostToList(post);
            }
        }

        })
}
getAllPosts();