import React from "react";
import Nav from "../../../components/Nav2";

function page() {
  return (
    <div className="h-screen">
      <Nav></Nav>
      <div className="h-screen bg-red-300 "></div>
      <div className="h-screen bg-blue-300 "></div>
    </div>
  );
}

export default page;
