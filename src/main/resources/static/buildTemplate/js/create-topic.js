var post={};
$(function () {
    if (token==null||token==="null"){
        alert("请先登录");
        window.location.href="page-login.html";
    }
   var p=GetRequest();
    /*显示可选择的栏目列表*/
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
          post.postPhoto=uploadImg($img);
          //post.postPhoto=$img.name;
           // console.log(post.postPhoto);
        }
    });

   /*点击 发表 按钮时检测各项输入的内容*/
    $(".create-topic").click(function () {
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
        if (post.postTitle==""){
            alert("标题不能为空");
        }
        else if (post.postCategoryId==0){
            alert("必须选择帖子所属栏目");
        }
        else if ( post.postContent==""){
            alert("内容不能为空");
        }
        else if (($inputCredit==""||isNaN($inputCredit)||$inputCredit==0)&&post.postType==1){
            alert("请设置有效的积分");
        }else if (user.credit<$inputCredit&&post.postType==1){
            alert("剩余积分不足");
            $(".input-credit").val("");
        }
        else{
            console.log("post.postScore:"+post.postScore);
            if (post.postType==1){
                post.postScore=$inputCredit;
            }
            post.postCategoryId=parseInt(post.postCategoryId);
            post.postType=parseInt(post.postType);
            post.highlight=0;
            post.top=0;
            post.postUserId=user.userId;
           // post.postPhoto=undefined;
            post.postTime=getTime();
            createPost(post);
        }

    });
});

/*发表帖子*/
function createPost(post) {
    $.ajax({
        //cache:false,
        //async:false,
        type: "post",
        dataType: "json",
        headers:{
            'token':token,
        },
        url: "/User/creatPost",
        contentType: "application/json",
        data:JSON.stringify({
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
            console.log(result.state+typeof(result.state));
            if (result.state===1){
                alert("发表成功");
                window.location.href="page-categories-single.html?&categoryId="+post.postCategoryId;
            }else {
                alert("发表失败,请重试...");
            }
        },
        error:function () {
            alert("发表失败,请重试......");
        },
    });
}

