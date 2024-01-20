import React, { useState } from "react";

export default function Form({ items, setItems }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Async function to handle form submission
  async function handleSubmit(event) {
    // Preventing the default form submission behavior
    event.preventDefault();
    // Creating a FormData object from the form
    const formData = new FormData(event.target);
    // Converting FormData to an object using 'Object.fromEntries'
    const formValues = Object.fromEntries(formData);
    // Sending POST request to the server with form data
    await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    // Updating the 'items' state (without this it keeps updating the handleSubmit function)
    setItems(items);
    // Resetting the form fields to their initial state
    event.target.reset();
  }
  // Rendering the form JSX structure, creatig drop downs and text entry fields as well as submit button
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <label>Name</label>
      <select
        required
        name="name"
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
      >
        <option value="" disabled hidden>
          Please select the user:
        </option>
        <option value="Dob">Dob</option>
        <option value="Bob">Bob</option>
        <option value="Nob">Nob</option>
      </select>
      <label>Title</label>
      <input required type="text" name="title" />
      <label>Content</label>
      <textarea required type="text" name="content"></textarea>
      <label>Category</label>
      <select
        required
        name="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled hidden>
          Choose a category
        </option>
        <option value="Board Games">Board Games</option>
        <option value="Education">Education</option>
        <option value="Film">Films</option>
      </select>
      <label>Tag</label>
      <select
        required
        name="tag"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="" disabled hidden>
          Choose a tag
        </option>
        <option value="Fun">Fun</option>
        <option value="Wowzers">Wowzers</option>
        <option value="Juck">Juck</option>
      </select>
      <div className="alignButton">
        <button type="Submit">Submit</button>
      </div>
    </form>
  );
}
