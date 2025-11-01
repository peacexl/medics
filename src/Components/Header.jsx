// src/Components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box, Flex, Text, Input, Button, IconButton, Grid, Menu, MenuButton,
  MenuList, MenuItem, Tooltip, VStack, HStack, Collapse, Spacer
} from "@chakra-ui/react";
import {
  FaSearch, FaUserCircle, FaBars, FaTimes, FaChevronDown,
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import docBg from "../assets/doc.png";

const MotionBox = motion(Box);

const Header = () => {
  const location = useLocation(), navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false), [svcOpen, setSvcOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" }, { label: "Services", to: "/services/consultation" },
    { label: "About", to: "/about" }, { label: "Products", to: "/products" },
    { label: "Blog", to: "/blog" }, { label: "Careers", to: "/careers" },
  ];

  return (
    <Flex as="header" align="center" justify="space-between" pos="fixed" top={0} left={0} right={0} zIndex={100}
      w="96%" mx="auto" mt="6px" px={{ base: "14px", md: "60px" }} py={{ base: "8px", md: "26px" }}
      borderRadius="9999px" bg="linear-gradient(90deg,rgba(6,30,34,0.9) 0%,rgba(12,82,86,0.8) 45%,rgba(48,180,175,0.1) 100%)"
      boxShadow="0 6px 24px rgba(240,244,245,0.12)" color="white" backdropFilter="blur(12px)" minH="56px">

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", zIndex: 110 }}>
        <Flex align="center" gap="8px">
          <Box bg="linear-gradient(135deg,#38B2AC,#319795)" w={{ base: "30px", md: "38px" }} h={{ base: "30px", md: "38px" }}
            borderRadius="full" display="flex" alignItems="center" justifyContent="center"
            boxShadow="0 2px 8px rgba(0,0,0,0.25)">
            <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }} color="white">+</Text>
          </Box>
        </Flex>
      </Link>

      {/* Title */}
      <Box flex="1" textAlign="center" pos="relative" zIndex={110}>
        <Text fontWeight="700" fontSize={{ base: "38px", md: "22px" }} color="#BFEDE6">Medora</Text>
      </Box>

      {/* Desktop Nav */}
      <Grid display={{ base: "none", md: "grid" }} templateColumns="auto 1fr auto" alignItems="center" justifyContent="center" w="100%" gap={4}>
        <Box />
        <Flex justify="center" align="center" gap="12px">
          {navItems.map((item) => item.label === "Services" ? (
            <Menu key="services">
              <Flex align="center" px="14px" py="8px" borderRadius="9999px"
                bg={location.pathname.startsWith(item.to) ? "rgba(255,255,255,0.12)" : "transparent"}
                transition="all 0.25s ease" fontWeight={500} fontSize="15px" cursor="pointer"
                _hover={{ bg: "linear-gradient(90deg,#38B2AC40,#2C9F9A20)", transform: "translateY(-2px)" }}>
                <Box as="span" onClick={() => navigate("/services/consultation")}>Services</Box>
                <MenuButton as={Box} ml="6px"><Box as={FaChevronDown} boxSize="10px" /></MenuButton>
              </Flex>
              <MenuList bg="black" border="1px solid rgba(255,255,255,0.1)" boxShadow="0 4px 16px rgba(0,0,0,0.5)"
                borderRadius="12px" zIndex={60}>
                {["consultation", "diagnostics", "surgery", "pharmacy"].map((svc) => (
                  <MenuItem key={svc} as={Link} to={`/services/${svc}`}
                    _hover={{ bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)", color: "white" }}>
                    {svc.charAt(0).toUpperCase() + svc.slice(1)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
              <Box px="14px" py="8px" borderRadius="9999px"
                bg={location.pathname.startsWith(item.to) ? "rgba(255,255,255,0.12)" : "transparent"}
                _hover={{ bg: "linear-gradient(90deg,#38B2AC40,#2C9F9A20)", transform: "translateY(-2px)" }}
                transition="all 0.25s ease" fontWeight={500} fontSize="15px">{item.label}</Box>
            </Link>
          ))}
        </Flex>

        {/* Right Section */}
        <Flex justify="flex-end" align="center" gap="12px">
          <Flex align="center" px="12px" py="6px" borderRadius="9999px" bg="rgba(255,255,255,0.04)" backdropFilter="blur(6px)">
            <Box as={FaSearch} color="rgba(255,255,255,0.7)" />
            <Input placeholder="Search" variant="unstyled" ml="8px" fontSize="14px" color="white"
              _placeholder={{ color: "rgba(255,255,255,0.45)" }} w="140px" />
          </Flex>
          <Tooltip label="My account" placement="bottom" hasArrow shouldWrapChildren>
            <Box as="button" onClick={() => navigate("/account")} pos="relative" w="36px" h="36px">
              {localStorage.getItem("userProfilePic") ? (
                <>
                  <Box as="img" src={localStorage.getItem("userProfilePic")} alt="Profile"
                    w="36px" h="36px" borderRadius="full" objectFit="cover"
                    border="2px solid rgba(255,255,255,0.28)" />
                  <Box pos="absolute" bottom="0" right="0" w="10px" h="10px"
                    bg="#4FFF6C" borderRadius="full" border="2px solid #0C3836" />
                </>
              ) : (<Box as={FaUserCircle} boxSize="28px" color="#88E6DA" />)}
            </Box>
          </Tooltip>
          <Link to="/contact"><Button bg="linear-gradient(90deg,#38B2AC,#2C9F9A)" color="white"
            borderRadius="9999px" px="18px" py="8px" _hover={{ opacity: 0.9 }}>Contact</Button></Link>
        </Flex>
      </Grid>

      {/* Mobile Drawer */}
      <IconButton aria-label="menu" icon={drawerOpen ? <FaTimes /> : <FaBars />} onClick={() => setDrawerOpen(s => !s)}
        display={{ base: "block", md: "none" }} variant="ghost" color="white"
        _hover={{ bg: "rgba(255,255,255,0.06)" }} zIndex={120} />

      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Click-outside overlay */}
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} pos="fixed" inset={0} bg="black" zIndex={89}
              onClick={() => setDrawerOpen(false)} />

            {/* Drawer */}
            <MotionBox initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: "easeInOut" }} pos="fixed" top={0} right={0}
              w={{ base: "78%", md: "42%" }} h="100vh" zIndex={90}
              bgImage={`url(${docBg})`} bgSize="cover" bgPos="center" bgRepeat="no-repeat"
              bgColor="rgba(8,18,20,0.6)" bgBlendMode="overlay" backdropFilter="blur(8px)"
              overflowY="auto" px="20px" pb="30px" borderRadius="0 0 0 20px">

              <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} h="100%">
                <VStack align="start" spacing={6} h="100%">
                  {/* Search */}
                  <Flex align="center" bg="rgba(255,255,255,0.06)" px="12px" py="8px"
                    borderRadius="full" w="100%" mt="80px">
                    <Box as={FaSearch} color="rgba(255,255,255,0.7)" />
                    <Input placeholder="Search" variant="unstyled" ml="8px" fontSize="14px" color="white"
                      _placeholder={{ color: "rgba(255,255,255,0.45)" }} />
                  </Flex>

                  {/* Nav */}
                  {navItems.map((item) => item.label === "Services" ? (
                    <Box key="svc" w="100%">
                      <Flex align="center" justify="space-between" w="100%" onClick={() => setSvcOpen(s => !s)}
                        cursor="pointer" px="6px" py="8px" borderRadius="8px">
                        <Text fontSize="18px" color={location.pathname.startsWith(item.to) ? "#38B2AC" : "white"} fontWeight={500}>Services</Text>
                        <Box as={FaChevronDown} transform={svcOpen ? "rotate(180deg)" : "rotate(0deg)"} />
                      </Flex>
                      <Collapse in={svcOpen} animateOpacity>
                        <VStack align="start" spacing={2} mt={2} pl={4}>
                          {["consultation", "diagnostics", "surgery", "pharmacy"].map((svc) => (
                            <Box key={svc} as="button" onClick={() => { setDrawerOpen(false); navigate(`/services/${svc}`); }}
                              fontSize="16px" color="white" px="6px" py="6px" borderRadius="6px"
                              _hover={{ bg: "linear-gradient(90deg,#38B2AC40,#2C9F9A20)" }}>{svc.charAt(0).toUpperCase() + svc.slice(1)}</Box>
                          ))}
                        </VStack>
                      </Collapse>
                    </Box>
                  ) : (
                    <Box key={item.label} as={Link} to={item.to} onClick={() => setDrawerOpen(false)}
                      fontSize="18px" fontWeight="500" color={location.pathname.startsWith(item.to) ? "#38B2AC" : "white"}
                      _hover={{ color: "#38B2AC" }}>{item.label}</Box>
                  ))}

                  <Spacer />

                  {/* Bottom section */}
                  <VStack spacing={6} w="100%" align="center" mt="auto">
                    <HStack spacing={3} onClick={() => { setDrawerOpen(false); navigate("/account"); }} cursor="pointer">
                      <Box pos="relative" w="40px" h="40px">
                        {localStorage.getItem("userProfilePic") ? (
                          <>
                            <Box as="img" src={localStorage.getItem("userProfilePic")} alt="Profile" w="40px" h="40px"
                              borderRadius="full" objectFit="cover" />
                            <Box pos="absolute" bottom="0" right="0" w="10px" h="10px"
                              bg="#4FFF6C" borderRadius="full" border="2px solid rgba(8,18,20,0.85)" />
                          </>
                        ) : (<Box as={FaUserCircle} boxSize="36px" color="#88E6DA" />)}
                      </Box>
                      <Box><Text fontSize="16px" fontWeight={600}>My Account</Text>
                        <Text fontSize="13px" color="rgba(255,255,255,0.7)">Manage profile & bookings</Text></Box>
                    </HStack>

                    <Link to="/contact" onClick={() => setDrawerOpen(false)}>
                      <Button bg="linear-gradient(90deg,#38B2AC,#2C9F9A)" color="white" borderRadius="full"
                        px="24px" py="8px" _hover={{ opacity: 0.9 }}>Contact Us</Button>
                    </Link>

                    <HStack spacing={6}>
                      <Box as={FaFacebook} cursor="pointer" _hover={{ color: "#38B2AC" }} />
                      <Box as={FaInstagram} cursor="pointer" _hover={{ color: "#38B2AC" }} />
                      <Box as={FaTwitter} cursor="pointer" _hover={{ color: "#38B2AC" }} />
                      <Box as={FaLinkedin} cursor="pointer" _hover={{ color: "#38B2AC" }} />
                    </HStack>
                    <Text fontSize="13px" color="rgba(255,255,255,0.5)">© 2025 Medora. All rights reserved.</Text>
                  </VStack>
                </VStack>
              </MotionBox>
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Header;
