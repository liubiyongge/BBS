//用户表
create table user(
userId integer primary key auto_increment,
password varchar(45) not null,
userName varchar(80) not null,
sex integer default 0,
credit integer default 0,
telephone varchar(45) unique,
profilePhoto varchar(45),
briefIntro varchar(600),
location varchar(100),
type integer default 0,
birthday date
)
//栏目表
create table category(
categoryId integer primary key not null,
categoryName varchar(45) not null unique,
categoryUserId integer not null,
foreign key (categoryUserId) references user(userId)  
)
//帖子表
create table post(
postId integer primary key not null auto_increment,
postTitle varchar(100) not null,
postContent varchar(500) not null,
postScore integer default 0,
postUserId integer not null,
postPhoto varchar(100),
highlight integer not null,
postTime datetime not null,
postType integer default 0,
top integer default 0,
postCategoryId integer not null,
foreign key (postCategoryId) references category(categoryId)  
foreign key (postUserId) references user(userId)
)
//回复表
create table comment(
commentId integer primary key auto_increment,
commentUserId integer not null,
commentToId integer,
commentToUserId integer not null,
commentContent varchar(100) not null,
commentPostId integer not null,
commentTime datetime not null,
foreign key (commentUserId) references user(userId),
foreign key (commentToUserId) references user(userId),
foreign key (commentPostId) references post(postId)
)
