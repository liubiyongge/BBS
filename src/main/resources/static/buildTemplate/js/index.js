$(function () {
  var $userId=0;
  /*1.鼠标移入移出右上角*/
  $(".user-settings").mouseenter(function () {
    // alert("123");
    $(".toUserCenter").addClass("showToUserCenter");
  }).mouseleave(function () {
    // alert("321");
    $(".toUserCenter").removeClass("showToUserCenter");
  });
  /*点击个人中心按钮*/
  $(".user-center-bt").click(function () {
    let page="page-single-user.html?";
    //let para=encodeStr("userId="+$userId);//+"&userName="+user.userName+"&profilePhoto="+user.profilePhoto
    //let path=page+para;
    path=page;
    window.location.href=path;
  });
  /*点击 退出登录 按钮*/
  $(".log-out-bt").click(function () {
    window.location.href="index.html";
  });
});
