import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function AdminUpdateUser() {
let { id } = useParams();
let navigate = useNavigate();

const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Account - Lookbook";

    axios
    .get(`${process.env.REACT_APP_API_URL}/users/read/${id}`).then((response) => {
        setUsername(response.data.username);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
      
     });
  }, []);

  const accountChanges = (data) => {
    axios
      .put(
        (`${process.env.REACT_APP_API_URL}/users/updateById/${id}`),
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


  return (

<>
    <h1 className="text-5xl  text-center font-medium leading-tight mt-0 mb-2 text-black-600">
    Update user
  </h1>
  <h2 className="text-3xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">You can replace the existing infomation with the current one</h2>
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
      
      
      
      </div>
    </div>
    </>
  );
}

export default AdminUpdateUser;
