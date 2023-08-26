import React, { useEffect, useState } from "react";
import logo from "../../img/channelLogo.jpg";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";
import { Config } from "../../Config";

function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [User, setUser] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const user = await axios.get(
          `${Config.api}/findUser/${comment.userId}`
        );
        setUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="CommentCard-Container flex gap-3 my-7 text-gray-400">
      <img src={User.img} className="CommentCard-Avatar w-10 h-10 rounded-full" />
      <div className="CommentCard-Details flex flex-col gap-2">
        <span className="CommentCard-Name text-sm font-medium text-gray-400">
          {User.name}{" "}
          <span className="CommentCard-Date text-xs text-gray-400 ml-2">{format(comment.timestamps)}</span>{" "}
        </span>
        <span className="CommentCard-text  text-sm">{comment.comment}</span>
      </div>
    </div>
  );
}

export default Comment;
