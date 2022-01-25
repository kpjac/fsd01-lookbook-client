import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function NewPost() {
  const initialValues = {
    title: "",
    postText: "",
  };

  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const processNewPost = async (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];

    // get secure url from our server
    const url = (await axios.get(`${process.env.REACT_APP_API_URL}/s3/generateUploadUrl`))
      .data;
    console.log(url);

    // post the image direclty to the s3 bucket
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const imageUrl = url.split("?")[0];
    console.log(imageUrl);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          imageSrc: imageUrl,
          caption: event.target.caption.value,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log("it worked");
        navigate("/");
      });
  };

  return (
    <>
    <h1 className="text-5xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">
        Create New Post
      </h1>
    <div className="flex justify-center">
      <form onSubmit={processNewPost}>
        <div className="mb-3 w-96">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:{" "}
          </label>
          <input
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="image"
            name="image"
          />
        </div>
        <div className="form-group mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Caption:{" "}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="caption"
            name="caption"
          />
        </div>
        <button className="  w-full
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out" type="submit">Create Post</button>
      </form>
    </div>
    </>
  );
}

export default NewPost;
