import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import UpdateNotes from "../UpdateNotes/UpdateNotes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import CircularProgress from '@mui/joy/CircularProgress';
import toast from "react-hot-toast";

const ViewNotes = () => {
  let deta = localStorage.getItem("id");
  let params = useParams();
  const [open, setopen] = useState(false);
  const [data, setdata] = useState("");

  const navigate = useNavigate();
  const handleDelete = async () => {
    if (deta === true || deta === null) {
      return toast.error("login First");
    }

    await axios
      .delete(`https://assba.onrender.com/api/note/notes/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((e) => {
        if (e.data.status === true) {
          setdata("deleted");
          toast.success(e.data.message);
          navigate("/dashboard");
        }
        if (e.data.status == false) {
          toast.error(e.data.message);
        }
      });
  };
  useEffect(() => {
    // console.log(params.id)
    let getsinglenotes = async () => {
      await axios
        .get(`https://assba.onrender.com/api/note/noted/${params.id}`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((e) => {
          if (e.data.status === true) {
            console.log(e.data.data);
            setdata(e.data.data);
          }
        });
    };
    getsinglenotes();
  }, []);

  return (
    <Box className="border p-3 m-2" style={{ backgroundColor: "#f0f0f0" }}>
      <h2 className="mb-3">
        {data.title && data.title.length > 20
          ? `${data.title.slice(0, 20)}...`
          : data.title}
      </h2>
      <p>{data.description}</p>
      <Box className="d-flex justify-content-end align-items-start">
        <Box>
          <EditIcon
            title="Edit"
            onClick={() => {
              setopen(true);
            }}
          />
          <UpdateNotes open={open} data={data} setopen={setopen} />
        </Box>
        <Box title="Delete" className="text-danger">
          <DeleteForeverIcon onClick={handleDelete} />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewNotes;
