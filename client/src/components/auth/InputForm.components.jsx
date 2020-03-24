import React from "react";
const InputForm = ({ type, name, id, placeholder, value, icon }) => {
  return (
    <div className="mt-2 lg:mt-4">
      <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 ">
        <i className={`fas fa-${icon} text-gray-400`}></i>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          className="bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
        />
      </div>
    </div>
  );
};

export default InputForm;
