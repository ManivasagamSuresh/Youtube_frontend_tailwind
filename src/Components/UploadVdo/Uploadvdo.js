import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
// import "./Uploadvdo.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import axios from "axios";
import { Config } from "../../Config";
import { useNavigate } from "react-router-dom";

function Uploadvdo({ setOpen,mob }) {
  const navigate = useNavigate();
  const [Img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [vdoPerc, setvdoPerc] = useState(0);
  const [Vdo, setVdo] = useState(undefined);
  const [inputs, setInputs] = useState({});

  const [tags, setTags] = useState([]);

  let t = [];
  const handleTags = (e) => {
    console.log(e.target.value.split(","));

    // t.push(e.)
    setTags(e.target.value.split(","));
  };

  //

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const UploadFile = (file, urltype) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urltype === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setvdoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urltype]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    Vdo && UploadFile(Vdo, "videoUrl");
  }, [Vdo]);

  useEffect(() => {
    Img && UploadFile(Img, "imgUrl");
  }, [Img]);

  const handleUploadDb = async (e) => {
    e.preventDefault();
    console.log({ ...inputs, tags });
    try {
      const res = await axios.post(
        `${Config.api}/addvideo`,
        { ...inputs, tags },
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      setOpen(false);
      console.log(res.data);
      alert("Your Video has been Uploaded");
      // window.location.reload();
      navigate(`/video/${res.data.insertedId}`);
    } catch (error) {}
  };

  return (
    <div className={`Upload-Container  w-full  h-fit  px-1  bg-gray-600 bg-opacity-50 md:flex md:flex-col items-center justify-center`}>
      <form className="w-full  flex flex-col items-center justify-center">
        <div className="Upload-Wrapper  w-full md:w-9/12 h-fit bg-gray-800 text-gray-400 p-3 flex flex-col gap-20 relative">
          <h2 className="Upload-Close absolute top-2 right-3 cursor-pointer text-2xl " onClick={() => navigate("/random")} >
            X
          </h2>
          <h1 className="text-center text-2xl md:text-4xl mx-6">Upload a new Video</h1>
          
          <label className="Upload-Lable">Video :</label>
          {vdoPerc > 0 ? (
            "Uploading :" + vdoPerc + "%"
          ) : (
            <input
              type={"file"}
              accept="video/*"
              className="Upload-Input border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent"
              onChange={(e) => setVdo(e.target.files[0])}
            />
          )}

          <input
            type={"text"}
            placeholder="Title"
            className="Upload-Input border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent"
            onChange={handleChange}
            name="title"
          />
          <textarea
            rows="8"
            cols=""
            placeholder="Description"
            className="Upload-Input border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent"
            onChange={handleChange}
            name="desc"
          ></textarea>

          <input
            type={"text"}
            placeholder="Separate the tags with commas."
            className="Upload-Input border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent"
            onChange={handleTags}
            name="tags"
          />

          <label className="Upload-Lable border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent">Image :</label>
          {imgPerc ? (
            "Uploading :" + imgPerc + "%"
          ) : (
            <input
              type={"file"}
              accept="image/*"
              className="Upload-Input border border-gray-700 rounded-md p-2 text-gray-400 bg-transparent"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}

          <button
            type="submit"
            className="Upload-Button bg-red-500 font-medium text-white border-none rounded-md py-2 px-3 mb-2 cursor-pointer"
            onClick={handleUploadDb}
          >
            Add Video
          </button>
        </div>
      </form>
    </div>
  );
}

export default Uploadvdo;
