import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function AdminDeleteUser() {
    let { id } = useParams();
    let navigate = useNavigate();
  
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
  
    const { authState } = useContext(AuthContext);

    const deleteUser = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/users/delete/${id}`).then((response) => {
            navigate("/admin")
        });
    }
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/users/read/${id}`).then((response) => {
        setUsername(response.data.username);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
      });
  
      document.title = "Admin Delete User - Lookbook";
    }, [id]);
  
    return (
      <div className="flex justify-center">
        <div className="mx-auto max-w-screen-lg">
        <h1 className="text-5xl font-medium leading-tight mt-0 mb-2 text-black-600">
        Delete user
        </h1>
          <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
            {" "}
            Username: {username}
          </h2>
          <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
            {" "}
            Full name: {fullName}
          </h2>
          <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
            {" "}
            Email: {email}
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={deleteUser}
          >
            Delete User
          </button>

        </div>
        
      </div>
    );
  }

export default AdminDeleteUser;

