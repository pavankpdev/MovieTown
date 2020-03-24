import React from "react";

import InputForm from "./InputForm.components";

const AuthTemplate = ({ title, subtitle1, subtitle2, btnText, finalText,reset, inputs }) => {
  return (
    <div className="bg-logoColor pb-32 lg:flex lg:justify-between lg:items-center lg:pb-20">
      <div className="text-white pt-16 text-center lg:text-left lg:pt-48">
        <h2 className="text-3xl font-semibold tracking-wider lg:text-5xl lg:ml-32">
          {title}
        </h2>
        <span className="uppercase text-3xl font-bold  tracking-wider lg:text-5xl lg:ml-32">
          movie town
        </span>
        <h5 className="mt-2 text-xs font-light tracking-widest text-center sm:px-2 md:px-0 lg:text-lg lg:pl-32 lg:text-left">
          {subtitle1}
          <br />
          {subtitle2}
          {/* Sign in to know more about new released
      <br /> movies and discounts available. */}
        </h5>
      </div>
      <div className="mx-8 mt-10 md:mx-48 lg:mx-24 lg:w-1/3 lg:mt-48">
        <div className="bg-white rounded-lg shadow-xl lg:rounded-extendedcorner lg:shadow-2xl">
          <div>
            <div className="pt-6">
              <center>
                <span className="uppercase text-logoColor text-2xl font-bold tracking-wider mt-2 lg:text-3xl">
                  movie town
                </span>
              </center>
            </div>
            <div className="mt-4 pb-6 sm:text-center md:text-center lg:pb-16">
              <form action="" className="mx-auto sm:text-center md:text-left">
                
                {
                  inputs.map(data => {
                    return <InputForm
                    type={data.type}
                    name={data.name}
                    id={data.id}
                    placeholder={data.placeholder}
                    icon={data.icon}
                  />
                  })
                }

                <div className="my-3 mx-8 flex justify-between items-center">
                  <button
                    type="button"
                    className="bg-logoColor text-white px-6 py-1 rounded shadow-lg uppercase text-xs tracking-wider lg:py-2"
                  >
                    {btnText}
                  </button>
                  <span className="text-sm text-headingColor lg:text-base">
                    {reset ? "Reset Password ?" : null}
                  </span>
                </div>
              </form>
              <span className="text-xs font-semibold text-textColor tracking-wide pt-2 lg:text-base">
                {finalText === "signin" ? "New user?" : " already a member?"}
                <span className="text-logoColor">
                  {finalText === "signin" ? "sign up" : "sign in"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
