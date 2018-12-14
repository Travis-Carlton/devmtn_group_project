insert into developer_profile 
(user_id, developer_email, title, overview, hourly_rate, 
portfolio, skills, education, profile_picture, name)
values 
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);

update users
set developer = $11
where user_id = $1;