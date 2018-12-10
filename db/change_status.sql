insert into jobs (status)
values
($1)
returning *;