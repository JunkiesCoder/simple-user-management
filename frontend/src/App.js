import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Protect from "./protectorRouter/protector";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<Protect />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/add-user" element={<AddUser />} />
            <Route exact path="/edit-user" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
