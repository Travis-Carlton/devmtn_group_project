select * from conversations c 
-- join messages m 
-- on c.conversation_id = m.conversation_id 
where c.user_id_one = $1 or c.user_id_two = $1;
