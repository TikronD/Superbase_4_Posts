import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Posts() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {items.map(function (item) {
        return (
          <div
            className="post-container"
            key={item.name + item.content + item.id}
          >
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
