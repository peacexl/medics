import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";

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
import ConsultationModal from "./Components/ConsultationModal";

const MotionButton = motion(Button);

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1200); // bounce duration
    }, 8000); // every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg="linear-gradient(90deg, rgba(6,30,34,0.95) 0%, rgba(12,82,86,0.85) 45%, rgba(23,26,25,0.15) 10000%)"
      color="white" minH="100vh" overflowX="hidden" textAlign="center"
    >
      <Header />

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

      {/* Floating Consult Now Button with bounce */}
      <MotionButton
        position="fixed" bottom={{ base: "16px", md: "24px" }}
        right={{ base: "16px", md: "24px" }} colorScheme="teal"
        borderRadius="full" size={{ base: "md", md: "lg" }} leftIcon={<FaComments />}
        boxShadow="0 6px 25px rgba(0,0,0,0.4)" _hover={{ transform: "scale(1.05)" }} onClick={onOpen}
        zIndex="overlay" px={{ base: 4, md: 6 }} fontSize={{ base: "sm", md: "md" }}
        animate={animate ? { y: [-14, 0, -9, 0] } : {}} transition={{ duration: 1.2, ease: "easeInOut", repeat: 0,}}
      >
        Consult Now
      </MotionButton>


      {/* Global Consultation Modal */}
      <ConsultationModal isOpen={isOpen} onClose={onClose} />

      <Footer />
    </Box>
  );
};

export default App;
