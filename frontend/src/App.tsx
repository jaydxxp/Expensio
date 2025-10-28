import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Analytics } from '@vercel/analytics/react';
import Home from "./page/Home";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import AboutUs from "./page/About";
import Dashboard from "./page/Dashboard";
import AllExpense from "./page/AllExpense";
function App() {
  return (
    <div>
      <Analytics/>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/allexpense" element={<AllExpense/>}/>
    </Routes>
  </Router>
  </div>);
}

export default App;
