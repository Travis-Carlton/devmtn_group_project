insert into users (auth0_id, email, profile_name, picture, developer)
values
($1, $2, $3, $4, $5)
returning *;