var post={};
$(function () {
   var p=GetRequest();
    console.log(user.userName);
    var $userName=p["userName"];
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
        }else{
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
/*获取栏目列表供选择*/
function getCategoriesOption() {
    $(".category-option-list").empty();
    $.ajax({
        cache:false,
        async:false,
        url:"http://localhost:8080/category/findAll",
        type:"post",
        dataType:"json",
        success:function (data) {
            //console.log(data);
            for (let i=0;i<data.length;i++){
                let $html="<div class=\"col-4 col-lg-3 col-xl-2 category-option\">\n" +
                    "                                <a href=\"#\" class=\"tt-button-icon\">\n" +
                    "                                    <span class=\"tt-icon\">\n" +
                    "                                        <svg>\n" +
                    "                                            <use xlink:href=\"#icon-discussion\"></use>\n" +
                    "                                        </svg>\n" +
                    "                                    </span>\n" +
                    "                                    <span id=\"a"+data[i].categoryId+"\" class=\"tt-text categoryId\">"+data[i].categoryName+"</span>\n" +
                    "                                </a>\n" +
                    "                            </div>";
                $(".category-option-list").append($html);
            }
        },
        error:function () {
            alert("加载栏目信息失败...");
        },
    });
}
/*上传图片到服务器*/
function uploadImg($img) {
    var formData=new FormData();
    formData.append("file",$img);
    $.ajax({
        type:"post",
        url:"/upload/images",
        data:formData,
        contentType: false,
        processData: false,
        dataType:"json",
        success:function(data){
            if (data==1){
                $(".begin-upload").text("重新上传");
                let $html=" <div class=\"photoArea\">\n" +
                    "                                <img src=\"\" alt=\"\" class=\"showPhoto\">\n" +
                    "                            </div>";
                $(".load-and-place-photo").append($html);
                let $imgURL=window.URL.createObjectURL($img);
                $(".showPhoto").attr("src",$imgURL);
                alert("上传成功");
            }
        },
        error:function (msg) {
            alert("上传失败，请重新上传");
        }
    });
}
/*发表帖子*/
function createPost(post) {
    console.log(post);
    console.log(token);

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
            //console.log(result);
            console.log(result.state+typeof(result.state));
            if (result.state===1){
                alert("发表成功");
                window.location.href="page-categories-single.html?userName="+user.userName+"&categoryId="+post.postCategoryId;
            }else {
                alert("发表失败,请重试...");
            }
        },
        error:function () {
            alert("发表失败,请重试......");
        },
    });
}
