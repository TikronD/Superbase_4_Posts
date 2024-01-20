import React, { useState } from "react";

export default function Form({ items, setItems }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    setItems(items);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
