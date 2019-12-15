function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
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

    var param=parseJwt(token).userName;
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

function addCategoryToList(category,categoryId){
    let html="<div class=\"col-md-6 col-lg-4\">\n" +
        "                                    <div class=\"tt-item\">\n" +
        "                                        <div class=\"tt-item-header\">\n" +
        "                                            <ul class=\"tt-list-badge\">\n" +
        "                                                <li><a href=\"#\"><span class=\"tt-color03 tt-badge\">"+category.categoryName+"</span></a></li>\n" +
        "                                            </ul>\n" +
        "                                            <h6 class=\"tt-title\"><a href=\"page-categories-single.html?&categoryId="+category.categoryId+"\" style='color:#ff8d46'>点此进入栏目</a></h6>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"tt-item-layout\">\n" +
        "                                           <div class=\"innerwrapper\">\n" +
        "                                               在此分享你的 "+ category.categoryName+" 趣事.\n" +
        "                                           </div>\n" +
        "                                           <div class=\"innerwrapper\">\n" +
        // "                                                <h6 class=\"tt-title\">Similar TAGS</h6>\n" +
        // "                                                <ul class=\"tt-list-badge\">\n" +
        // "                                                    <li><a href=\"#\"><span class=\"tt-badge\">world politics</span></a></li>\n" +
        // "                                                    <li><a href=\"#\"><span class=\"tt-badge\">human rights</span></a></li>\n" +
        // "                                                    <li><a href=\"#\"><span class=\"tt-badge\">trump</span></a></li>\n" +
        // "                                                    <li><a href=\"#\"><span class=\"tt-badge\">climate change</span></a></li>\n" +
        // "                                                    <li><a href=\"#\"><span class=\"tt-badge\">foreign policy</span></a></li>\n" +
        // "                                                </ul>\n" +
        "                                           </div>\n" +
        "                                           <a href=\"#\" class=\"tt-btn-icon\">\n" +
        "                                                <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-favorite\"></use></svg></i>\n" +
        "                                            </a>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>";
    $("#clearCategory").append(html);
}

function addHintCategoryToList(){
    $("#clearCategory").append("抱歉，您不是版主，没有管理的栏目");
}
function findCategory(){
    $("#clearCategory").empty();
    var token=localStorage.getItem("bbsNCU");
    var param=parseJwt(token).userName;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/User/findByCategoryUserId',
        contentType: "application/json",
        headers:{
            "token":token
        },
        dataType:"json",
        data:JSON.stringify({
            "userName":param
        }),
        success:function (jsonArray) {
            if(jsonArray.length>0){
                console.log(jsonArray);
                var category={};
                for(var i=0;i<jsonArray.length;i++){
                    category.categoryName=jsonArray[i].categoryName;
                    category.categoryId=jsonArray[i].categoryId;
                    category.postCategoryName=jsonArray[i].postCategoryName;
                    addCategoryToList(category);
                }
            }
            else{
                addHintCategoryToList();
            }
        }

    })
}
getAllPosts();
findCategory();
