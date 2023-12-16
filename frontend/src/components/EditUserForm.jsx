import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../context/userContext";
import axios from "../instance/axios";

export default function EditUserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.data;
  const { user } = useContext(userContext);
  const id = user;
  const [formData, setFormData] = useState({
    id: userData._id,
    name: userData.name,
    email: userData.email,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    // Name validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name is alphapets";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        axios.patch("/update/" + id, { formData }).then((res) => {
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-evenly w-1/3 h-2/4 rounded shadow-lg bg-slate-200"
      >
        <div>
          <h1 className="text-black text-4xl">EDIT USER</h1>
        </div>
        <div className="flex flex-col items-start">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full text-gray-700 focus:outline-none py-2 px-4 rounded"
            placeholder="Enter your name"
          />
          <p className="text-red-500 mt-2">{errors.name}</p>
        </div>
        <div className="flex flex-col items-start">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-gray-700 focus:outline-none py-2 px-4 rounded"
            placeholder="Enter your email"
          />
          <p className="text-red-500 mt-2">{errors.email}</p>
        </div>
        <button className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
