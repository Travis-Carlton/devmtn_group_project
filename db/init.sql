-- USER TABLE
create table users (
    user_id serial primary key,
    auth0_id varchar not null,
    email varchar not null,
    profile_name text not null,
    picture text not null,
    developer boolean 
);

-- DEVELOPER PROFILE
create table developer_profile (
    id serial primary key,
    user_id int references users(user_id),
    title text,
    overview text,
    hourly_rate text,
    portfolio text,
    skills text,
    education text
);
alter table developer_profile
add column profile_picture text;

alter table developer_profile
add column developer_email text;

-- JOBS TABLE
create table jobs (
    job_id serial primary key,
    client_id int references users(user_id),
    title varchar not null,
    description varchar not null,
    start_date varchar not null,
    estimation varchar not null,
    pay varchar not null,
    stamp date default now()
);
alter table jobs 
add column job_email text;

-- JOB FAVORITES TABLE
create table favorites (
    id serial primary key,
    user_id int references users(user_id),
    job_id int references jobs(job_id)
);


-- JOB FAVORITES VIEW
select * from
users u
join favorites f
on u.user_id = f.user_id
join jobs j
on j.job_id = f.job_id
where user_id = $1;

create table applied (
    id serial primary key,
    job_id int references jobs(job_id),
    user_id int references users(user_id)
)

create table conversations (
conversation_id serial primary key,
user_id_one int references users(user_id),
user_id_two int references users(user_id)
);

create table messages (
messages_id serial primary key,
conversation_id int references conversations(conversation_id),
messages text,
stamp date default now()
);

insert into conversations
(user_id_one,user_id_two)
values
(1,2)

insert into messages
(conversation_id,messages,user_id)
values
($1,$2,$3)