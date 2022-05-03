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
