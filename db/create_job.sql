insert into jobs (client_id, title, description, start_date, estimation, pay, job_email)
values($1, $2, $3, $4, $5, $6, $7);

insert into developer_profile 
(user_id, profile_picture, name)
values 
($1, $8, $9);

update users
set developer = $10
where user_id = $1;
