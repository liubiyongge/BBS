$(function () {
    var p=GetRequest();
    var $postId=p["postId"];
   // getPost($postId);
  /*  $(".userHeader").attr("src","images/testHeader2.jpg");
    $(".postScore").text("5");
    $(".postTime").text("2019-12-13 10:00:00");
    $(".postTitle").text("标题");
    $(".postCategoryName").text("栏目1");
    //$(".highlight-li").attr("hidden","hidden");
   // $(".highlight").attr("hidden","hidden");
    $(".highlight").text("精华帖");
    $(".postType").text("积分贴");
    $(".postContent").text("正文内容正文内容正文内容正文内容正文内容正文内容");
    $(".postPhoto").attr("src","images/testHeader1.jpg");
    $(".postCommentNum").text("10");*/

     /*/!*修改按钮*!/
    $(".rewritePost").attr("hidden","hidden");
    /!*删除帖子按钮*!/
    $(".deletePost").attr("hidden","hidden");
    /!*设为精华按钮*!/
    $(".toHighlight").attr("hidden","hidden");
    /!*删除回复按钮*!/
    $(".deleteComment").attr("hidden","hidden");
    /!*积分贴采纳评论*!/
    $(".acceptComment").attr("hidden","hidden");*/
     //var $comment;
    //showComment($comment);
    getPost($postId);
    getAllComments($postId);

});
/*获取帖子内容*/
function getPost($postId) {
    $.ajax({
       type:"get",
       dataType:"json",
        url:"./sources/Apost.json",
       data:{
           'postId':$postId,
       } ,
        success:function (data) {
            //console.log(data);
            /*1.帖子的用户头像*/
            //console.log(data.postUserId);
            let $userHeader="images/"+getUserHeader(data.postUserId);
           // console.log($userHeader);
            $(".userHeader").attr("src",$userHeader);
            /*2.帖子积分*/
            if (data.postScore==0){
                $(".postScore").text("");
            }else {
                $(".postScore").text(data.postScore);
            }
            /*3.帖子标题*/
            $(".postTitle").text(data.postTitle);
            /*4.发表时间*/
            let $postTime=data.postTime;//.split("T")[0]+" "+data.postTime.split("T")[1];
            $(".postTime").text($postTime);
            /*5.所在栏目*/
            let $categoryName=getCategoryName(data.postCategoryId);
            $(".postCategoryName").text($categoryName);
            /*6.帖子类型-积分-普通*/
            if (data.postType==0){
                $(".postType").text("普通帖");
            }else {
                $(".postType").text("积分帖");
            }
            /*7.是否加精*/
            if (data.highlight==1||data.highlight===1){
                $(".highlight").text("精华帖");
            }else {
                $(".highlight").attr("hidden","hidden");
            }
            /*8.回复数*/
            let $commentNum=getCommentsNum(data.postId);
            $(".postCommentNum").text($commentNum);
            /*9.帖子图片*/
            if (typeof (data.postPhoto)=="undefined"||data.postPhoto==="undefined"){
                $(".postPhoto").attr("src","images/testHeader1.jpg");
            }else {
                $(".postPhoto").attr("src","images/"+data.postPhoto);
            }
            /*10.帖子正文文字内容*/
            $(".postContent").text(data.postContent);
            /*修改按钮*/
        },
        error:function () {
            console.log("查询帖子信息失败");
        },
    });
}
/*获取评论列表*/
function getAllComments($postId) {
    $(".commentList").empty();
    $.ajax({
        //async:false,
        type: "get",
        dataType: "json",
        url: "./sources/comments.json",
        success:function (data) {
            for (let i=0;i<data.length;i++){
                showComment(data[i]);
            }
        },
    });
}
/*显示一条评论*/
function showComment($comment) {
   // $comment=;
    let $commentUserHeader=getUserHeader($comment.commentUserId);
    let $commentUserName=getUserName($comment.commentToUserId);
    let $commentCommentNum=getCommentCommentNum($comment.commentId);
    let $html=" <div class=\"tt-item tt-wrapper-success\">\n" +
        "              <div class=\"tt-single-topic\" id=\"a"+$comment.commentUserId+"\">\n" +
        "                <div class=\"tt-item-header pt-noborder\">\n" +
        "                  <div class=\"tt-item-info info-top\">\n" +
        "                    <div class=\"tt-avatar-icon\">\n" +
        "                      <img src=\"images/"+$commentUserHeader+"\" alt=\"UserHeader\" class=\"defaultUserHeader\">\n" +
        "                    </div>\n" +
        "                    <div class=\"tt-avatar-title\">\n" +
        "                      <a href=\"javascript:;\">@"+$commentUserName+"</a>\n" +
        "                    </div>\n" +
        "                    <a href=\"javascript:;\" class=\"tt-info-time\">\n" +
        "                      <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-time\"></use></svg></i>"+$comment.commentTime+"\n" +
        "                    </a>\n" +
        "                  </div>\n" +
        "                </div>\n" +
        "                <div class=\"tt-item-description\">\n" +$comment.commentContent+
        "                </div>\n" +
        "                <div class=\"tt-item-info info-bottom\">\n" +
        "                  <a href=\"#\" class=\"tt-icon-btn\">\n" +
        "                    <i class=\"tt-icon\"><svg class=\"icon\"><use xlink:href=\"#icon-huifu1\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">"+$commentCommentNum+"</span><!--显示回复数-->\n" +
        "                  </a>\n" +
        "                  <div class=\"col-separator\"></div>\n" +
        "                  <a href=\"#\" class=\"tt-icon-btn tt-hover-02 tt-small-indent deleteComment\">\n" +
        "                    <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-shanchu\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">删除此回复</span><!--普通用户不可见-->\n" +
        "                  </a>\n" +
        "                  <a href=\"#\" class=\"tt-icon-btn tt-hover-02 tt-small-indent acceptComment\">\n" +
        "                    <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-like\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">采纳</span><!--楼主可见-->\n" +
        "                  </a>\n" +
        "                  <!--回复图标-->\n" +
        "                  <a href=\"#writeComment\" class=\"tt-icon-btn tt-hover-02 tt-small-indent toComment-comment\">\n" +
        "                    <i class=\"tt-icon\"><svg class=\"icon\"><use xlink:href=\"#icon-huifu\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">回复</span>\n" +
        "                  </a>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>";
    $(".commentList").append($html);
}
function getCommentCommentNum($commentId) {
    let $num=0;
    $.ajax({
        async:false,
       type:"get",
        dataType:"json",
        url:"./sources/commentsNum.json",
        success:function (data) {
            return $num=data.commentsNum;
        },
        error:function () {
            console.log("查询回复数失败");
        }
    });
    return $num;
}