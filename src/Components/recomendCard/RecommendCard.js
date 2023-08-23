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
        className={`Card-Container w-full  cursor-pointer md:w-full gap-3 flex mb-5 items-center `}
        // style={{
        //   display: `${type == "sm" && "flex"}`,
        //   marginBottom: `${type == "sm" && "20px"} `,
        //   width: `${type == "sm" && "100%"} `,
        //   alignItems: `${type == "sm" && "center"} `,
        // }}
      >
        <img
          src={vdo.imgUrl}
          className={`Card-Img  bg-gray-400 rounded-md h-24 w-44 }`}
          // style={{
          //   height: `${type == "sm" && "95px"}`,
          //   width: `${type == "sm" && "180px"}`,
          // }}
        />
        <div
          className={`Card-Details flex items-center gap-5 mt-0  `}
          // style={{ marginTop: `${type == "sm" && "0px"}` }}
        >
          <img
            src={Channel.img}
            className={`Channel-Img w-8 h-8 rounded-2xl bg-white md:hidden`}
            // style={{ display: `${type == "sm" && "none"}` }}
          />
          <div
            className={`Card-Texts w-full font-sans text-xs flex flex-col gap-2 `}
            // style={{ fontSize: `${type == "sm" && "12px"}` }}
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
