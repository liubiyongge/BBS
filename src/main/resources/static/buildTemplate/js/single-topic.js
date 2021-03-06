var post={};
$(function () {
    var p=GetRequest();
    var $postId=p["postId"];
    getPost($postId);
    getAllComments($postId);
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

   /*  /!*修改按钮*!/
    $(".rewritePost").attr("hidden","hidden");
    /!*删除帖子按钮*!/
    $(".deletePost").attr("hidden","hidden");
    /!*设为精华按钮*!/
    $(".toHighlight").attr("hidden","hidden");
    /!*删除回复按钮*!/
    $(".deleteComment").attr("hidden","hidden");
    /!*积分贴采纳评论*!/
    $(".acceptComment").attr("hidden","hidden");*/

    /*权限*/
    /*1.版主或者管理员*/
    if (user.type==2||(user.type==1&&getCategoryUserId(post.postCategoryId)==user.userId)){
        $(".rewritePost").removeAttr("hidden");/*作者和管理员可以修改文章*/

        $(".deletePost").removeAttr("hidden");/*删除帖子*/

        $(".toHighlight").removeAttr("hidden");/*加精*/

        $(".deleteComment").removeAttr("hidden");/*删除回复*/

        //$(".acceptComment").removeAttr("hidden");
    }
   /* if (user.type==1&&getCategoryUserId(post.postCategoryId)==user.userId){/!*是当前栏目的版主*!/
        $(".rewritePost").removeAttr("hidden");

        $(".deletePost").removeAttr("hidden");

        $(".toHighlight").removeAttr("hidden");

        $(".deleteComment").removeAttr("hidden");
    }*/

     if (post.postUserId==user.userId){/*作者本人*/
        $(".rewritePost").removeAttr("hidden");
        $(".acceptComment").removeAttr("hidden");/*采纳答案*/
        $(".deletePost").removeAttr("hidden");
    }
     if (post.postType==2){
         $(".acceptComment").attr("hidden","hidden");/*帖子已解决需求，不能再采纳其他的答案*/
     }
     if (post.highlight==1){
         $(".toHighlight").attr("hidden","hidden");
     }
    var comment={};
    comment.commentPostId=$postId;
    comment.commentUserId=user.userId;
    comment.commentToUserId=post.postUserId;/*默认是回复当前帖子*/
    let $commentToId;
    comment.commentToId=$commentToId;/*默认为空*/
    /*
    1.如果评论的是  别人的回复(x) ，那么commentToId就是x的发表者，且commentToUserId是发表x的用户
    2.如果评论的是帖子(默认)，那么commentToId为空，commentToUserId就是当前帖子的发表者
    */
    /*点击 回复*/
    /*(1).点击帖子底下的回复*/
    $(".toComment").click(function () {
        /*默认*/
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
    });
    /*(2).点击某条回复底下的回复按钮*/
    $(".commentList").delegate(".toComment-comment","click",function (evt) {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        comment.commentToUserId=$(evt.target).parents(".info-bottom").attr("id");
        //console.log(comment.commentToUserId);
        comment.commentToId=$(evt.target).parents(".tt-single-topic").attr("id");
        //console.log(comment.commentToId);
    });
   /*点击设置为精华帖*/
    $(".toHighlight").click(function () {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        toHighlight($postId);
        getPost($postId);
        $(this).attr("hidden","hidden");
    });
    /*点击删除此回复*/
    $(".commentList").delegate(".deleteComment","click",function (evt) {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        let $id=$(evt.target).parents(".tt-single-topic").attr("id");
        let $commentId=$id/*.substr(1)*/;
        console.log("id:"+$commentId);
        deleteComment($commentId,$postId);
    });
    /*点击删除此帖子*/
    $(".deletePost").click(function () {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        deletePost($postId);
        window.location.href="page-categories-single.html?categoryId="+post.postCategoryId;
    });
    /*点击 采纳*/
    $(".commentList").delegate(".acceptComment","click",function (evt) {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        let $userId=$(evt.target).parents(".info-bottom").attr("id");
        let $commentId=$(evt.target).parents(".tt-single-topic").attr("id");
        let $addScore=changeCredit($userId,post.postId);
        let $changePostType=changePostType(post.postId);
        let $changeCommentAdopt=changeCommentAdopt($commentId);
        if ($addScore==1&&$changePostType==1&&$changeCommentAdopt==1){
            $(".acceptComment").attr("hidden","hidden");
            $(evt.target).parents(".tt-item").removeClass("answer").addClass("tt-wrapper-success");
            alert("采纳成功，积分已转入回复者账号中");
            window.location.reload();
        }else {
            alert("操作失败，请重试");
        }
    });
    /*点击发送*/
    $(".sendComment").click(function () {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
        if (user.userName==undefined||typeof (user.userName)=="undefined"){
            alert("请先登录");
            window.location.href="page-login.html";
        }else {
            comment.commentTime=getTime();
            comment.commentContent=$(".commentContent").val();
            if (comment.commentContent==""){
                alert("内容不能为空");
            }else {
                console.log(comment);
                sendComment(comment);
            }
        }
    });
    /*点击  修改*/
    $(".rewritePost").click(function () {
        if (token==null||token==="null"){
            alert("请先登录");
            window.location.href="page-login.html";
        }
       $(this).attr("href","page-modify-topic.html?postId="+post.postId);
    });

});
/*根据postId获取帖子内容*/
function getPost($postId) {
    $.ajax({
        async:false,
        type:"post",
        dataType:"json",
        url:"/post/getPost",
        data:{
            'postId':$postId,
        },
        success:function (data) {
            //console.log(data);
            post=data;
            /*1.帖子的用户头像*/
            let $userHeader=getUserHeader(data.postUserId);
            $(".userHeader").attr("src",$userHeader);
            /*2.帖子积分*/
            if (data.postScore==0){
                $(".postScore").text("");
            }else {
                $(".postScore").text("积分："+data.postScore);
            }
            /*3.帖子标题*/
            $(".postTitle").text(data.postTitle);
            /*4.发表时间*/
            let $postTime=data.postTime.substr(0,10);//.split("T")[0]+" "+data.postTime.split("T")[1];
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
                $(".highlight").removeAttr("hidden");
                $(".highlight").text("精华帖");
            }else {
                $(".highlight").attr("hidden","hidden");
            }
            /*8.回复数*/
            let $commentNum=getCommentsNum(data.postId);
            $(".postCommentNum").text($commentNum);
            /*9.帖子图片*/
            // console.log(data.postPhoto);
            if (data.postPhoto==null||typeof (data.postPhoto)=="undefined"||data.postPhoto==="undefined"){
                $(".postPhoto").attr("hidden","hidden");
            }else {
                $(".postPhoto").attr("src",data.postPhoto);
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
        async:false,
        type: "post",
        dataType: "json",
        url: "/post/getComments",
        data:{
            'postId':$postId,
        },
        success:function (data) {
            console.log(data);
            for (let i=0;i<data.length;i++){
                showComment(data[i]);
            }
        },
        error:function () {
            console.log("获取评论列表失败");
        }
    });
}
/*显示一条回复*/
function showComment($comment) {
   console.log($comment);
    let $commentUserHeader=getUserHeader($comment.commentUserId);
    let $commentUserName=getUserName($comment.commentUserId);
    let $commentToUserName=getUserName($comment.commentToUserId);
    let $commentCommentNum=getCommentCommentNum($comment.commentId);

    /*采纳的答案*/
    let $color="answer";
    if ($comment.adopt==1){
      $color="tt-wrapper-success";
    }
    let $html=" <div class=\"tt-item "+$color+" \">\n" +/*tt-wrapper-success*/
        "              <div class=\"tt-single-topic\" id=\""+$comment.commentId+"\">\n" +
        "                <div class=\"tt-item-header pt-noborder\"'>\n" +
        "                  <div class=\"tt-item-info info-top\">\n" +
        "                    <div class=\"tt-avatar-icon\">\n" +
        "                      <img src=\""+$commentUserHeader+"\" alt=\"UserHeader\" class=\"defaultUserHeader\">\n" +
        "                    </div>\n" +
        "                    <div class=\"tt-avatar-title\">\n" +
        "                      <a href=\"javascript:;\">"+$commentUserName+"@"+$commentToUserName+"</a>\n" +
        "                    </div>\n" +
        "                    <a href=\"javascript:;\" class=\"tt-info-time\">\n" +
        "                      <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-time\"></use></svg></i>"+$comment.commentTime+"\n" +
        "                    </a>\n" +
        "                  </div>\n" +
        "                </div>\n" +
        "                <div class=\"tt-item-description\">\n" +$comment.commentContent+
        "                </div>\n" +
        "                <div class=\"tt-item-info info-bottom\" id='"+$comment.commentUserId+"'>\n" +
        "                  <a href=\"javascript:;\" class=\"tt-icon-btn\">\n" +
        "                    <i class=\"tt-icon\"><svg class=\"icon\"><use xlink:href=\"#icon-huifu1\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">"+$commentCommentNum+"</span><!--显示回复数-->\n" +
        "                  </a>\n" +
        "                  <div class=\"col-separator\"></div>\n" +
        "                  <a href=\"javascript:;\" hidden='hidden' class=\"tt-icon-btn tt-hover-02 tt-small-indent deleteComment\">\n" +
        "                    <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-shanchu\"></use></svg></i>\n" +
        "                    <span class=\"tt-text\">删除此回复</span><!--普通用户不可见-->\n" +
        "                  </a>\n" +
        "                  <a href=\"javascript:;\" hidden='hidden' class=\"tt-icon-btn tt-hover-02 tt-small-indent acceptComment\">\n" +
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
/*获取评论的回复数*/
function getCommentCommentNum($commentId) {
    let $num=0;
    $.ajax({
        async:false,
       type:"post",
        dataType:"json",
        url:"/comment/countComments",
        data:{
            'commentId':$commentId,
        },
        success:function (data) {
            return $num=data.CommentNumToThisComment;
        },
        error:function () {
            console.log("查询回复数失败");
        }
    });
    return $num;
}
/*删除回复*/
function deleteComment($commentId,$postId) {
    $.ajax({
        headers:{
            'token':token,
        },
        type:"post",
        dataType:"json",
        url:"/User/deleteComm",
        data:{
            'commentId':$commentId,
        },success:function (data) {
            console.log(data);
            if (data.state==1){
                alert("删除成功");
                /*刷新页面*/
                window.location.reload();
            }else {
                alert("操作失败，请重试");
            }
        },
        error:function () {
            alert("操作失败，请重试...");
        }
    });
}
/*采纳：给用户追加积分*/
function changeCredit($userId,$postId) {
    let $state=0;
    $.ajax({
        headers: {
            'token':token,
        } ,
        async:false,
        type:"post",
        dataType:"json",
        url:"/User/addCredit",
        data:{
            'userId':$userId,
            'postId':$postId,
        },
        success:function (data) {
            if (data.state==1){
                // alert("采纳成功，积分已到对方的账号中");
                $state=1;
                return $state;
            }else {
                //alert("操作失败,请重试");
                $state=0;
                return $state;
            }
        },error:function () {
            //alert("操作失败，请重试...");
            $state=0;
            return $state;
        }
    });
    return $state;
}
/*采纳：将postType改为2*/
function changePostType($postId) {
    let $state=0;
    $.ajax({
       headers:{
           'token':token,
       } ,
        async:false,
        type:"post",
        dataType:"json",
        url:"/User/changeDemand",
        data:{
           'postId':$postId
        },
        success:function (data) {
            if (data.state==1){
                $state=1;
                return $state;
            }else {
                $state=0;
                return $state;
            }
        },
        error:function () {
           $state=0;
           return $state;
        }
    });
    return $state;
}
/*发表评论*/
function  sendComment($comment) {
    console.log($comment);
    $.ajax({
        type:"post",
        dataType:"json",
        headers:{
            'token':token,
        } ,
        url:"/User/addComment",
        contentType: "application/json",
        data:JSON.stringify({
            "commentUserId":$comment.commentUserId,
            "commentToId":$comment.commentToId,
            "commentToUserId":$comment.commentToUserId,
            "commentContent":$comment.commentContent,
            "commentPostId":$comment.commentPostId,
            "commentTime":$comment.commentTime,
            }),
        success:function (data) {
            console.log(data);
            if (data.state==1){
                alert("评论成功！");
                window.location.reload();
            }else {
                alert("评论失败，请重试");
            }
        },
        error:function () {
            alert("评论失败，请重试...");
        }
    });
}
function  changeCommentAdopt($commentId) {
    let state=0;
    $.ajax({
       async:false,
       type:"post",
        dataType:"json",
        headers:{
           'token':token,
        },
        url:"/User/changeCommentAdopt",
        data:{
           'commentId':$commentId,
        },
        success:function (data) {
            if (data.state==1){
                state=1;return state;
            }else {
                return  state;
            }
        },error:function () {
            return state;
        }

    });
    return state;
}
