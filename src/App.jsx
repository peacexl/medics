import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Consultation from "./Components/Consultation";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Products from "./Components/Products";
import Blog from "./Components/Blog";
import Careers from "./Components/Careers";
import Contact from "./Components/Contact";
import Account from "./Components/Account";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

const App = () => {
  return (
    <Box 
      bg="linear-gradient(90deg, rgba(6,30,34,0.95) 0%, rgba(12,82,86,0.85) 45%, rgba(23, 26, 25, 0.15) 10000%)"
      color="white" minH="100vh" overflowX="hidden" textAlign="center" >
        
      <Header />
      {/* <Footer /> */}
      <Box pt="80px"> 
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/services/consultation" element={<Consultation />} />
          <Route path="/services/diagnostics" element={<h1>Diagnostics</h1>} />
          <Route path="/services/surgery" element={<h1>Surgery</h1>} />
          <Route path="/services/pharmacy" element={<h1>Pharmacy</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
