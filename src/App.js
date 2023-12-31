import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Registeration/Login";
import Register from "./Registeration/Register";
import Home from "./Home/Home";
import AddBlog from "./Blog/AddBlog";
import MyBlog from "./Blog/MyBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="myBlog" element={<MyBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
