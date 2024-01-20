import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Form from "./Form";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(
    function () {
      async function fetchData() {
        const response = await fetch("http://localhost:8080/all-messages");
        const data = await response.json();
        setItems(data);
      }
      fetchData();
    },
    [items]
  );

  return (
    <div>
      <nav>
        <h1>FUBAR</h1>
        <Link className="link" to="/home">
          Home
        </Link>
        <Link className="link" to="/posts">
          Posts
        </Link>
        <Link className="link" to="/add-new-post">
          Add New Post
        </Link>
      </nav>

      <Routes>
        {items.map(function (item) {
          return (
            <Route
              key={item.name + item.content + item.id}
              path={`/posts${item.id}`}
              element={
                <div>
                  <h2>{item.name}</h2>
                  <h2>{item.content}</h2>
                </div>
              }
            />
          );
        })}

        <Route path="/home" element={<h2>Home</h2>} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/add-new-post"
          element={<Form items={items} setItems={setItems} />}
        />
      </Routes>
    </div>
  );
}

//   return (
//     <div>
//       <nav>
//         <h3>FoodBar</h3>
//         <Link className="topLink" to="/">
//           Home
//         </Link>
//         <Link className="topLink" to="/about">
//           About
//         </Link>
//         <Link className="topLink" to="/posts">
//           Posts
//         </Link>
//       </nav>

//       <section className="main">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           {/* Dynamic Routes with params */}
//           <Route path="/users/:username" element={<UserPage />}>
//             <Route
//               path="posts"
//               element={
//                 <div>
//                   <p>List of posts</p>
//                 </div>
//               }
//             />
//             <Route path="likes" element={<p>Likes</p>} />
//           </Route>
//           <Route path="/posts" element={<Posts />} />
//           <Route path="/posts/:postId" element={<SinglePost />} />
//           <Route path="*" element={<h2>404 page not found - define user</h2>} />
//         </Routes>
//       </section>
//     </div>
//   );
// }
