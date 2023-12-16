import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between px-10 w-full h-20 bg-black text-white">
      <div className="w-1/2">
        <h1 className="text-4xl font-semibold">Users List</h1>
      </div>
      <div className="flex justify-end w-1/2">
        <button
          onClick={() => navigate("/add-user")}
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New User
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 ml-10 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
