insert into role(id,name) values (1, 'USER');
insert into role(id,name) values (2, 'ACTUATOR');

insert into users(id, account_non_expired, account_non_locked, credentials_non_expired, email, enabled, name, password) values (1, TRUE, TRUE, TRUE, 'joeuser@example.com', TRUE, 'Joe User', 'password');
insert into users(id, account_non_expired, account_non_locked, credentials_non_expired, email, enabled, name, password) values (2, TRUE, TRUE, TRUE, 'janeuser@example.com', TRUE, 'Jane User', 'password');

insert into user_roles(user_id, roles_id) values (1, 1);
insert into user_roles(user_id, roles_id) values (1, 2);
insert into user_roles(user_id, roles_id) values (2, 1);

insert into todo_list(id, name, owner_user_id) values (1, 'Test List 1', 1);
insert into todo_list(id, name, owner_user_id) values (2, 'Test List 2', 1);

insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (1, 'Item 1', 1, FALSE, 1);
insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (2, 'Item 2', 1, FALSE, 1);
insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (3, 'Item 3', 1, FALSE, 1);

insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (4, 'Item A', 2, FALSE, 1);
insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (5, 'Item B', 2, FALSE, 1);
insert into todo_item(id, name, todo_list_id, completed, owner_user_id) values (6, 'Item C', 2, FALSE, 1);