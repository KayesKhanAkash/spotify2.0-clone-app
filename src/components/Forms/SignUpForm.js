import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ImRadioChecked2 } from "react-icons/im";
import { useFormik } from "formik";
import { signUpFormSchemas } from "./Yup";
import { MdOutlineError } from "react-icons/md";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SignUpForm = () => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        confirmEmail: "",
        password: "",
        confirmPass: "",
        profileName: "",
        dateOfBirth: {
          day: "",
          month: "",
          year: "",
        },
        gender: "",
        conditions: "",
      },

      // form validation schemas

      validationSchema: signUpFormSchemas,

      onSubmit: (values, action) => {
        action.resetForm();
        console.log(action);
        console.log(values);
      },
    });

  console.log();

  return (
    <div className="sign-up-form text-sm">
      <form action="" onSubmit={handleSubmit}>
        {/* for email */}
        <label htmlFor="signUpEmail" className="form-label">
          What's your email?
        </label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          id="signUpEmail"
          placeholder="Enter your email."
          className={`${
            errors.email && touched.email ? "form-input-error" : ""
          } form-input-text`}
        />
        {errors.email && touched.email && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.email}
          </p>
        )}
        {/* confirm email */}
        <label htmlFor="signUpConfirmEmail" className="form-label">
          Confirm your email
        </label>
        <input
          value={values.confirmEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="confirmEmail"
          id="signUpConfirmEmail"
          className={`${
            errors.confirmEmail && touched.confirmEmail
              ? "form-input-error"
              : ""
          } form-input-text`}
          placeholder="Enter your email again."
        />
        {errors.confirmEmail && touched.confirmEmail && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.confirmEmail}
          </p>
        )}
        {/* for password */}
        <label htmlFor="signUpPass" className="form-label">
          Create a password
        </label>
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="password"
          id="signUpPass"
          placeholder="Create a password."
          className={`${
            errors.password && touched.password ? "form-input-error" : ""
          } form-input-text`}
        />
        {errors.password && touched.password && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.password}
          </p>
        )}
        {/*confirm password */}
        <label htmlFor="signUpConfirmPass" className="form-label">
          Confirm password
        </label>
        <input
          value={values.confirmPass}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="confirmPass"
          id="signUpConfirmPass"
          placeholder="Write password again."
          className={`${
            errors.confirmPass && touched.confirmPass ? "form-input-error" : ""
          } form-input-text`}
        />
        {errors.confirmPass && touched.confirmPass && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.confirmPass}
          </p>
        )}
        {/*profile name */}
        <label htmlFor="signUpProfile" className="form-label">
          What should we call you?
        </label>
        <input
          value={values.profileName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="profileName"
          id="signUpProfile"
          placeholder="Enter a profile name."
          className={`${
            errors.profileName && touched.profileName ? "form-input-error" : ""
          } form-input-text`}
        />
        {errors.profileName && touched.profileName && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.profileName}
          </p>
        )}
        <p className="text-sm">This appears on your profile.</p>
        {/* date of birth */}
        <label className="form-label">What's your date of birth?</label>
        <div className="flex gap-4">
          <div className="basis-3/12">
            <label
              htmlFor="signUpDay"
              className="font-normal text-sm mb-2 block"
            >
              Day
            </label>
            <input
              value={values.dateOfBirth.day}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="dateOfBirth.day"
              id="signUpDay"
              className={`${
                errors?.dateOfBirth &&
                errors?.dateOfBirth?.day &&
                touched?.dateOfBirth?.day
                  ? "form-input-error"
                  : ""
              } form-input-text`}
              maxLength={2}
            />
          </div>

          {/* month */}

          <div className="basis-5/12">
            <label
              htmlFor="signUpMonth"
              className="font-normal text-sm mb-2 block"
            >
              Month
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateOfBirth.month}
              name="dateOfBirth.month"
              id="signUpMonth"
              className={`${
                errors.dateOfBirth &&
                errors?.dateOfBirth?.month &&
                touched?.dateOfBirth?.month
                  ? "form-input-error"
                  : ""
              } w-full mb-3 px-4 py-[15px] rounded border border-slate-400`}
            >
              <option value="">Select a Month</option>
              {months.map((month, i) => (
                <option value={month} key={i}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* year */}

          <div className="basis-3/12">
            <label
              htmlFor="signUpYear"
              className="font-normal text-sm mb-2 block"
            >
              Year
            </label>
            <input
              value={values.dateOfBirth.year}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="dateOfBirth.year"
              id="signUpYear"
              className={`${
                errors.dateOfBirth &&
                touched?.dateOfBirth?.year &&
                errors?.dateOfBirth?.year
                  ? "form-input-error"
                  : ""
              } form-input-text`}
              maxLength={4}
            />
          </div>
        </div>
        {errors.dateOfBirth &&
          errors?.dateOfBirth?.day &&
          touched?.dateOfBirth?.day && (
            <p className="form-text-error">
              <MdOutlineError className="text-lg" />
              {errors?.dateOfBirth?.day}
            </p>
          )}
        {errors.dateOfBirth &&
          errors?.dateOfBirth?.month &&
          touched?.dateOfBirth?.month && (
            <p className="form-text-error">
              <MdOutlineError className="text-lg" />
              {errors?.dateOfBirth?.month}
            </p>
          )}
        {errors.dateOfBirth &&
          errors?.dateOfBirth?.year &&
          touched?.dateOfBirth?.year && (
            <p className="form-text-error">
              <MdOutlineError className="text-lg" />
              {errors?.dateOfBirth?.year}
            </p>
          )}
        {/* gender */}
        <label className="form-label">What's your gender?</label>
        <div className="flex gap-4 mb-3">
          <label
            htmlFor="men"
            className="cursor-pointer flex gap-3 items-center"
          >
            <div className="relative w-4 h-4 border border-slate-800 rounded-full">
              <input
                value={"men"}
                onChange={handleChange}
                onBlur={handleBlur}
                type="radio"
                name="gender"
                id="men"
                className="appearance-none [&_+svg]:checked:block"
              />
              <ImRadioChecked2 className="absolute text-primary top-0 left-0 w-full h-full hidden" />
            </div>
            <p>Men</p>
          </label>

          <label
            htmlFor="women"
            className="cursor-pointer flex gap-3 items-center"
          >
            <div className="relative w-4 h-4 border border-slate-800 rounded-full">
              <input
                value={"women"}
                onChange={handleChange}
                onBlur={handleBlur}
                type="radio"
                name="gender"
                id="women"
                className="appearance-none [&_+svg]:checked:block"
              />
              <ImRadioChecked2 className="absolute text-primary top-0 left-0 w-full h-full hidden" />
            </div>
            <p>Women</p>
          </label>

          <label
            htmlFor="other"
            className="cursor-pointer flex gap-3 items-center"
          >
            <div className="relative w-4 h-4 border border-slate-800 rounded-full">
              <input
                value={"other"}
                onChange={handleChange}
                onBlur={handleBlur}
                type="radio"
                name="gender"
                id="other"
                className="appearance-none [&_+svg]:checked:block"
              />
              <ImRadioChecked2 className="absolute text-primary top-0 left-0 w-full h-full hidden" />
            </div>
            <p>Prefer not to say</p>
          </label>
        </div>

        {errors.gender && touched.gender && (
          <p className="form-text-error">
            <MdOutlineError className="text-lg" />
            {errors.gender}
          </p>
        )}

        {/* conditions */}
        <div className="flex gap-5 flex-col mt-8">
          <label
            htmlFor="condition1"
            className="flex gap-2 cursor-pointer font-[500]"
          >
            <div className="relative cursor-pointer min-w-[16px] h-4 border border-slate-700 rounded-sm">
              <input
                value={
                  "I would prefer not to receive marketing messages from Spotify"
                }
                onChange={handleChange}
                onBlur={handleBlur}
                type="checkbox"
                name="conditions"
                id="condition1"
                className="w-full h-full appearance-none [&_+.checkIcon]:checked:block"
              />
              <BsCheckSquareFill className="checkIcon absolute top-0 left-0 right-0 bottom-0 w-full h-full text-[#1ed760] hidden" />
            </div>
            <p>I would prefer not to receive marketing messages from Spotify</p>
          </label>

          {/* ragistration */}

          <label
            htmlFor="condition2"
            className="flex gap-2 cursor-pointer font-[500]"
          >
            <div className="relative cursor-pointer min-w-[16px] h-4 border border-slate-700 rounded-sm">
              <input
                value={`Share my registration data with Spotify's content providers for
                  marketing purposes.`}
                onChange={handleChange}
                onBlur={handleBlur}
                type="checkbox"
                name="conditions"
                id="condition2"
                className="w-full h-full appearance-none [&_+.checkIcon]:checked:block"
              />
              <BsCheckSquareFill className="checkIcon absolute top-0 left-0 right-0 bottom-0 w-full h-full text-[#1ed760] hidden" />
            </div>
            <p>
              Share my registration data with Spotify's content providers for
              marketing purposes.
            </p>
          </label>
        </div>
        {/*terms and conditions */}

        <div className="text-xs mt-8 [&_p]:mt-3 text-center ">
          <p>
            By clicking on sign-up, you agree to Spotify's{" "}
            <Link
              to={"terms-and-conditions"}
              className="underline text-primary_25"
            >
              Terms and Conditions of Use.
            </Link>
          </p>
          <p>
            To learn more about how Spotify collects, uses, shares and protects
            your personal data, please see{" "}
            <Link to={"privacy-policy"} className="underline text-primary_25">
              Spotify's Privacy Policy.
            </Link>
          </p>
        </div>

        {/* submit button */}
        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="btn-basic min-w-[200px] bg-primary hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
