insert into ROLE(ID,NAME) values (1, 'USER');
insert into ROLE(ID,NAME) values (2, 'ACTUATOR');

insert into USER(ID, ACCOUNT_NON_EXPIRED, ACCOUNT_NON_LOCKED, CREDENTIALS_NON_EXPIRED, EMAIL, ENABLED, NAME, PASSWORD) values (1, TRUE, TRUE, TRUE, 'joeuser@example.com', TRUE, 'Joe User', 'password');
insert into USER(ID, ACCOUNT_NON_EXPIRED, ACCOUNT_NON_LOCKED, CREDENTIALS_NON_EXPIRED, EMAIL, ENABLED, NAME, PASSWORD) values (2, TRUE, TRUE, TRUE, 'janeuser@example.com', TRUE, 'Jane User (Pivotal)', 'password');

insert into USER_ROLES(USER_ID, ROLES_ID) values (1, 1);
insert into USER_ROLES(USER_ID, ROLES_ID) values (1, 2);
insert into USER_ROLES(USER_ID, ROLES_ID) values (2, 1);

insert into TODO_LIST(ID, NAME, OWNER_USER_ID) values (1, 'Test List 1', 1);
insert into TODO_LIST(ID, NAME, OWNER_USER_ID) values (2, 'Test List 2', 1);

insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (1, 'Item 1', 1, FALSE, 1);
insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (2, 'Item 2', 1, FALSE, 1);
insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (3, 'Item 3', 1, FALSE, 1);

insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (4, 'Item A', 2, FALSE, 1);
insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (5, 'Item B', 2, FALSE, 1);
insert into TODO_ITEM(ID, NAME, TODO_LIST_ID, COMPLETED, OWNER_USER_ID) values (6, 'Item C', 2, FALSE, 1);