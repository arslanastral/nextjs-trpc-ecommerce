import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";

function Signup() {
  // initialvalues
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };
  // validate form
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .max(30, "Username should not exceed 30 characters"),
    email: Yup.string().required("Email address is required."),

    password: Yup.string()
      .required("Password is required.")
      .max(32, "Password should not exceed 32 characters"),
  });

  const checkUserName = (action, event) => {
    action.setFieldValue("username", event.target.value);
  };

  return (
    <div className="py-[4em]">
      <div className="relative max-w-[768px] mx-auto bg-slate-100 px-8 py-4 rounded-[5px] lgmx:max-w-full lgmx:w-[90%] lgmx:py-4 lgmx:px-8">
        <div className="w-full p-5">
          <div className="max-w-md">
            <h4 className="text-3xl font-bold">Sign Up</h4>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className="relative p-5">
              <ConnectedFocusError />
              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(e) => checkUserName(formik, e)}
                  className={`w-full h-10 pl-2  rounded-md ${
                    formik.errors.username
                      ? "border-solid border-2 border-red-600"
                      : "border-solid border-2 border-slate-200"
                  }`}
                />
              </div>

              <ErrorMessage
                name="username"
                component="div"
                className="text-red-400"
              />

              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  className={`w-full h-10 pl-2  rounded-md  ${
                    formik.errors.email
                      ? "border-solid border-2 border-red-600"
                      : "border-solid border-2 border-slate-200"
                  }`}
                />
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400"
              />

              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full h-10 pl-2  rounded-md  ${
                    formik.errors.password && formik.touched.password
                      ? "border-solid border-2 border-red-600"
                      : "border-solid border-2 border-slate-200"
                  }`}
                  autoComplete="off"
                  formik={formik}
                />
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400"
              />

              <div className="text-center">
                <button className="w-full my-2 bg-[#614C47] text-white">
                  Sign Up
                </button>
              </div>

              <div className="text-center p3-regular-14 mb-4 mt-7">
                <p>
                  Already have an account?
                  <a href="/login">
                    <span className="ml-1 info underline cursor-pointer">
                      Log In
                    </span>
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
