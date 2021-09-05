use plans;


create table if not exists plans (
    id int auto_increment primary key,
    name varchar(50),
    price int
);

create table if not exists features (
    id int auto_increment primary key,
    attrName varchar(50) unique key,
    name varchar(50)
);

create table if not exists plan_features (
    id int auto_increment primary key,
    plan_id int,
    feature varchar(50)
);


insert into features (name, attrName)
values
('General', 'general'),
('Specialist', 'specialist'),
('Physiotheraphy', 'physiotherapy');

insert into plans (name, price) 
values 
('Standard Plan', 0);

SET @plan_id = LAST_INSERT_ID();

insert into plan_features (plan_id, feature)
values
(@plan_id, 'general');

insert into plans (name, price) 
values 
('Premium Plan', 388);

SET @plan_id = LAST_INSERT_ID();

insert into plan_features (plan_id, feature)
values
(@plan_id, 'general'),
(@plan_id, 'specialist'),
(@plan_id, 'physiotherapy');