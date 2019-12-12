var user={};
var token;

$(function () {
  /*获取token*/
  token=localStorage.getItem("bbsNCU");
 /* if (token===null||token==="null"){
    clearUserInfo();
   // console.log("token null");
  }*/
 // console.log("token:");
  console.log(token);
  //console.log("user:");
  //console.log(user);
  /*1.鼠标移入移出右上角*/
  $(".user-settings").mouseenter(function () {
   // alert("123");
    $(".toUserCenter").removeClass("notShow").addClass("currentShow");//
  }).mouseleave(function () {
   // alert("321");
    $(".toUserCenter").removeClass("currentShow").addClass("notShow");//
  });
  /*管理权限显示*/
  $(".manage").hide();
  $(".manage-content").hide();

  /*判断是否为未登录用户*/
  var p=GetRequest();
  var $userName=p["userName"];   /*在路径中获取用户ID*/
  var $userId=p["userId"];
  if (typeof ($userName)=="undefined"||$userName==="undefined"){//未登录
    console.log("未登录");
    localStorage.setItem("bbsNCU",null);
    $(".sign-in-up").addClass("currentShow").removeClass("notShow");/*显示登录-注册*/
    $(".user-settings").removeClass("currentShow").addClass("notShow");/*隐藏个人中心入口和头像*/
  }else{            //已登录
    getUserInfo($userName);      /*ajax请求获取用户信息，存放在user全局变量*/
    //setTimeout(showHeader,100);/*等待ajax请求完成再执行*/
    $userId=user.userId;
    if (user.profilePhoto==null){
      //console.log("1");
      user.profilePhoto="defaultUserHeader.jpg";
    }
    showHeader();
  }
  /*点击 所有栏目 按钮*/
  $(".to-all-column").click(function () {
    let page="page-categories.html?";
    let para="userName="+user.userName;
    let path=page+para;
    $(this).attr("href",path);
  });
  /*点击 发表帖子 按钮*/
  $(".to-create-post").click(function () {
    if (typeof (user.userId)=="undefined"||user.userId==="undefined"){
      $(this).attr("href","page-login.html");
    }else {
      let page="page-create-topic.html?";
      let para="userName="+user.userName;
      let path=page+para;
      $(this).attr("href",path);
    }
  });
  /*点击"+"发表新帖子*/
  $(".tt-btn-create-topic").click(function () {
    if (typeof (user.userId)=="undefined"||user.userId==="undefined"){
      $(this).attr("href","page-login.html");
    }else {
      let page="page-create-topic.html?";
      let para="userName="+user.userName;
      let path=page+para;
      $(this).attr("href",path);
    }
  });
  /*点击 主页 按钮*/
  $(".to-home").click(function () {
    let page="index.html?";
    let para="userName="+user.userName;
    let path=page+para;
    $(this).attr("href",path);
  });
  /*点击个人中心按钮*/
  $(".user-center-bt").click(function () {
    if (typeof (user.userId)=="undefined"||user.userId==="undefined"){
      $(this).attr("href","page-login.html");
    }else {
      let page="page-single-user.html?";
      let para="userName="+user.userName;
      let path=page+para;
      // $(this).attr("href",path);
      window.location.href=path;
    }
  });
  /*点击 退出登录 按钮*/
  $(".log-out-bt").click(function () {
    clearUserInfo();
    localStorage.setItem("bbsNCU",null);
    window.location.href="index.html";
  });
  /*显示所有帖子的列表*/
  getAllPosts();
  /*置顶帖置顶显示*/

  /*/!*帖子管理权限*!/
  if (user.type===2){
    $(".manage").show();
    $(".manage-content").show();
  } else {
    $(".manage").hide();
    $(".manage-content").hide();
    }*/
  //},50);
  /*点击帖子进入详情*/
  $(".index-post-list").delegate(".tt-col-description","click",function (evt) {
    let page="page-single-topic.html?";
    let $postId=$(evt.target).parents(".tt-col-description").find(".tt-value").text();
    let para="userName="+user.userName+"&postId="+$postId;
    let path=page+para;
    $(".tt-col-description a").attr("href",path);
  });

 /* $(".index-post-list").delegate(".tt-col-category","click",function (evt) {
    let $id=$(evt.target).parents(".tt-item").find(".saveCategoryId").attr("id");
    let $categoryId=$id.substr(1);
    //alert("saveCategoryId:"+$categoryId);
    let page="page-categories-single.html?";
    let para="userName="+user.userName+"&categoryId="+$categoryId;
    let path=page+para;
    window.location.href=path;
  });*/
  /*点击栏目图标*/
  $(".tt-col-category").click(function (evt) {
   let $id=$(evt.target).parents(".tt-item").find(".saveCategoryId").attr("id");
    let $categoryId=$id.substr(1);
    //alert("saveCategoryId:"+$categoryId);
    let page="page-categories-single.html?";
    let para="userName="+user.userName+"&categoryId="+$categoryId;
    let path=page+para;
    window.location.href=path;
  });
  
 /* /!*帖子管理-版主和管理员可操作*!/
  /!*删除*!/
  $(".index-post-list").delegate(".manage-content a.delete","click",function (evt) {
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    //console.log($postId);
    deletePost($postId);
    getAllPosts();
  });
  /!*置顶*!/
  $(".index-post-list").delegate(".manage-content a.top","click",function (evt) {
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    //console.log($postId);
     toTop($postId);
     getAllPosts();
  });
  /!*加精*!/
  $(".index-post-list").delegate(".manage-content a.highlight","click",function (evt) {
    let $postId=$(evt.target).parent().siblings(".tt-col-description").find(".tt-value").text();
    //console.log($postId);
    toHighlight($postId);
    getAllPosts();
  });*/
});

/*显示顶部*/
function showHeader() {
  //console.log(user);
  //console.log("登录用户,userName:"+user.userName);
  $(".sign-in-up").removeClass("currentShow").addClass("notShow");/*隐藏登录-注册*/
  $(".user-settings").addClass("currentShow").removeClass("notShow");/*显示个人中心入口和头像*/
  $(".user-settings .userName a").text(user.userName);/*显示用户名*/
  var path;
  if (user.profilePhoto==="undefined"||typeof (user.profilePhoto)=="undefined"){
    console.log("Header-undefined");
    path="images/defaultUserHeader.jpg";/*用户未设置头像，显示默认头像*/
  }else {
    path="images/"+user.profilePhoto;
  }
  $(".defaultUserHeader").attr("src",path);/*显示头像*/
}
/*获取用户信息*/
function getUserInfo($userName) {
  //console.log("getUSerInfo:");
  $.ajax({
    async:false,
    cache:false,
    headers:{
      'token':token,
    },
    url:"http://localhost:8080/User/getByUserName",/*1*/
    type:"post",         /*2*/
    dataType:"json",
    data:{
      'userName':$userName,
    },
    success:function (data) {
      user.userId=data.userId;
      user.userName=data.userName;
      user.sex=data.sex;
      user.credit=data.credit;
      user.telephone=data.telephone;
      user.profilePhoto=data.profilePhoto;
      user.briefIntro=data.briefIntro;
      user.location=data.location;
      user.type=data.type;
      user.birthday=data.birthday;
    },
    error:function () {
      alert("获取用户数据失败");
    },
  });
}
/*退出登陆时清空用户信息*/
function clearUserInfo() {

  user.userId="undefined";
  user.userName="undefined";
  user.sex="undefined";
  user.credit="undefined";
  user.telephone="undefined";
  user.profilePhoto="undefined";
  user.briefIntro="undefined";
  user.location="undefined";
  user.type="undefined";
  user.birthday="undefined";
}
/*获取所有的帖子*/
function getAllPosts()  {
  /*清空节点*/
  $(".index-post-list").empty();
  /*显示标题栏*/
  showPostListHeader();
  $.ajax({
    cache:false,
    async:false,
    headers:{
      "token":token
    },
    url:"http://localhost:8080/post/findAll",//"./sources/post.json",
    /*beforeSend: function(request){
      request.setRequestHeader("token",token);
    },*/
    type:"post",
    dataType: "json",
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
           //console.log("header:" + post.postUserHeader);
        //console.log(post.postUserHeader);
        post.postCategoryId=data[i].postCategoryId;/*所属栏目的id*/
              //setTimeout(function () {
                post.postCategoryName=getCategoryName(post.postCategoryId);/*所属栏目的名称*/
        //},20);
              //console.log("post.postCategoryName:"+post.postCategoryName+i);
        post.postTitle=data[i].postTitle;
        post.postContent=data[i].postContent;
        post.postContentBrief=""; /*取内容的前8个字做内容简介*/
        if (post.postContent.length>=15){
          post.postContentBrief=post.postContent.substr(0,15)+"...";
        }else {
          post.postContentBrief=post.postContent;
        }
        post.postScore=data[i].postScore;
        post.postPhoto=data[i].postPhoto;
        post.highlight=data[i].highlight;/*是否加精*/
        post.top=data[i].top;/*是否置顶*/
        post.postTime=data[i].postTime.substr(0,19);
        post.postTime=post.postTime.split("T")[0]+" "+post.postTime.split("T")[1];
        post.postType=data[i].postType;/*是否需求贴*/
        post.icon_1=String.fromCharCode(97+parseInt(post.postCategoryId));/*帖子项中第一个有颜色图标的类名后缀*/
        /*帖子项中第2个有颜色图标的类名后缀*/
        if (post.postCategoryId.length>=2){
          post.icon_2=post.postCategoryId.substr( post.postCategoryId.length-2,2);
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
        addPostToList(post);
      }
    },
    error:function () {
      alert("加载帖子列表失败...");
    }
  });
}
/*在页面上创建一条帖子*/
function addPostToList(post) {
  /*是否是置顶帖*/
  //let $top="";
  if (post.top===1){
    //console.log("top:"+post.top);
    //$top="tt-itemselect";
    let $html=" <div class=\"tt-item tt-itemselect\" id=\"\">\n" +
      "                <div class=\"tt-col-avatar\"><svg class=\"tt-icon\"><img src=\"images/"+post.postUserHeader+"\" alt=\"postUserHeader\" class=\"postUserHeader\"></svg></div>\n" +
      "                <div class=\"tt-col-description\">\n" +
      "                    <h6 class=\"tt-title\"><a href=\"page-single-topic.html\">\n" +
      "                      <svg class=\"tt-icon\"><use xlink:href=\"#icon-pinned\"></use></svg>\n" +post.postTitle+
      "                    </a></h6>\n" +
      "                    <div class=\"row align-items-center no-gutters\">\n" +
      "                        <div class=\"col-11\">\n" +
      "                            <ul class=\"tt-list-badge\">\n" +
      "                                <li class=\"show-mobile\"><a href=\"#\"><span class=\"tt-color05 tt-badge\">"+post.postCategoryName+"</span></a></li>\n" +
      "                                <li><a href=\"#\"><span class=\"tt-badge\">"+post.postUserName+"</span></a></li>\n" +
      "                                <li><a href=\"#\"><span class=\"tt-badge\">"+post.postContentBrief+"</span></a></li>\n" +
      "                            </ul>\n" +
      "                        </div>\n" +
      "                        <div class=\"col-1 ml-auto show-mobile\"><div class=\"tt-value\">"+post.postId+"</div></div>\n" +
      "                    </div>\n" +
      "                </div>\n" +
      "                <div class=\"tt-col-category\"><span id='a"+post.postCategoryId+"' class=\"tt-color"+post.icon_2+" tt-badge saveCategoryId\">"+post.postCategoryName+"</span></div>\n" +
      "                <div class=\"tt-col-value  hide-mobile\"></div>\n" +
      "                <div class=\"tt-col-value tt-color-select  hide-mobile\">"+post.commentsNum+"</div>\n" +
      "                <div class=\"tt-col-value  hide-mobile wirte-time\">"+post.postTime+"</div>\n" +
      "            </div>"
    $(".topArea").append($html);
    /* "                <div class=\"tt-col-value hide-mobile manage-content\">\n" +
      "                  <a href=\"#\" class=\"delete\">删除</a><br>\n" +
      "                  <a href=\"#\" class=\"top\">置顶</a><br>\n" +
      "                  <a href=\"#\" class=\"highlight\">加精</a>\n" +
      "                </div>\n" +*/
  }
  else {
    let $html=" <div class=\"tt-item \" id=\"\">\n" +
      "                <div class=\"tt-col-avatar\"><svg class=\"tt-icon\"><img src=\"images/"+post.postUserHeader+"\" alt=\"postUserHeader\" class=\"postUserHeader\"></svg></div>\n" +
      "                <div class=\"tt-col-description\">\n" +
      "                    <h6 class=\"tt-title\"><a href=\"page-single-topic.html\">\n" +
      "                      <svg class=\"tt-icon\"><use xlink:href=\"#icon-pinned\"></use></svg>\n" +post.postTitle+
      "                    </a></h6>\n" +
      "                    <div class=\"row align-items-center no-gutters\">\n" +
      "                        <div class=\"col-11\">\n" +
      "                            <ul class=\"tt-list-badge\">\n" +
      "                                <li class=\"show-mobile\"><a href=\"#\"><span  class=\"tt-color05 tt-badge\">"+post.postCategoryName+"</span></a></li>\n" +
      "                                <li><a href=\"#\"><span class=\"tt-badge\">"+post.postUserName+"</span></a></li>\n" +
      "                                <li><a href=\"#\"><span class=\"tt-badge\">"+post.postContentBrief+"</span></a></li>\n" +
      "                            </ul>\n" +
      "                        </div>\n" +
      "                        <div class=\"col-1 ml-auto show-mobile\"><div class=\"tt-value\">"+post.postId+"</div></div>\n" +
      "                    </div>\n" +
      "                </div>\n" +
      "                <div class=\"tt-col-category\"><span id='a"+post.postCategoryId+"' class=\"tt-color"+post.icon_2+" tt-badge saveCategoryId\">"+post.postCategoryName+"</span></div>\n" +
      "                <div class=\"tt-col-value  hide-mobile\"></div>\n" +
      "                <div class=\"tt-col-value tt-color-select  hide-mobile\">"+post.commentsNum+"</div>\n" +
      "                <div class=\"tt-col-value  hide-mobile wirte-time\">"+post.postTime+"</div>\n" +
      "            </div>"
    $(".index-post-list").append($html);
    /*
      "                <div class=\"tt-col-value hide-mobile manage-content\">\n" +
      "                  <a href=\"#\" class=\"delete\">删除</a><br>\n" +
      "                  <a href=\"#\" class=\"top\">置顶</a><br>\n" +
      "                  <a href=\"#\" class=\"highlight\">加精</a>\n" +
      "                </div>\n" +*/
  }

}
/*通过categoryId获取categoryName*/
function getCategoryName($categoryId) {
  //console.log("categoryId:"+$categoryId);
  //console.log("111:::"+$categoryId);
  let $categoryName="你好";
  $.ajax({
    cache:false,
    async:false,
    url:"http://localhost:8080/category/getCategoryName",//./sources/categoryName.json
    type:"post",
    dataType:"json",
    data:{
      'categoryId':$categoryId,
    },
    success:function (data) {
      $categoryName=data.categoryName;//
      //console.log($categoryId+":"+$categoryName);
      return $categoryName;
    },
    error:function () {
      console.log("获取帖子类别失败");
    },
  });
  return $categoryName;
}
/*通过postId获取此帖的回复数（热度）*/
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
/*每条帖子：通过userId获取userName*/
function getUserName($userId) {
  let $userName=0;
 // console.log($userId);
  $.ajax({
   /* headers:{
      'token':token,
    },*/
    cache:false,
    async:false,
    url:"http://localhost:8080/post/getPostUserName",
    type:"post",
    dataType:"json",
    data:{
      'userId':$userId,
    },
    success:function (data) {
     // console.log("userName:"+data.userName);
      $userName=data.userName;
      //console.log($userName);
      return $userName;
    },
    error:function () {
      console.log("获取用户名字失败");
    },
  });
  return $userName;
}
function getUserHeader($userId) {
  let $userHeader="defaultUserHeader.jpg";
  $.ajax({
    cache:false,
    async:false,
    url:"http://localhost:8080/post/getHeader",
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
      return $userHeader;
    },
    error:function () {
      //console.log("获取用户头像失败");
      return $userHeader;
    }
  });
  return $userHeader;
}
/*通过postId删除帖子*/
function deletePost($postId) {
  $.ajax({
    cache:false,
    async:false,
    headers:{
      'token':token,
    },
    url:"http://localhost:8080/User/deletePost",
    type:"post",
    dataType:"json",
    data:{
      'postId':$postId,
    },
    success:function (data) {
      //console.log(data);
      alert("删除帖子成功！");
      getAllPosts();
    },error:function () {
      alert("操作失败，请重试...");
    },
  });
}
/*通过postId置顶帖子*/
function toTop($postId) {
  $.ajax({
    cache:false,
    async:false,
    headers:{
      'token':token,
    },
    url:"http://localhost:8080/User/toTop",
    type:"post",
    dataType:"json",
    data:{
      'postId':$postId,
    },
    success:function () {
      alert("置顶成功！");
      getAllPosts();
    },error:function () {
      alert("操作失败，请重试...");
    },
  });
}
/*通过postId给帖子加精*/
function toHighlight($postId) {
  $.ajax({
    cache:false,
    async:false,
    headers:{
      'token':token,
    },
    url:"http://localhost:8080/User/toHighlight",
    type:"post",
    dataType:"json",
    data:{
      'postId':$postId,
    },
    success:function () {
      alert("加精成功！");
      getAllPosts();
    },error:function () {
      alert("操作失败，请重试...");
    },
  });
}
/*显示标题栏*/
function showPostListHeader() {
  let $html="<div class=\"tt-list-header\">\n" +
    "                <div class=\"tt-col-topic\">帖子</div>\n" +
    "                <div class=\"tt-col-category\">分类</div>\n" +
    "                <div class=\"tt-col-value hide-mobile\"><!--Likes--></div>\n" +
    "                <div class=\"tt-col-value hide-mobile\">热度</div>\n" +
    "                <div class=\"tt-col-value hide-mobile wirte-time\">发表时间</div>\n" +
  /*  "                <div class=\"tt-col-value manage\">管理</div>\n" +*/
    "            </div>" +
    "         <div class=\"topArea\">    </div>";
  $(".index-post-list").append($html);
}
/*获取登录页面传递的URL并提取出其中的参数*/
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串

  /*var b = new Base64();
  var para=url.split("?")[1];/!*获取参数*!/
  para=b.decode(para);/!*解码参数*!/
  url="?"+para;/!*真正路径*!/*/

  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  //console.log(theRequest["userName"]);
  return theRequest;
}
/*base 64 加密字符串*/
function encodeStr(str) {
  // console.log(str);
  return new Base64().encode(str);
}
/*base 64 加密*/
function Base64() {
  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    if(input==="undefined"||typeof (input)=="undefined"){
      input=" ";
    }else {
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");/*修改过*/
    }
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}



