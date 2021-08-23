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