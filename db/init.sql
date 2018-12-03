-- USER TABLE
create table users (
    user_id serial primary key,
    auth0_id varchar not null,
    email varchar not null,
    profile_name text not null,
    picture text not null,
    developer boolean not null
);

-- DEVELOPER PROFILE
create table developer_profile (
    id serial primary,
    user_id int references users(user_id),
    title text,
    overview text,
    hourly_rate text,
    portfolio text,
    skills text,
    education text
);

-- JOBS TABLE
create table jobs (
    job_id serial primary key,
    client_id text references users(user_id),
    title varchar not null,
    description varchar not null,
    start_date varchar not null,
    estimation varchar not null,
    pay varchar not null
);

-- JOB FAVORITES TABLE
create table favorites (
    id serial primary,
    user_id int references users(user_id),
    job_id int references jobs(job_id),
);

-- JOB FAVORITES VIEW
select * from
users u
join favorites f
on u.user_id = f.user_id
join jobs j
on j.job_id = f.job_id
where user_id = $1;
