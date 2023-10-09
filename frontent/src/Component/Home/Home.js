import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import axios from 'axios'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  
    
    
    const fetchData = async () => {
      try {
        const token = await localStorage.getItem("token");
       const userId = await localStorage.getItem("id");
        const response = await axios.get(`https://assba.onrender.com/api/note/notes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.status ==200) {
          
          const data = response.data;
          if (data.status) {
            setNotes(data.data);
          } else {
            console.error("API request was successful, but the data status indicates failure");
          }
        } else {
          console.error("HTTP error! Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };
    
    useEffect(() => {
      fetchData ();
  }, []);

  const handleViewNote = (noteId) => {
    setSelectedNote(noteId);
  };

  const handleDeselectNote = () => {
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId) => {
    const token = localStorage.getItem("token");

    fetch(`https://assba.onrender.com/api/note/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
        } else {
          console.error("Failed to delete note");
        }
      })
      .catch((error) => {
        console.error("Error deleting note", error);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-5 m-5">My Notes</h1>
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4 mb-4" key={note._id}>
            <div className="card">
              <div className="card-body">
                <h6
                  className="text-uppercase font-weight-bold font-italic text-success "
                  style={{ fontWeight: 800 }}
                >
                  Title:
                </h6>
                <h5 className="card-title">
                  <Link
                    to={`/view/${note._id}`}
                    style={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                      color: "Black",
                      fontWeight: "300",
                      fontStyle: "italic",
                    }}
                  >
                    {note.title}
                  </Link>
                </h5>
                <h6
                  className="text-uppercase  font-italic text-success"
                  style={{ fontWeight: 800 }}
                >
                  Description:
                </h6>
                <p className="card-text"> {note.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
