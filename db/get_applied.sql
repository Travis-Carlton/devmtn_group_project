select * from 
applied a 
join jobs j
on a.job_id = j.job_id
join users u
on a.user_id = u.user_id
where j.job_id = $1;