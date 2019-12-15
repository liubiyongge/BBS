$(function () {
  var p=GetRequest();
  var $categoryId=p["categoryId"];
  getCategoryPosts($categoryId);
  /*管理权限*/
  $(".manage").hide();
  $(".manage-content").hide();
  var $categoryUserId=getCategoryUserId($categoryId);
  if (((user.userId===$categoryUserId&&user.type===1)||user.type===2)&&token!=null){
    $(".manage").show();
    $(".manage-content").show();
  }else{
    $(".manage").hide();
    $(".manage-content").hide();
  }
  /*点击帖子进入帖子详情页*/
  $(".category-post-list").delegate(".tt-col-description","click",function (evt) {
    let page="page-single-topic.html?";
    let $postId=$(evt.target).parents(".tt-col-description").find(".tt-value").text();
    let para="&postId="+$postId;/*"userName="+user.userName+*/
    let path=page+para;
    $(".tt-col-description a").attr("href",path);
  });
  /*帖子管理-版主和管理员可操作*/
  /*删除*/
  $(".category-post-list").delegate(".manage-content a.delete","click",function (evt) {
    if (token==null||token==="null"){
      alert("请先登录");
      window.location.href="page-login.html";
    }
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    deletePost($postId);
    getCategoryPosts($categoryId);
  });
  /*置顶*/
  $(".category-post-list").delegate(".manage-content a.top","click",function (evt) {
    if (token==null||token==="null"){
      alert("请先登录");
      window.location.href="page-login.html";
    }
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    //console.log($postId);
    toTop($postId);
    getCategoryPosts($categoryId);
  });
  /*加精*/
  $(".category-post-list").delegate(".manage-content a.highlight","click",function (evt) {
    if (token==null||token==="null"){
      alert("请先登录");
      window.location.href="page-login.html";
    }
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    //console.log($postId);
    toHighlight($postId);
    getCategoryPosts($categoryId);
  });
});


/*获取本栏目所有的帖子*/
function getCategoryPosts($categoryId) {
  //console.log("getCategoryPosts");
  /*清空节点*/
  $(".category-post-list").empty();
  /*获取栏目名*/
  let $categoryName=getCategoryName($categoryId);
  //console.log($categoryName);
  /*显示标题栏*/
  showCategoryTitle($categoryId,$categoryName);
  showCategoryPostListHeader();
  $.ajax({
    cache:false,
    async:false,
    url:"/post/postInCategory",
    type:"post",
    dataType: "json",
    data:{
      'categoryId':$categoryId,
    },
    success:function (data) {/*要求返回的数据data已按回复数排序*/
      /*加载帖子列表项*/
      var post={};
      for (let i=0;i<data.length;i++){
        post.postId=data[i].postId;
               post.commentsNum=getCommentsNum(post.postId);/*热度(回复数)*/
        // console.log("post.commentsNum:"+post.commentsNum);
        post.postUserId=data[i].postUserId;
        //setTimeout(function () {
                post.postUserName=getUserName(post.postUserId);
        //},20);
                post.postUserHeader=getUserHeader(post.postUserId);
        post.postCategoryId=data[i].postCategoryId;/*所属栏目的id*/
        //setTimeout(function () {
        post.postCategoryName=getCategoryName(post.postCategoryId);/*所属栏目的名称*/
        //},20);
        //console.log("post.postCategoryName:"+post.postCategoryName+i);
        post.postTitle=data[i].postTitle;
        post.postContent=data[i].postContent;
        post.postContentBrief=post.postContent; /*取内容的前8个字做内容简介*/
        if (post.postContent.length>=15){
          post.postContentBrief=post.postContent.substr(0,15)+"...";
        }
        post.postScore=data[i].postScore;
        post.postPhoto=data[i].postPhoto;
        post.highlight=data[i].highlight;/*是否加精*/
        post.top=data[i].top;/*是否置顶*/
        post.postTime=data[i].postTime.substr(0,10);
      //  post.postTime=post.postTime.split("T")[0]+" "+post.postTime.split("T")[1];
        post.postType=data[i].postType;/*是否需求贴*/
        post.icon_1=String.fromCharCode(97+parseInt(post.postCategoryId));/*帖子项中第一个有颜色图标的类名后缀*/
        post.icon_2=post.postCategoryId;/*帖子项中第2个有颜色图标的类名后缀*/
        if (post.postCategoryId.length>=2){
          post.icon_2=post.postCategoryId.substr( post.icon_2=post.postCategoryId.length-2);
          if (post.icon_2>21){
            //console.log(post.icon_2);
            post.icon_2="0"+Math.ceil(post.icon_2/21);
          }else if (post.icon_2==="00"){
            post.icon_2=21;
          }
        }
        else {
          post.icon_2="0"+post.postCategoryId;
        }
        if (post.icon_2==="10"){
          post.icon_2="06";
        }
        //post.icon_1=String.fromCharCode(97+parseInt(post.postCategoryId));
        addCategoryPostToList(post);
      }
    },
    error:function () {
      alert("加载帖子列表失败...");
    }
  });
}
/*在页面上创建一条帖子*/
function addCategoryPostToList(post) {
  /*需求贴、普通帖*/
  var $postType="";
  if (post.top===1){
    $postType="置顶帖";
    post.icon_2="08";
  }else if (post.highlight===1){
    $postType="精华帖";
    post.icon_2="16";
  }else if (post.postType===1){
    $postType="积分贴";
    post.icon_2="20";
  }else {
    $postType="普通贴";
  }
  /*是否是置顶帖*/
  //let $top="";
  if (post.top===1){
    let $html=" <div class=\"tt-item tt-itemselect\" id=\"\">\n" +
        "                <div class=\"tt-col-avatar\"><svg class=\"tt-icon\"><img src=\""+post.postUserHeader+"\" alt=\"postUserHeader\" class=\"postUserHeader\"></svg></div>\n" +
        "                <div class=\"tt-col-description\">\n" +
        "                    <h6 class=\"tt-title\"><a href=\"page-single-topic.html\">\n" +
        "                      <svg class=\"tt-icon\"><use xlink:href=\"#icon-pinned\"></use></svg>\n" +post.postTitle+
        "                    </a></h6>\n" +
        "                    <div class=\"row align-items-center no-gutters\">\n" +
        "                        <div class=\"col-11\">\n" +
        "                            <ul class=\"tt-list-badge\">\n" +
        "                                <li class=\"show-mobile\"><a href=\"javascript:;\"><span class=\"tt-color05 tt-badge\">"+post.postCategoryName+"</span></a></li>\n" +
        "                                <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+post.postUserName+"</span></a></li>\n" +
        "                                <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+post.postContentBrief+"</span></a></li>\n" +
        "                            </ul>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-1 ml-auto show-mobile\"><div class=\"tt-value\">"+post.postId+"</div></div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"tt-col-category\"><span class=\"tt-color03 tt-badge\">"+$postType+"</span></div>\n" +
        "                <div class=\"tt-col-value  hide-mobile\"></div>\n" +
        "                <div class=\"tt-col-value tt-color-select  hide-mobile\">"+post.commentsNum+"</div>\n" +
        "                <div class=\"tt-col-value  hide-mobile wirte-time\">"+post.postTime+"</div>\n" +
        "                <div class=\"tt-col-value hide-mobile manage-content\">\n" +
        "                  <a href=\"javascript:;\" class=\"delete\">删除</a><br>\n" +
        "                  <a href=\"javascript:;\" class=\"top\">置顶</a><br>\n" +
        "                  <a href=\"javascript:;\" class=\"highlight\">加精</a>\n" +
        "                </div>\n" +
        "            </div>"
    $(".topArea1").append($html);
  }
  else {
    //console.log(post.postUserHeader);
    let $html=" <div class=\"tt-item \" id=\"\">\n" +
        "                <div class=\"tt-col-avatar\"><svg class=\"tt-icon\"><img src=\""+post.postUserHeader+"\" alt=\"postUserHeader\" class=\"postUserHeader\"></svg></div>\n" +
        "                <div class=\"tt-col-description\">\n" +
        "                    <h6 class=\"tt-title\"><a href=\"page-single-topic.html\">\n" +
        "                      <svg class=\"tt-icon\"><use xlink:href=\"#icon-pinned\"></use></svg>\n" +post.postTitle+
        "                    </a></h6>\n" +
        "                    <div class=\"row align-items-center no-gutters\">\n" +
        "                        <div class=\"col-11\">\n" +
        "                            <ul class=\"tt-list-badge\">\n" +
        "                                <li class=\"show-mobile\"><a href=\"#\"><span class=\"tt-color05 tt-badge\">"+post.postCategoryName+"</span></a></li>\n" +
        "                                <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+post.postUserName+"</span></a></li>\n" +
        "                                <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+post.postContentBrief+"</span></a></li>\n" +
        "                            </ul>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-1 ml-auto show-mobile\"><div class=\"tt-value\">"+post.postId+"</div></div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"tt-col-category\"><span class=\"tt-color"+post.icon_2+" tt-badge\">"+$postType+"</span></div>\n" +
        "                <div class=\"tt-col-value  hide-mobile\"></div>\n" +
        "                <div class=\"tt-col-value tt-color-select  hide-mobile\">"+post.commentsNum+"</div>\n" +
        "                <div class=\"tt-col-value  hide-mobile wirte-time\">"+post.postTime+"</div>\n" +
        "                <div class=\"tt-col-value hide-mobile manage-content\">\n" +
        "                  <a href=\"javascript:;\" class=\"delete\">删除</a><br>\n" +
        "                  <a href=\"javascript:;\" class=\"top\">置顶</a><br>\n" +
        "                  <a href=\"javascript:;\" class=\"highlight\">加精</a>\n" +
        "                </div>\n" +
        "            </div>"
    $(".category-post-list").append($html);
  }

}
/*显示顶部栏目名*/
function showCategoryTitle($categoryId,$categoryName) {
  var icon=$categoryId;
  if (icon.length>=2){
    icon=icon.substr( icon.length-2,2);
    if (icon>21){
      //console.log(post.icon_2);
      icon="0"+Math.ceil(icon/21);
    }else if (icon==="00"){
      icon=21;
    }
  }
  else {
    icon="0"+$categoryId;
  }
  if (icon==="10"){
    icon="06";
  }
  $(".categoryTitle").empty();
  let $html="<li><a href=\"javascript:;\"><span class=\"tt-color03 tt-badge\">"+$categoryName+"</span></a></li>";
  $(".categoryTitle").append($html);
}
/*显示标题栏*/
function showCategoryPostListHeader() {
  let $html="<div class=\"tt-list-header\">\n" +
    "                <div class=\"tt-col-topic\">帖子</div>\n" +
    "                <div class=\"tt-col-category\">分类</div>\n" +
    "                <div class=\"tt-col-value hide-mobile\"><!--Likes--></div>\n" +
    "                <div class=\"tt-col-value hide-mobile\">热度</div>\n" +
    "                <div class=\"tt-col-value hide-mobile wirte-time\">发表时间</div>\n" +
    "                <div class=\"tt-col-value manage\">管理</div>\n" +
    "            </div>"+
      "         <div class=\"topArea1\">    </div>";;
  $(".category-post-list").append($html);
}

