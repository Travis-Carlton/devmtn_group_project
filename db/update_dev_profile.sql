update developer_profile 
set overview = $1,
 hourly_rate = $2,
 portfolio = $3,
 skills = $4,
 education = $5,
 developer_email = $6,
 title = $7
where user_id = $8