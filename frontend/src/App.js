import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Components/Registration";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Home from "./Components/Home";
import "./App.css"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;