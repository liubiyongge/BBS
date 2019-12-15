var user={};
var token;

$(function () {
    /*获取token*/
    token=localStorage.getItem("bbsNCU");
    console.log(token);
    // /*1.鼠标移入移出右上角*/
    // $(".user-settings").mouseenter(function () {
    //     // alert("123");
    //     $(".toUserCenter").removeClass("notShow").addClass("currentShow");//
    // }).mouseleave(function () {
    //     // alert("321");
    //     $(".toUserCenter").removeClass("currentShow").addClass("notShow");//
    // });
    /*管理权限显示*/
    $(".manage").hide();
    $(".manage-content").hide();

    /*判断是否为未登录用户*/
    // var p=GetRequest();
    // var $userName=p["userName"];   /*在路径中获取用户ID*/
    // var $userId=p["userId"];
    let $userName;
    if(token!=null){
        $userName=parseJwt(token).userName;
        let $userId=getUserId($userName);

        //在所有需要的地方显示用户名
        $(".nowUserName").text($userName);
        //多处显示用户头像
        $(".login_img2 .login_img1 .login_img2").text(getUserHeader($userId));


        alert("当前用户名："+$userName+"  用户Id："+$userId);
        getPostCommentInfo($userId);
        getReceiveCommentInfo($userId);
    }
    else alert("请登录！");

    /*点击 退出登录 按钮*/
    $(".log-out-bt").click(function () {
        clearUserInfo();
        //localStorage.clear();
        localStorage.setItem("bbsNCU",null);
        window.location.href="index.html";
    });

});

/*退出登陆时清空用户信息*/
function clearUserInfo() {
    user.userId=undefined;
    user.userName=undefined;
    user.sex=undefined;
    user.credit=undefined;
    user.telephone=undefined;
    user.profilePhoto=undefined;
    user.briefIntro=undefined;
    user.location=undefined;
    user.type=undefined;
    user.birthday=undefined;
}
function getUserId($userName){
    var $userId;
    $.ajax({
        cache:false,
        async:false,
        headers:{
            'token':token,
        },
        url:"/User/getByUserName",//./sources/categoryName.json
        type:"post",
        dataType:"json",
        data:{
            'userName':$userName
        },
        //返回值是User
        success:function (data) {
            $userId=data.userId;
            console.log($userName+":"+data.userId);
            return $userId;
        },
        error:function () {
            console.log("获取用户信息失败");
            return $userId;
        }
    });
    return $userId;
}

/*通过userId查询用户头像*/
function getUserHeader($userId) {
    var $userHeader="defaultUserHeader.jpg";
    $.ajax({
        cache:false,
        async:false,
        url:"/post/getHeader",
        type:"post",
        dataType:"json",
        data:{
            'userId':$userId,
        },
        success:function (data) {
            $userHeader=data.profilePhoto;
            if ($userHeader==="undefined"||typeof ($userHeader)=="undefined"){
                $userHeader="defaultUserHeader.jpg";
            }
            //console.log("success:"+$userId);
            console.log("success:"+$userHeader);
            return $userHeader;
        },
        error:function () {
            //console.log("获取用户头像失败");
            return $userHeader;
        }
    });
    return $userHeader;
}

/*获取发表的评论要显示的所有信息*/
function getPostCommentInfo($userId) {
    $.ajax({
        cache:false,
        async:false,
        url:"/post/getPostCommentInfo",
        type:"post",
        dataType:"json",
        data:{
            'userId':$userId,
        },
        success:function (data) {//返回值是List
            var post={};
            for(var i = 0; i < data.length; i++){
                //alert(data[i].toString());
                console.log(data[i]);
                post.postPhoto=data[i].postPhoto;
                //帖子没有照片，显示一张默认的图片
                if(post.postPhoto==undefined || typeof(post.postPhoto)=="undefined")
                    post.postPhoto="defaultUserHeader.jpg";
                post.postTitle=data[i].postTitle;
                post.categoryName=data[i].categoryName;
                post.commentTime=data[i].commentTime;
                post.commentContent=data[i].commentContent;
                post.briefCommentContent=post.commentContent;
                //只取评论的前20个字符进行显示
                if(post.commentContent.length > 20) post.briefCommentContent=post.commentContent.substr(0,20);
                console.log(post);
                addPostCommentToList(post);
            }

        },
        error:function () {
            console.log("加载失败...");
        }
    });
}
function getReceiveCommentInfo($userId) {
    $.ajax({
        cache:false,
        async:false,
        url:"/post/getReceiveCommentInfo",
        type:"post",
        dataType:"json",
        data:{
            'userId':$userId,
        },
        success:function (data) {//返回值是List
            var post={};
            for(var i = 0; i < data.length; i++){
                //alert(data[i].toString());
                console.log(data[i]);
                post.postPhoto=data[i].postPhoto;
                //帖子没有照片，显示一张默认的图片
                if(post.postPhoto==undefined || typeof(post.postPhoto)=="undefined")
                    post.postPhoto="defaultUserHeader.jpg";
                post.postTitle=data[i].postTitle;
                post.categoryName=data[i].categoryName;
                post.commentTime=data[i].commentTime;
                post.commentContent=data[i].commentContent;
                post.briefCommentContent=post.commentContent;
                //只取评论的前20个字符进行显示
                if(post.commentContent.length > 20) post.briefCommentContent=post.commentContent.substr(0,20);
                console.log(post);
                addReceiveCommentToList(post);
            }
        },
        error:function () {
            console.log("加载失败...");
        }
    });
}
function addPostCommentToList(post) {
    console.log(post);
    var $html="<div class=\"tt-item\">\n" +
        "                            <div class=\"tt-col-avatar\">\n" +
        "                                <img src=\""+post.postPhoto+"\" class=\"login_img3\">\n" +
        "                            </div>\n" +
        "                            <div class=\"tt-col-description\">\n" +
        "                                <h6 class=\"tt-title\">\n" +
        "                                    <a href=\"#\">"+post.postTitle+"</a>\n" +
        "                                </h6>\n" +
        "                                <div class=\"tt-content\">"+post.commentContent+"</div>\n" +
        "                            </div>\n" +
        "                            <div class=\"tt-col-category\"><a href=\"#\"><span class=\"tt-color06 tt-badge\">"+post.categoryName+"</span></a></div>\n" +
        "                            <div class=\"tt-col-value-large hide-mobile\">"+post.commentTime+"</div>\n" +
        "                        </div>";
    $("#postComment").append($html);
}
function addReceiveCommentToList(post) {
    console.log(post);
    var $html="<div class=\"tt-item\">\n" +
        "                            <div class=\"tt-col-avatar\">\n" +
        "                               <svg class=\"tt-icon\">\n" +
        "                                  <use xlink:href=\"#icon-ava-d\"></use>\n" +
        "                                </svg>\n" +
        "                            </div>\n" +
        "                            <div class=\"tt-col-description\">\n" +
        "                                <h6 class=\"tt-title\"><a href=\"#\">"+post.postTitle+"</a></h6>\n" +
        "                                <div class=\"tt-content\">"+post.briefCommentContent+"</div>\n" +
        "                            </div>\n" +
        "                            <div class=\"tt-col-category\"><a href=\"#\"><span class=\"tt-color06 tt-badge\">"+post.categoryName+"</span></a></div>\n" +
        "                            <div class=\"tt-col-value-large hide-mobile\">"+post.commentTime+"</div>\n" +
        "                        </div>";
    $("#receiveComment").append($html);
}
//上传个人信息头像
function UploadImg(obj){
    //方法1：
    //  var show = new FileReader();
    //  show.readAsDataURL(obj.files[0]);
    //  alert(obj.files[0].src);
    //  show.onload = function (ev) {
    //    $("#profilePhoto").attr("src", ev.target.result);
    //  }
    //方法2：
    alert("photo");
    var url = window.URL.createObjectURL(obj.files[0]);
    $('.login_img2').attr("src",url);
    //alert(url);
}

// 在键盘按下并释放及提交后验证提交表单
function validform(){
    /*关键在此增加了一个return，返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证*/
        return $(".self-form").validate({
            rules: {
                username: {
                    minlength: 5,
                    maxlength: 13
                },
                newpassword: {
                    minlength: 5,
                    maxlength: 20
                },
                renewpassword: {
                    minlength: 5,
                    maxlength: 20,
                    equalTo: "#settingsUserPassword"
                },
                telephone:{
                    minlength: 11,
                    maxlength: 11
                },
                location:{
                    minlength:2,
                    maxlength:8
                }
            },
            messages: {
                username: {
                    minlength: "用户名至少包含5个字符",
                    maxlength: "用户名长度不能超过13个字符"
                },
                newpassword: {
                    minlength: "密码长度不能少于5个字符",
                    maxlength: "密码长度不能多于20个字符"
                },
                renewpassword: {
                    minlength: "密码长度不能少于5个字符",
                    maxlength: "密码长度不能多于20个字符",
                    equalTo: "两次密码输入不一致"
                },
                telephone: {
                    minlength:"请输入正确的电话号码",
                    maxlength:"请输入正确的电话号码"
                },
                location: {
                    minlength: "居住地名称长度果断",
                    maxlength: "居住地长度过长"
                }
            }
        });
}
$(validform());
function savaInfo(){
    if(validform().form()) {
        alert("YES!");
    } else {
        alert("NO!");
        //校验不通过，什么都不用做，校验信息已经正常显示在表单上
    }
    alert("xx");
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


