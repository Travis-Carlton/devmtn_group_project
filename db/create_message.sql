insert into messages
(conversation_id,messages,user_id)
values
($1,$2,$3)
returning *