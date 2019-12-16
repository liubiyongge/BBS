$(function () {
  //console.log(user);
  showAllCategories();
  /*点击 删除栏目*/
 /* $(".delete-category").click(function () {
    let $categoryId=$(this).parents(".tt-item").find(".saveCategoryId").attr("id");
    //console.log($categoryId);
    deleteCategory($categoryId);
    //showAllCategories();
    let page="page-categories.html?";
    let para=encodeStr("userId="+user.userId);
    let path=page+para;
    window.location.href=path;
  });*/
  /*点击 进入栏目*/
 $(".into-category").click(function () {
  // alert("111");
   let $categoryId=$(this).parents(".tt-item-header").find(".saveCategoryId").attr("id");
   //alert($categoryId);
   let page="page-categories-single.html?";
   let para="&categoryId="+$categoryId;/*"userName="+user.userName+*/
   let path=page+para;
   $(this).attr("href",path);
 });

});
/*显示所有的栏目*/
function showAllCategories() {
  $(".tt-categories-list .row").empty();
  $.ajax({
    cache:false,
    async:false,
    url:"/category/findAll",
    type:"post",
    dataType:"json",
    success:function (data) {
      //console.log(data);
      for (let i=0;i<data.length;i++){
        let category={};
        category.categoryId=data[i].categoryId;
             let posts={};
               posts=getPostByCategoryId(category.categoryId);
            // console.log("posts:"+posts);
             category.postTitle1="";
             category.postTitle2="";
             if (posts.length>=2){
               category.postTitle1=posts[0].postTitle;
               category.postTitle2=posts[1].postTitle;
             }else if (posts.length===1){
               category.postTitle1=posts[0].postTitle;
             }
        category.categoryName=data[i].categoryName;
        //console.log("categoryName:" + category.categoryName);
        category.categoryUserId=data[i].categoryUserId;
        category.categoryUserName=getUserName(category.categoryUserId);
        category.icon_color="21";
        category.icon_color=category.categoryId;
        addCategoryToList(category);
      }
    },
    error:function () {
      alert("加载失败...");
    },
  });
}
/*添加一个栏目到页面上*/
function  addCategoryToList(category) {
  let $html="<div class=\"col-md-6 col-lg-4\">\n" +
    "          <div class=\"tt-item\">\n" +
    "            <div class=\"tt-item-header\">\n" +
    "              <ul class=\"tt-list-badge \">\n" +
    "                <li><a href=\"javascript:;\"><span class=\"saveCategoryId tt-color03 tt-badge\" id='"+category.categoryId+"'>"+category.categoryName+"</span></a></li>\n" +
    "              </ul>\n" +
    "              <h6 class=\"tt-title\"><a href=\"page-categories-single.html\" class='into-category'>进入栏目</a></h6>\n" +
    "            </div>\n" +
    "            <div class=\"tt-item-layout\">\n" +
    "              <div class=\"innerwrapper\">\n" +
    "                在此分享你的"+category.categoryName+"趣事\n" +
    "              </div>\n" +
    "              <div class=\"innerwrapper \">\n" +
    "                <h6 class=\"tt-title\">版主："+category.categoryUserName+"</h6>\n" +
    "                <ul class=\"tt-list-badge\">\n" +
    "                  <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+category.postTitle1+"</span></a></li>\n" +
    "                  <li><a href=\"javascript:;\"><span class=\"tt-badge\">"+category.postTitle2+"</span></a></li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>";
  $(".tt-categories-list .row").append($html);
  /*
   "              <div class=\"tt-innerwrapper delete-category\">\n" +
    "                <a href=\"javascript:;\" class=\"tt-btn-icon\">\n" +
    "                  <i class=\"tt-icon\"><svg><use xlink:href=\"#icon-shanchu\"></use></svg></i>\n" +
    "                  <span class=\"tt-text\">删除此栏目</span>\n" +
    "                </a>\n" +
    "              </div>\n" +*/
  /*管理权限*/
  if (user.type==="2"){
    $(".delete-category").show();
  }else {
    $(".delete-category").hide();
  }

}
/*通过categoryId获取栏目下的帖子*/
function getPostByCategoryId($categoryId) {
  var posts;
  $.ajax({
    cache:false,
    async:false,
    url:"/post/postInCategory",
    type: "post",
    dataType: "json",
    data:{
      'categoryId':$categoryId,
    },
    success:function (data) {
      posts=data;
      return posts;
    },
    error:function () {
      console.log("获取帖子信息失败");
    },
  });
  //console.log("posts1:");
  //console.log(posts);
  return posts;
}
/*通过categoryId删除栏目*/
function deleteCategory($categoryId) {
  //console.log($categoryId);
  $.ajax({
    cache:false,
    async:false,
    url:"./sources/categories.json",
    type:"post",
    dataType:"json",
    data: {
      'categoryId':$categoryId,
    },
    success:function () {
      alert("删除栏目成功！");
    },
    error:function () {
      alert("操作失败，请重试...");
    }
  });
}
