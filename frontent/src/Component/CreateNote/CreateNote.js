import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, description };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://assba.onrender.com/api/note/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        console.log("Note created successfully");
        navigate("/dashboard");
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <h2 className="text-center">Create New Note</h2>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3 text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Create Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
