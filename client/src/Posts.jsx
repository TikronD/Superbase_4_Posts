// import Link component to replac 'a href'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Declaring a state variable 'items' and a function 'setItems'
export default function Posts() {
  const [items, setItems] = useState([]);

  // Using 'useEffect' to fetch data and defining an asynchronous function 'fetchData' to fetch data from an API
  useEffect(function () {
    async function fetchData() {
      // Sending a request to the specified port
      const response = await fetch("http://localhost:8080/posts");
      // Parsing the JSON data from the response
      const data = await response.json();
      // Update 'items' state with fetched data
      setItems(data);
    }
    // Calling 'fetchData' function when the component mounts using an empty dependency array
    fetchData();
    // Empty dependency array ensures 'useEffect' only runs once
  }, []);

  // Render part of the component
  return (
    <div className="postBoard">
      <h2>Posts</h2>
      {/* Mapping through the 'items' array, rendering each post */}
      {items.map(function (item) {
        return (
          // Each post is wrapped in a div with a unique key based on post properties
          <div
            className="postContainer"
            key={item.name + item.content + item.id}
          >
            {" "}
            {/* Creating a link to a post using the post's ID */}
            <Link to={`/posts${item.id}`}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// // import { isHtmlElement } from "react-router-dom/dist/dom";

// export default function Posts() {
//   // variable starts whats inside useState, setItems updates item
//   const [items, setItems] = useState([]);

//   // updates when the screen is first loaded and anytime the variable inside the dependancy is updated
//   useEffect(() => {
//     async function fetchData() {
//       // get the data from superbase databank
//       const response = await fetch("http://localhost:8080/posts");
//       // this data will then be displayed in as .json
//       const data = await response.json();
//       setItems(data);
//     }
//     // run the above funcion
//     fetchData();
//   }, []);

//   // // useSearchParams to return an array
//   // const [searchParams] = useSearchParams();
//   // // gets the sort parameters for sort
//   // const sortType = searchParams.get("sort");

//   // const posts = ["Moon", "Sun", "Stars", "Planets", "Comets", "Satellites"];

//   // if (sortType === "desc") {
//   //   posts.sort(); // Sort in ascending order
//   // } else if (sortType === "asc") {
//   //   posts.sort().reverse(); // Sort and then reverse for descending order
//   // }

//   return (
//     <>
//       <h2>Posts</h2>
//       <div className="sortBtn">
//         {/* <Link to="/posts?sort=desc">Sort A-Z</Link>
//         <Link to="/posts?sort=asc">Sort Z-A</Link>
//         <Link to="/posts">Original order</Link> */}
//       </div>
//       {/* fetch title */}
//       <nav>
//         {items.map((item) => (
//           <Link to={`/posts/${item.id}`} key={item.title}>
//             {item.title}
//           </Link>
//         ))}
//       </nav>
//       {/* fetch item */}
//       {/* <nav>
//         {items.map((item) => (
//           <Link to={`/posts/${item.id}`} key={item.id}>
//             {item.title}
//           </Link>
//         ))}
//       </nav> */}
//       <Outlet />
//     </>
//   );
// }
