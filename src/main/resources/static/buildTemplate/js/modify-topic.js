var post={};
var post0={};
$(function () {
    console.log(token);
    if (token==null||token==="null"){
        alert("请先登录");
        window.location.href="page-login.html";
    }
    var p=GetRequest();
    var $postId=p["postId"];
    //var $userName=p["userName"];
    /*获取修改前的信息*/
    getPost($postId);

    $("#inputTopicTitle").val(post0.postTitle);
    $("#postContent").val(post0.postContent);
    /*获取栏目列表*/
    getCategoriesOption();

    /*不选择积分贴时不允许输入积分*/
    $(".write-credit").mouseenter(function () {
        post.postType=$(".post-type").find("option:selected").val();
        if (post.postType==1){
            $(".input-credit").removeAttr("disabled");
        }
    }).mouseleave(function () {
        $(".input-credit").attr("disabled","disabled");
    });
    /*选中的categoryId*/
    post.postCategoryId=0;
    $(".category-option").click(function (evt) {
        let $id=$(evt.target).parents(".category-option").find(".categoryId").attr("id");
        post.postCategoryId=$id.substr(1);
        //console.log($categoryId);
    });
    /*图片处理*/
    post.postPhoto=undefined;
    /*点击 开始上传*/
    $(".begin-upload").click(function () {
        /*获取图片文件*/
        let $img=$("#file-img")[0].files[0];
        //console.log($img);
        if (typeof ($img)=="undefined"){
            alert("请选择图片");
        }else {
            uploadImg($img);
            post.postPhoto=$img.name;
            // console.log(post.postPhoto);
        }
    });

    /*点击 保存修改 按钮*/
    $(".modify-topic").click(function () {
        /*postId*/
        post.postId=$postId;
        /*获取标题*/
        post.postTitle=$("#inputTopicTitle").val();
        //console.log("post.postTitle：" + post.postTitle);
        /*获取帖子正文内容*/
        post.postContent=$("#postContent").val();
        //console.log(" post.postContent:" + post.postContent);
        /*获取帖子类型：普通帖或者积分帖*/
        post.postType=$(".post-type").find("option:selected").val();
        //console.log("post.type:"+post.type);
        /*获取积分*/
        post.postScore=0;
        let $inputCredit=$(".input-credit").val();
        //console.log("$inputCredit:"+$inputCredit);
        if (post.postTitle==""){
            alert("标题不能为空");
        }
        else if (post.postCategoryId==0){
            alert("必须选择帖子所属栏目");
        }
        else if ( post.postContent==""){
            alert("内容不能为空");
        }
        else if (($inputCredit==""||isNaN($inputCredit)||$inputCredit===0)&&post.postType==1){
            alert("请设置有效的积分");
        }
        else{
            console.log("post.postScore:"+post.postScore);
            if (post.postType==1){
                post.postScore=$inputCredit;
            }
            post.postCategoryId=parseInt(post.postCategoryId);
            post.postType=parseInt(post.postType);
            if (post0.type==2){
                /*帖子需求已解决，不能再加减积分或者换类型*/
                alert("您的帖子已完成需求，不能再更改帖子类型和修改积分");
                post.postType=post0.type;
                post.postScore=post0.postScore;
            }
            post.highlight=post0.highlight;
            post.top=post0.top;
            post.postTime=post0.postTime;
            post.postId=post0.postId;
            post.postUserId=post0.postUserId;
           modifyPost(post);
        }
    });
});
/*获取原来的帖子*/
function getPost($postId) {
    $.ajax({
        async: false,
        type: "post",
        dataType: "json",
        url: "/post/getPost",
        data: {
            'postId': $postId,
        },
        success:function (data) {
           // console.log(data);
            //return data;
            post0.postId=data.postId;
            post0.postTitle=data.postTitle;
            post0.postContent=data.postContent;
            post0.postScore=data.postScore;
            post0.postUserId=data.postUserId;
            post0.postPhoto=data.postPhoto;
            post0.highlight=data.highlight;
            post0.postTime=data.postTime;
            post0.postType=data.postType;
            post0.top=data.top;
            post0.postCategoryId=data.postCategoryId;
        },
        error:function () {
            console.log("获取帖子信息失败");
        },
    });
}
/*修改帖子*/
function modifyPost(post) {
    $.ajax({
        type: "post",
        dataType: "json",
        headers:{
            'token':token,
        },
        url: "/User/updatePost",
        contentType: "application/json",
        data:JSON.stringify({
            "postId":post.postId,
            "postTitle":post.postTitle,
            "postContent":post.postContent,
            "postScore":post.postScore,
            "postUserId":post.postUserId,
            "postPhoto":post.postPhoto,
            "highlight":post.highlight,
            "postTime":post.postTime,
            "postType":post.postType,
            "postCategoryId":post.postCategoryId,
            "top":post.top,
        }),
        success:function (result) {
            //console.log(result);
            console.log(result.state+typeof(result.state));
            if (result.state===1){
                alert("修改成功");
                window.location.href="page-single-topic.html?userName="+user.userName+"&postId="+post.postId;
            }else {
                alert("修改失败,请重试...");
            }
        },
        error:function () {
            alert("发表失败,请重试......");
        },
    });
}