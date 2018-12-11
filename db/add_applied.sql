insert into applied (job_id, user_id)
values ($1, $2)
returning *;