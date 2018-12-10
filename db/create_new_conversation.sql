insert into conversations
(user_id_one,user_id_two)
values
($1,$2)
returning *