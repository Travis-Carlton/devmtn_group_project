select * from conversations c 
join messages m 
on c.conversation_id = m.conversation_id
where c.conversation_id = $1;
