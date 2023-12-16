import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import axios from "../instance/axios";
import Header from "../components/Header";
import Card from "../components/Card";

export default function Home() {
  const { user } = useContext(userContext);
  const userId = user;
  const [userData, setUserData] = useState([]);

  const fetchData = () => {
    try {
      axios.get("/users/" + userId).then((res) => {
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <Card data={userData} onButtonClick={handleButtonClick} />
    </div>
  );
}
