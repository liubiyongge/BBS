# README

## 数据库描述

显示格式：

中文列名：英文列名-类型-说明

#### 1.用户表users

用户ID：userId-int(11)-PRIMARY KEY,NOT NULL, AUTO_INCREMENT

密码：password-varchar(45)-NOT NULL

用户名：userName-varchar(80)-NOT NULL

性别：sex-/-enum("男","女")

积分：credit-int(11)

电话：telephone-varchar(45)-unique

头像：profilePhoto-varchar(45)

个人简介：briefIntro-varchar(600)

所在地：location-varchar(100)

身份：status-int(11)-NOT NULL 0:普通用户 1:管理员

出生日期：birthday-date

建表代码：

```mysql
use BBS;
create table users(
userId int(11) primary key not null auto_increment,
password varchar(45) not null,
userName varchar(80) not null,
sex enum('男','女'),
credit int(11),
telephone varchar(45) unique,
profilePhoto varchar(45),
briefIntro varchar(600),
location varchar(100),
status int(11) not null,
birthday date
)
```

#### 2.帖子表posts

帖子ID：postId-int(11)-PRIMARY KEY,NOT NULL,AUTO_INCREMENT

帖子标题：postTitle-varchar(100)-NOT NULL

帖子内容：postContent-varchar(500)-NOT NULL

帖子积分：postScore-int(11) default(0)//普通贴无积分

帖子发起人：postUserId-int(11)-NOT NULL, FOREIGN KEY REFERENCES users(userId) 

帖子图片：postPhoto-varchar(100)

是否加精：highlight-int(11)-NOT NULL, 0:不加精 1:加精 default(0)

发帖时间：postTime-datetime()-NOT NULL

帖子类别：postType-int(11)-NOT NULL, 0:普通贴 1:需求贴 2:置顶帖 default(0)

建表代码：

```mysql
use BBS;
create table posts(
postId int(11) primary key not null auto_increment,
postTitle varchar(100) not null,
postContent varchar(500) not null,
postScore int(11) default 0,
postUserId int(11) not null,
postPhoto varchar(100),
highlight int(11) not null,
postTime datetime not null,
postType int(11) default 0,
foreign key (postUserId) references users(userId)
)
```

#### 3.栏目表columnss

(columns与mysql中的关键字冲突，故取名为columnss)

栏目ID：columnId-int(11)-PRIMARY KEY, NOT NULL

栏目名：columnName-varchar(45)-NOT NULL

建表代码：

```mysql
use BBS;
create table columnss(
columnId int(11) primary key not null,
columnName varchar(45) not null
)
```

#### 4.回复表comments

回复ID：commentId-int(11)-PRIMARY KEY, NOT NULL， AUTO_INCREMENT

回复用户ID：commentUserId-int(11)-NOT NULL, FOREIGN KEY REFERENCES users(userId) 

被回复评论ID：commentToId-int(11)

被回复用户ID：commentToUserId-int(11)-NOT NULL,FOREIGN KEY REFERENCES users(userId) 

回复内容：commentContent-varchar(100)-NOT NULL

当前帖子ID：commentPostId-int(11)-NOT NULL,FOREIGN KEY REFERENCES posts(postId) 

回复时间：commentTime-datetime-NOT NULL

建表代码：

```mysql
use BBS;
create table comments(
commentId int(11) primary key not null auto_increment,
commentUserId int(11) not null,
commentToId int(11),
commentToUserId int(11) not null,
commentContent varchar(100) not null,
commentPostId int(11) not null,
commentTime datetime not null,
foreign key (commentUserId) references users(userId),
foreign key (commentToUserId) references users(userId),
foreign key (commentPostId) references posts(postId)
)
```

