import React from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Link } from "react-router-dom";
import { Logo } from "../../../Assets/Logo";
import Button from "../../Buttons/Button";
import SignUpForm from "../../Forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="signUp bg-white pb-20">
      <div className="w-full flex justify-center items-center">
        <Logo className={"h-16 w-24 my-4 sm:w-28 md:w-32"} />
      </div>

      <div className="m-auto container px-4 sm:w-3/5">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Sign up for free to start listening.
        </h2>

        {/* buttons */}

        <ul className="flex gap-3 flex-col max-w-[400px] mx-auto">
          <li>
            <Button
              className={`flex items-center justify-center gap-2 w-full bg-[#405A93] text-slate-200 hover:border-black transition-transform duration-300 focus:scale-95 hover:scale-105`}
            >
              <SiFacebook className="text-xl hidden sm:block" />
              <span className="text-sm">sign up with facebook</span>
            </Button>
          </li>
          <li>
            <Button
              className={`flex items-center justify-center gap-2 w-full bg-[#191919] text-slate-200 hover:border-black transition-transform duration-300 focus:scale-95 hover:scale-105`}
            >
              <FaApple className="text-xl hidden sm:block" />
              <span className="text-sm">sign up with apple</span>
            </Button>
          </li>
          <li>
            <Button
              className={`flex items-center justify-center gap-2 w-full bg-white hover:border-black transition-transform duration-300 focus:scale-95 hover:scale-105 text-gray-700`}
            >
              <FcGoogle className="text-xl hidden sm:block" />
              <span className="text-sm">sign up with google</span>
            </Button>
          </li>
        </ul>

        {/* or */}

        <div className="flex gap-4 items-center mt-5 max-w-[400px] mx-auto">
          <hr className="basis-1/2" />
          <span className="font-semibold uppercase text-base">OR</span>
          <hr className="basis-1/2" />
        </div>

        {/* signup form */}
        <SignUpForm />
      </div>

      <p className="text-center text-sm mt-7">
        Have an account?{" "}
        <Link to={"/login"} className="text-primary">
          Log in.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
