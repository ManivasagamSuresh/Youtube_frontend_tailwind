import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { Config } from "../../Config";

function VideoCard({ type, vdo }) {
  const [Channel, setChannel] = useState({});

  useEffect(() => {
    // console.log(vdo.userId);
    fetchChannel();
  }, [vdo.userId]);

  const fetchChannel = async () => {
    try {
      const channeldata = await axios.get(
        `${Config.api}/findUser/${vdo.userId}`
      );

      setChannel(channeldata.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/video/${vdo._id}`} style={{ textDecoration: "none" }}>
      <div
        className={`Card-Container w-full  cursor-pointer md:w-72 gap-3 ${
          type == "sm" ? "flex mb-5 items-center" : "mb-10"
        }`}
      >
        <img
          src={vdo.imgUrl}
          className={`Card-Img  h-40 bg-gray-400 rounded-md ${
            type == "sm" ? "h-24 w-44" : "h-40 w-full"
          }`}
        />
        <div
          className={`Card-Details flex items-center gap-5 ${
            type == "sm" ? "mt-0" : "mt-4"
          } `}
        >
          <img
            src={Channel.img}
            className={`Channel-Img w-8 h-8 rounded-2xl bg-white ${
              type == "sm" ? "hidden" : ""
            }`}
          />
          <div
            className={`Card-Texts w-full font-sans ${
              type == "sm" ? "text-xs" : ""
            }`}
          >
            <h1 className="Card-Title text-lg font-semibold text-gray-400 ">
              {vdo.title}
            </h1>
            <h2 className="Card-ChannelName text-sm text-gray-400  mx-2 hidden md:block">
              {Channel.name}
            </h2>
            <div className="Card-Info text-sm text-gray-400 ">
              <span className="md:hidden"> {Channel.name} · </span> {vdo.views}{" "}
              Views · {format(vdo.timestamps)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
