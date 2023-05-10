import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCheckSquareFill } from "react-icons/bs";
import { useFormik } from "formik";
import { logInFormSchemas } from "./Yup";
import { MdOutlineError } from "react-icons/md";
import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

const LoginForm = () => {
  // states

  const [showPass, setShowPass] = useState(false);

  // use the formik for form validation

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        emailOrUserName: "",
        password: "",
        isRemember: true,
      },

      // validation scheamas

      validationSchema: logInFormSchemas,

      // onsubmit

      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="login-form text-sm">
      <form className="mt-5" onSubmit={handleSubmit}>
        <label className={`form-label`} htmlFor="loginEmail">
          Email address or username
        </label>
        <input
          placeholder="Email address or username"
          className={`${
            errors.emailOrUserName && touched.emailOrUserName
              ? "form-input-error"
              : ""
          } form-input-text`}
          type="text"
          name="emailOrUserName"
          id="loginEmail"
          onChange={handleChange}
          value={values.emailOrUserName}
          onBlur={handleBlur}
        />
        {errors.emailOrUserName && touched.emailOrUserName && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.emailOrUserName}
          </p>
        )}

        {/* password */}
        <label className="form-label" htmlFor="loginPassword">
          Password
        </label>
        <div className="relative">
          <input
            placeholder="Password"
            className={`${
              errors.password && touched.password ? "form-input-error" : ""
            } form-input-text`}
            type={showPass ? "text" : "password"}
            name="password"
            id="loginPassword"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          <RxEyeClosed
            className={`${
              showPass ? "hidden" : "block"
            } absolute top-[40%] right-3 translate-y-[-50%] text-xl cursor-pointer`}
            onClick={() => setShowPass(true)}
          />
          <FaRegEye
            className={`${
              showPass ? "block" : "hidden"
            } absolute top-[40%] right-3 translate-y-[-50%] text-xl cursor-pointer`}
            onClick={() => setShowPass(false)}
          />
        </div>

        {errors.password && touched.password && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.password}
          </p>
        )}
        <Link to={"forgot-password"} className="underline hover:text-[#117835]">
          Forgot your password?
        </Link>
        {/* login button */}
        <div className="flex flex-col gap-4 md:justify-between mt-3 md:flex-row">
          <div className="flex gap-2 items-center">
            <div className="relative w-4 h-4 border border-slate-700 rounded-sm">
              <input
                type="checkbox"
                name="isRemember"
                id="login-remember"
                className="w-full h-full appearance-none [&_+.checkIcon]:checked:block"
                checked={values.isRemember}
                value={values.isRemember}
                onChange={handleChange}
              />
              <BsCheckSquareFill className="checkIcon absolute top-0 left-0 right-0 bottom-0 w-full h-full text-[#1ed760] hidden" />
            </div>

            <label htmlFor="login-remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="btn-basic bg-[#1ED760] min-w-[130px] text-[#1e1e1e] transition-transform md:hover:scale-110"
            onSubmit={(e) => e.preventDefault()}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
