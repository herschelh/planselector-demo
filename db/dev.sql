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