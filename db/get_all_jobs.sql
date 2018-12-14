select * from 
jobs j
join users u
on j.client_id = u.user_id
where j.accepted = 0 and j.completed = false;