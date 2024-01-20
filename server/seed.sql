CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL
)

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL
)

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  content TEXT NOT NULL,
  users_id INTEGER REFERENCES users(id),
  categories_id INTEGER References categories(id)
)

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY, 
    name VARCHAR (255) NOT NULL,
    posts_id INTEGER REFERENCES posts(id)
)

INSERT INTO users(name) VALUES('Dob');
INSERT INTO users(name) VALUES('Bob');
INSERT INTO users(name) VALUES('Nob');

INSERT INTO categories(name) VALUES('Board Games');
INSERT INTO categories(name) VALUES('Education');
INSERT INTO categories(name) VALUES('Films');

INSERT INTO posts(title,content,users_id, categories_id) VALUES('Apiary', 'Brilliant and innovative workerplacement game', 1, 1);
INSERT INTO posts(title,content,users_id, categories_id) VALUES('Tech Educators', 'This bootcamp rulz', 2, 2);
INSERT INTO posts(title,content,users_id, categories_id) VALUES('Human Centerpede', 'I am missing David Attenborough voiceover', 3, 3);
INSERT INTO posts(title,content,users_id, categories_id) VALUES('Aquatica', 'Beautiful Underwater theme and easy to teach', 2, 1);

INSERT INTO tags(name, posts_id) VALUES('fun', 1);
INSERT INTO tags(name, posts_id) VALUES('wowzers', 2);
INSERT INTO tags(name, posts_id) VALUES('juck', 3);


SELECT users.name, posts.title, categories.name AS category, posts.content, tags.name AS tags
FROM users 
JOIN posts ON posts.users_id = users.id
JOIN categories ON posts.categories_id = categories.id
JOIN tags on tags.posts_id = posts.id