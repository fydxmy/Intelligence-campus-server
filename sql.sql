-- 学院信息表
create table studentStatuses (
  id int(10) PRIMARY KEY AUTO_INCREMENT,
  studentId varchar(255), -- 学院名称
  phoneNumber varchar(255) not null, -- 电话号码
	gender int(10),  -- 性别
	nativePlace varchar(255),  -- 籍贯
	identityNumber varchar(255),  -- 身份证
	dormitory varchar(255),  -- 宿舍
	collegeId int(10) not null,  -- 分院
	classId int(10) not null,  -- 班级
  updatedAt datetime not null, -- 更新时间
	createdAt datetime not null, -- 创建时间
	foreign key (collegeId) references colleges(id) on update cascade on delete cascade,
	foreign key (classId) references classes(id) on update cascade on delete cascade
)

create table sutuo_activity (
	id int primary key AUTO_INCREMENT, -- 活动Id
	title varchar(255), -- 活动标题
	introduce varchar(255), -- 活动介绍
	startTime varchar(255), -- 活动开始时间
	endTime varchar(255), -- 活动结束时间
	imgUrl varchar(255), -- 活动图片
	grade float(4,2), -- 活动分数
	rankName varchar(255), -- 活动级别
	rankId int(255), -- 活动人群 分院编号或者是班级编号
	stStatus int(10), -- 活动状态
	location varchar(255), -- 活动地点
	organization varchar(255),  -- 活动组织
	initiator varchar(255), -- 活动发起人姓名
	canNumber int(10), -- 可以参与人数
	stalreadyNumber int(10),-- 已经参与人数
	inishNumber int(10), -- 已经完成的人数
	signWay varchar(255), -- 活动签到方式
	auditId varchar(255),-- 活动审核人Id
	auditName varchar(255), -- 活动审核人名字
	updatedAt datetime, -- 更新时间
	createdAt datetime not null -- 创建时间
)
