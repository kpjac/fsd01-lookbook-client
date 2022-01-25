import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';


function Account() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState("");

  const { authState } = useContext(AuthContext);


  useEffect(() => {
    document.title = "Account - Lookbook";
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/read/${authState.id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setProfileImageSrc(response.data.profileImageSrc);
      });
  }, []);

  const accountChanges = (data) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/update`,
        {
          username: username,
          fullName: fullName,
          email: email,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };

  const processNewProfileImg = async (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];

    // get secure url from our server
    const url = (await axios.get(`${process.env.REACT_APP_API_URL}/s3/generateUploadUrl`))
      .data;
    console.log(url);

    // post the image directly to the s3 bucket
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const imageUrl = url.split("?")[0];
    console.log(imageUrl);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/updateProfileImage`,
        {
          profileImageSrc: imageUrl,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log("it worked");
        setProfileImageSrc(imageUrl);
      });
  };

  return (<>
    <h1 className="text-5xl  text-center font-medium leading-tight mt-0 mb-2 text-black-600">
    My Account
  </h1>
  <h2 className="text-3xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">You can update your information here.</h2>
    <div className="flex justify-center">
    
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
        Username&nbsp;
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            type="text"
            value={username}
            placeholder="New username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="mb-4">
        Full name&nbsp;
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            type="text"
            value={fullName}
            placeholder="New full name.."
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div className="mb-4">
        Email&nbsp;
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            type="text"
            value={email}
            placeholder="New email..."
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <button             className="  w-full
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
            ease-in-out"
            onClick={accountChanges}>Update Profile Information</button>
        </div>
      
      
      <form onSubmit={processNewProfileImg}>
      <div className="mb-3 w-96">
        <img width="80px" src={profileImageSrc}></img>
        <label className="block text-gray-700 text-sm font-bold mb-2">New Profile Photo: </label>
        <input className="form-control
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
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="image" name="image" />
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
            ease-in-out" type="submit">Update Profile Photo</button>
      </form>
      </div>
    </div>
    </>
  );
}
export default Account;
