import React from "react";
import { Logo } from "../../../Assets/Logo";
// import Button from "../../Buttons/Button";
// import { FaApple } from "react-icons/fa";
// import { SiFacebook } from "react-icons/si";
// import { FcGoogle } from "react-icons/fc";
// import LoginForm from "../../Forms/LoginForm";
// import { Link } from "react-router-dom";
import { loginUrl } from "../../../spotify/spotify";

const Login = () => {
  const afterStyle = `after:absolute after:content-[''] after:w-full after:h-full after:bg-primary after:top-0 after:left-0 after:-z-10 after:transition-transform after:duration-500 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left`;

  return (
    // <div className="login pb-10 bg-white">
    //   {/* login header */}

    //   <div className="w-full border-b flex justify-center items-center">
    //     <Logo className={"h-16 w-24 sm:w-28 md:w-32"} />
    //   </div>
    //   <div className="m-auto mt-6 container px-4 sm:w-3/5">
    //     <p className="text-sm font-semibold text-center mb-2">
    //       To continue, log in to Spotify.
    //     </p>

    //     {/* buttons */}

    //     <ul className="flex gap-3 flex-col">
    //       <li>
    //         <Button
    //           className={`flex items-center justify-center gap-2 w-full bg-[#405A93] text-slate-200 hover:border-black transition-transform duration-300 focus:scale-95`}
    //         >
    //           <SiFacebook className="text-xl hidden sm:block" />
    //           <span className="text-sm">continue with facebook</span>
    //         </Button>
    //       </li>
    //       <li>
    //         <Button
    //           className={`flex items-center justify-center gap-2 w-full bg-[#191919] text-slate-200 hover:border-black transition-transform duration-300 focus:scale-95`}
    //         >
    //           <FaApple className="text-xl hidden sm:block" />
    //           <span className="text-sm">continue with apple</span>
    //         </Button>
    //       </li>
    //       <li>
    //         <Button
    //           className={`flex items-center justify-center gap-2 w-full bg-white hover:border-black transition-transform duration-300 focus:scale-95 text-gray-700`}
    //         >
    //           <FcGoogle className="text-xl hidden sm:block" />
    //           <span className="text-sm">continue with google</span>
    //         </Button>
    //       </li>
    //       <li>
    //         <a
    //           href={loginUrl}
    //           className="btn-basic flex items-center justify-center gap-2 w-full bg-white hover:border-black transition-transform duration-300 focus:scale-95 text-gray-700"
    //         >
    //           Login With spotify
    //         </a>
    //       </li>
    //     </ul>

    //     {/* or */}

    //     <div className="flex gap-4 items-center mt-5">
    //       <hr className="basis-1/2" />
    //       <span className="font-semibold uppercase text-base">OR</span>
    //       <hr className="basis-1/2" />
    //     </div>

    //     {/* form */}

    //     <LoginForm />

    //     <hr />

    //     <div className="flex flex-col gap-4 items-center mt-5">
    //       <p className="w-fit">Don't have an account?</p>
    //       <Link
    //         className="btn-basic w-full text-slate-700 focus:scale-95 transition-transform"
    //         to={"/signUp"}
    //       >
    //         Sign up for spotify
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className="login">
      <div className="logo flex justify-center fixed top-0 left-0 w-full">
        {<Logo className={"max-w-[150px] fill-white py-6 w-full"} />}
      </div>
      <div className="flex justify-center items-center h-screen">
        <a
          href={loginUrl}
          className={`${afterStyle} px-4 py-2 rounded-lg relative font-semibold text-primary z-10 border border-primary overflow-hidden hover:text-black hover:scale-105 transition-all duration-500`}
        >
          Login with spotify
        </a>
      </div>
    </div>
  );
};

export default Login;
