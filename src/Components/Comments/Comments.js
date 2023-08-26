import React, { useEffect, useState } from "react";
import Comment from "../CommentCard/Comment";
import axios from "axios";
import { Config } from "../../Config";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";

function Comments({ videoID, socket }) {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [comments, setComments] = useState([]);
  const [Input, setInput] = useState("");
  const navigate = useNavigate();
  const [SId, setSId] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let comm = await axios.get(`${Config.api}/getcomments/${videoID}`, {
          headers: { authorization: localStorage.getItem("accessToken") },
        });
        setComments(comm.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [videoID]);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axios.post(
          `${Config.api}/addcomment`,
          { ...values, videoId: currentVideo._id },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        formik.resetForm();
        // alert("Comment Added");

        socket.on("SId", (data) => {
          setSId(data);
        });
        let timestamps = new Date();
        var comm = {
          ...values,
          videoId: currentVideo._id,
          timestamps: timestamps,
          userId: currentUser.others._id,
        };
        socket.emit("addComment", comm);
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    socket.on("receiveComment", (data) => {
      console.log(data);
      setComments((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="Comments-Container">
      <div className="Comments-New flex items center gap-4">
        <img className="Comments-Avatar w-10 h-10 rounded-full bg-slate-50" src={currentUser.img} />
        <form onSubmit={formik.handleSubmit}>
          <input
            className="Comments-Input border-none border-b border-gray-400 bg-transparent outline-none p-1 w-full text-gray-400"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            placeholder="Add Your Comment...."
          />
          <button type="submit" className="Comments-Addbutton hidden">
            add
          </button>
        </form>
      </div>
      {comments.map((com) => {
        return <Comment comment={com} />;
      })}
    </div>
  );
}

export default Comments;
