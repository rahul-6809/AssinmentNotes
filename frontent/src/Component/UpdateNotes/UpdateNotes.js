import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Box, Button, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const UpdateNotes = ({ open, data, setopen }) => {
  let localData = localStorage.getItem("id");
  const param = useParams();
  const navigate = useNavigate();
  console.log(data);
  let { title, description } = data;
  let [titl, settitle] = useState(title);
  let [descc, setdesc] = useState(description);

  let handleChange1 = (e) => {
    if (localData === true || localData === null) {
      return toast.error("login First");
    }
    settitle(e.target.value);
  };

  let handleChange4 = (e) => {
    if (localData === true || localData === null) {
      return toast.error("login First");
    }
    setdesc(e.target.value);
  };
  useEffect(() => {
    settitle(title);
    setdesc(description);
  }, [title]);
  
  const handleEdit = async () => {
    if (localData === true || localData === null) {
      return toast.error("login First");
    }
    
    console.log(descc, titl);

    await axios
      .put(
        `https://assba.onrender.com/api/note/notes/${param.id}`,
        { descc, titl },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((e) => {
        if (e.data.status === true) {
          toast.success(e.data.message);
          setopen(false);
          navigate("/dashboard");
        }
        if (e.data.status === false) {
          toast.error(e.data.message);
        }
      });
  };

  return (
    data.title !== undefined && (
      <Dialog
        PaperProps={{
          sx: { width: "50%", padding: "20px", display: "flex", gap: 5 },
        }}
        open={open}
      >
        
        <TextField
          name="title"
          value={titl}
          onChange={(e) => {
            handleChange1(e);
          }}
          sx={{ fontSize: "5rem" }}
          id="standard-basic"
          label="Title"
          variant="standard"
        />
        <Textarea
          name="desc"
          value={descc}
          onChange={(e) => {
            handleChange4(e);
          }}
          style={{ border: "none" }}
          sx={{ outline: "none" }}
          id="outlined-basic"
          placeholder="write Your description......"
          variant="outlined"
        />
        <Button
          onClick={handleEdit}
          sx={{ textTransform: "none", background: "teal", color: "black" }}
        >
          Save Edit
        </Button>
        <CloseIcon
          onClick={() => setopen(false)}
          sx={{ position: "absolute", right: 5, top: 0, cursor: "pointer" }}
        />
      </Dialog>
    )
  );
};

export default UpdateNotes;
