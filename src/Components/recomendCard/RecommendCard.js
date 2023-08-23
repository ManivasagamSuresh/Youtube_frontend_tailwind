import React, { useEffect, useState } from "react";
// import "./Videocard.css";
import mb from "../../img/mb.jpg";
import logo from "../../img/channelLogo.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { Config } from "../../Config";

function RecommendCard({vdo, test }) {
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
        className={`Card-Container w-full   cursor-pointer  gap-3 flex flex-col mb-8  md:flex-row`}
      >
        <img
          src={vdo.imgUrl}
          className={`Card-Img  bg-gray-400 rounded-md w-full h-40 md:w-44 md:h-28 object-fit }`}
        />
        <div
          className={`Card-Details flex items-center justify-start  gap-3 mt-0  `}
        >
          <img
            src={Channel.img}
            className={`Channel-Img w-8 h-8 rounded-full bg-white md:hidden`}
          />
          <div
            className={`Card-Texts w-full font-sans text-xs flex flex-col gap-2 `}
          >
            <h1 className="Card-Title text-lg font-semibold text-gray-400 ">{vdo.title}</h1>
            <h2 className="Card-ChannelName text-sm text-gray-400  mx-2 hidden md:block">{Channel.name}</h2>
            <div className="Card-Info text-sm text-gray-400 ">
            <span className="md:hidden"> {Channel.name}  · </span> {vdo.views} Views · {format(vdo.timestamps)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecommendCard;
