import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// start server
const PORT = 8080;
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/all-messages", async function (request, response) {
  const result =
    await db.query(`SELECT posts.id, users.name, posts.title, categories.name AS category, posts.content
    FROM users 
    JOIN posts ON posts.users_id = users.id
    JOIN categories ON posts.categories_id = categories.id
  `);
  response.json(result.rows);
});

app.get("/posts", async function (request, response) {
  const result = await db.query(`SELECT * FROM posts`);
  response.json(result.rows);
});

app.post("/posts", async function (request, response) {
  let users_id = 0;
  let categories_id = 0;
  const category = request.body.category;
  const content = request.body.content;
  const name = request.body.name;
  const tag = request.body.tag;
  const title = request.body.title;
  if (name === "Ben") {
    users_id = 1;
  } else if (name === "Dan") {
    users_id = 2;
  } else {
    users_id = 3;
  }
  if (category === "gaming") {
    categories_id = 1;
  } else if (name === "sport") {
    categories_id = 2;
  } else {
    categories_id = 3;
  }
  await db.query(
    "INSERT INTO posts (content, title, users_id, categories_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [content, title, users_id, categories_id]
  );
  await db.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
  await db.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [
    category,
  ]);
  await db.query(
    "INSERT INTO tags (name, posts_id) VALUES ($1, $2) RETURNING *",
    [tag, categories_id]
  );

  response.json("post added");
});

// const insertRenderURL = process.env.DATABASE_URL;
// const db = new pg.Pool({ connectionString: insertRenderURL });

// app.get("/posts", async (request, response) => {
//   // response.json("Environment variables to be shown here");
//   const result = await db.query("SELECT * FROM posts");
//   response.json(result.rows);
// });

// app.get("/posts/:id", async (request, response) => {
//   // response.json("Environment variables to be shown here");
//   const id = request.params.id;
//   const result = await db.query(
//     `SELECT * FROM users
//      JOIN posts ON users.posts_id = posts.id
//      JOIN categories ON posts.categories_id = categories.id
//      WHERE posts.id = $1`,
//     [id]
//   );
//   // when clicked on post, this will link to the relevant id in the database
//   return response.json(result.rows[0]);
// });
