显示格式：

中文列名：英文列名-类型-说明

#### 1.用户表user

用户ID：userId-integer-PRIMARY KEY, AUTO_INCREMENT

密码：password-varchar(45)-NOT NULL

用户名：userName-varchar(80)-NOT NULL unique

性别：sex-integer-default(0) 0:男 1:女

积分：credit-integer-default(0)

电话：telephone-varchar(45)-unique

头像：profilePhoto-varchar(45)

个人简介：briefIntro-varchar(600)

所在地：location-varchar(100)

身份：type-integer-NOT NULL default(0) 0:普通用户 1:版主 2:管理员

出生日期：birthday-date


#### 2.帖子表post

帖子ID：postId-integer-PRIMARY KEY,AUTO_INCREMENT

帖子标题：postTitle-varchar(100)-NOT NULL

帖子内容：postContent-varchar(500)-NOT NULL

帖子积分：postScore-integer-default(0)//普通贴无积分

帖子发起人：postUserId-integer-NOT NULL, FOREIGN KEY REFERENCES user(userId) 

帖子图片：postPhoto-varchar(100)

是否加精：highlight-integer-NOT NULL, default(0) 0:不加精 1:加精 

发帖时间：postTime-datetime()-NOT NULL

帖子类别：postType-integer-NOT NULL,default(0)  0:普通贴 1:需求贴 2:需求贴已获得需求

是否置顶：top-integer-NOT NULL,default(0)  0:不置顶 1:置顶 

帖子所在栏目：postCategoryId-integer-NOT NULL,FOREIGN KEY REFERENCES category(categoryId) 


#### 3.栏目表category

栏目ID：categoryId-integer-PRIMARY KEY, NOT NULL

栏目名：categoryName-varchar(45)-NOT NULL,UNIQUE

栏目版主：categoryUserId-integer-NOT NULL,FOREIGN KEY REFERENCES user(userId) 



#### 4.回复表comment

回复ID：commentId-integer-PRIMARY KEY,  AUTO_INCREMENT

回复用户ID：commentUserId-integer-NOT NULL, FOREIGN KEY REFERENCES user(userId) 

被回复评论ID：commentToId-integer

被回复用户ID：commentToUserId-integer-NOT NULL,FOREIGN KEY REFERENCES user(userId) 

回复内容：commentContent-varchar(100)-NOT NULL

当前帖子ID：commentPostId-integer-NOT NULL,FOREIGN KEY REFERENCES post(postId) 

回复时间：commentTime-datetime-NOT NULL

回复是否被采纳：adopt-integer-NOT NULL,default(0) 0:普通评论 1:被采纳评论(针对需求贴)


