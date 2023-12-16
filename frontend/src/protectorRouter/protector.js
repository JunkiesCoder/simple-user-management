import { useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../instance/axios";

function Protect() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.post("/verify-token").then((res) => {
        if (res.data.token) {
          setAuth(true);
        } else {
          setAuth(false);
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (auth === null) return;

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default Protect;
