select * from 
jobs j
join users u
on j.client_id = u.user_id;