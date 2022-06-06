CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0 
);


insert into blogs (author, url, title) values ('Maija Poppanen', 'www.yritys.oy', 'Yritys Oy Ab');
insert into blogs (author, url, title) values ('Matti Luukkainen', 'www.test.oy', 'Test Oy Ab');

insert into users (username, name) values ('mluukkai', 'Matti Luukkainen');
insert into users (username, name) values ('mpoppan@testi.fi', 'Maija Poppanen');

insert into blogs (author, url, title, user_id, year) values ('Masa Pentti', 'www.testtest.test', 'Testing Blog', 1, 2000);


CREATE TABLE readinglist (
    id SERIAL PRIMARY KEY,
    blog_id int,
    user_id int
);