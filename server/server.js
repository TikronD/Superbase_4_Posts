import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Loading environment variables from an .env file
dotenv.config();
// Create Express app
const app = express();
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Middleware to parse JSON data in request bodies
app.use(express.json());

// Defining the port and starting the server to listen on
const PORT = 8080;
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

// Setting up a connection to the PostgreSQL database with 'pg'
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });
// Endpoint to get all messages with user names, post titles, categories, and content
app.get("/all-messages", async function (request, response) {
  const result =
    await db.query(`SELECT posts.id, users.name, posts.title, categories.name AS category, posts.content
    FROM users 
    JOIN posts ON posts.users_id = users.id
    JOIN categories ON posts.categories_id = categories.id
  `);
  response.json(result.rows);
});
// Endpoint getting ALL posts
app.get("/posts", async function (request, response) {
  const result = await db.query(`SELECT * FROM posts`);
  response.json(result.rows);
});
// Endpoint ADDING a NEW post
app.post("/posts", async function (request, response) {
  let users_id = 0;
  // Initializing variables to store user and category IDs
  let categories_id = 0;
  const category = request.body.category;
  const content = request.body.content;
  const name = request.body.name;
  const tag = request.body.tag;
  const title = request.body.title;
  // Assigning user ID based on the user's name
  if (name === "Dob") {
    users_id = 1;
  } else if (name === "Bob") {
    users_id = 2;
  } else {
    users_id = 3;
  }
  // Assigning category ID based on the category
  if (category === "Board Games") {
    categories_id = 1;
  } else if (name === "Education") {
    categories_id = 2;
  } else {
    categories_id = 3;
  }
  // Inserting a new post into the 'posts' table
  await db.query(
    "INSERT INTO posts (content, title, users_id, categories_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [content, title, users_id, categories_id]
  );
  // Inserting a new user into the 'users' table
  await db.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
  // Inserting a new category into the 'categories' table
  await db.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [
    category,
  ]);
  // Inserting a new tag into the 'tags' table
  await db.query(
    "INSERT INTO tags (name, posts_id) VALUES ($1, $2) RETURNING *",
    [tag, categories_id]
  );
  // Sending a response indicating that the post has been added
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
