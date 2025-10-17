import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Components/Header";
import Body from "./Components/Body";

const App = () => {
  return (
    <Box 
      bg="linear-gradient(90deg, rgba(6,30,34,0.95) 0%, rgba(12,82,86,0.85) 45%, rgba(23, 26, 25, 0.15) 10000%)"
      color="white" minH="100vh" overflowX="hidden" textAlign="center" >
        
      <Header />
      <Box pt="80px"> 
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/services/consultation" element={<h1>Consultation</h1>} />
          <Route path="/services/diagnostics" element={<h1>Diagnostics</h1>} />
          <Route path="/services/surgery" element={<h1>Surgery</h1>} />
          <Route path="/services/pharmacy" element={<h1>Pharmacy</h1>} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/blog" element={<h1>Blog</h1>} />
          <Route path="/careers" element={<h1>Careers</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
