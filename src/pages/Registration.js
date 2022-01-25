import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  document.title = "Register | Lookbook";

  const initialValues = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth`, data).then((response) => {
      if (response.data === "Registration successful") {
        console.log("Registration successful");
        navigate("/login");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(18).required("Username is a required field"),
    fullName: Yup.string().min(2).max(50).required("Full name is a required field"),
    password: Yup.string().min(8).max(50).required("You must enter a password"),
    email: Yup.string().email("Email looks invalid").required("You must enter an email"),
  });

  return (
    <>
      <h1 className="text-5xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">
        Join Lookbook
      </h1>
      <div class="flex justify-center">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username:{" "}
              </label>
              <ErrorMessage name="username" component="span" className="text-red-600" />
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name:{" "}
              </label>
              <ErrorMessage name="fullName" component="span" className="text-red-600" />
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" name="fullName" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:{" "}
              </label>
              <ErrorMessage name="email" component="span" className="text-red-600" />
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" name="email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:{" "}
              </label>
              <ErrorMessage name="password" component="span" className="text-red-600" />
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" />
            </div>
            <button
              className="  w-full
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
              type="submit"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Registration;
