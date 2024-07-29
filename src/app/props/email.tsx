import React from "react";

function email() {
  return (
    <div className=" flex bg-white justify-center items-center py-5 lg:px-20 lg:py-32">
      <div className="bg-base p-10 w-full mx-3 justify-center items-center lg:py-20 xl:py32 flex-col gap-5 flex rounded-3xl ">
        <p className="text-lg font-bold py-2 md:text-3xl lg:text-4xl">
          Deliciousness to your inbox
        </p>
        <p className="text-xs md:text-lg xl:px-64  text-center">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit.
        </p>
        <div className="flex relative justify-center items-center md:w-1/2 lg:w-2/5">
          <input
            type="text"
            placeholder="Email"
            className=" bg-white rounded-lg p-3 md:p-5 md:w-full "
          />
          <button className="bg-black rounded-xl text-white p-2 md:p-3 absolute right-1">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default email;
