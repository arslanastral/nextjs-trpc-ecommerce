import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";

function login() {
  // initialvalues
  const initialValues = {
    username: "",
    password: "",
    rememberme: false,
  };
  // validate form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required.")
      .max(150, "Email should not exceed 150 characters"),
    password: Yup.string()
      .required("Password is required.")
      .max(32, "Password should not exceed 32 characters"),
    rememberme: Yup.bool(),
  });

  const checkUserName = (action, event) => {
    action.setFieldValue("username", event.target.value);
  };

  return (
    <div className="py-[4em]">
      <div className="relative max-w-[768px] mx-auto bg-slate-100 p-8 rounded-[5px] lgmx:max-w-full lgmx:w-[90%] lgmx:py-4 lgmx:px-8">
        <div className="w-full p-5">
          <div className="max-w-md">
            <h4 className="text-3xl font-bold">Log In</h4>
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
                <label className="mb-2">Email</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full h-10 pl-2"
                  autoComplete="off"
                  onChange={(e) => checkUserName(formik, e)}
                />
              </div>
              <div className="validate-show">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="negative"
                />
              </div>
              <div className="flex flex-col items-start mb-4">
                <label className="mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full h-10 pl-2 ${
                    formik.errors.password && formik.touched.password
                      ? "error-border"
                      : ""
                  }`}
                  autoComplete="off"
                  formik={formik}
                />
              </div>
              <div className="validate-show">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="negative"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full my-4 bg-slate-500 text-white"
                >
                  Log In
                </button>
              </div>
              {/* <ErrorServer msg={errorServer} /> */}

              <div className="text-center p3-regular-14 mb-4 mt-7">
                <p>
                  Don&#39;t have an account?
                  <a href="/signup">
                    <span className="ml-1 info underline cursor-pointer">
                      Sign Up
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

export default login;
