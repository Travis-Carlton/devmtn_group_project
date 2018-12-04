select * from
users u
join favorites f
on u.user_id = f.user_id
join jobs j
on j.job_id = f.job_id
where u.user_id = $1;