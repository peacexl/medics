import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Icon,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from "@chakra-ui/react";
import { FaSearch, FaUserCircle, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [svcOpen, setSvcOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services/consultation" },
    { label: "About", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
  ];

  return (
    <Flex
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      w="96%"
      mx="auto"
      mt="6px"
      px={{ base: "10px", md: "20px" }}
      py={{ base: "6px", md: "10px" }}
      pb={{ base: "12px", md: "0" }}
      borderRadius={{ base: "0", md: "9999px" }}
      background="linear-gradient(90deg, rgba(6,30,34,0.95) 0%, rgba(12,82,86,0.85) 45%, rgba(48,180,175,0.15) 100%)"
      boxShadow="0 6px 24px rgba(240,244,245,0.45)"
      color="white"
      backdropFilter="blur(12px)"
      flexWrap="wrap"
    >
      {/* --- LOGO (mobile only) --- */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Flex display={{ base: "flex", md: "none" }} align="center" gap={{ base: "6px", md: "10px" }}>
          <Box
            bg="linear-gradient(135deg,#38B2AC,#319795)"
            w={{ base: "28px", md: "36px" }}
            h={{ base: "28px", md: "36px" }}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 2px 8px rgba(0,0,0,0.3)"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "15px", md: "18px" }}
              color="white"
            >
              +
            </Text>
          </Box>
          <Text
            fontWeight="700"
            fontSize={{ base: "17px", md: "20px" }}
            color="#BFEDE6"
          >
            Medora
          </Text>
        </Flex>
      </Link>

      {/* --- MOBILE LAYOUT --- */}
      <Box display={{ base: "block", md: "none" }} flex="1">
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="6px"
          alignItems="center"
          justifyItems="center"
        >
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <GridItem key={item.label} w="100%">
                  <Menu isOpen={svcOpen} onClose={() => setSvcOpen(false)}>
                    <Flex
                      align="center"
                      justify="center"
                      px="8px"
                      py="6px"
                      borderRadius="8px"
                      bg={
                        location.pathname.startsWith(item.to)
                          ? "rgba(255,255,255,0.08)"
                          : "transparent"
                      }
                      fontSize="12px"
                    >
                      <Box
                        as="span"
                        onClick={() => navigate("/services/consultation")}
                        cursor="pointer"
                        flex="1"
                        textAlign="center"
                      >
                        Services
                      </Box>
                      <MenuButton
                        as={Box}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSvcOpen(!svcOpen);
                        }}
                        ml="6px"
                      >
                        <Icon as={FaChevronDown} boxSize="12px" />
                      </MenuButton>
                    </Flex>
                    <MenuList
                      bg="black"
                      border="1px solid rgba(255,255,255,0.1)"
                      color="grey"
                      borderRadius="8px"
                      zIndex={60}
                    >
                      <MenuItem
                        as={Link}
                        to="/services/consultation"
                        _hover={{
                          bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                          color: "white",
                        }}
                      >
                        Consultation
                      </MenuItem>
                      <MenuItem
                        as={Link}
                        to="/services/diagnostics"
                        _hover={{
                          bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                          color: "white",
                        }}
                      >
                        Diagnostics
                      </MenuItem>
                      <MenuItem
                        as={Link}
                        to="/services/surgery"
                        _hover={{
                          bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                          color: "white",
                        }}
                      >
                        Surgery
                      </MenuItem>
                      <MenuItem
                        as={Link}
                        to="/services/pharmacy"
                        _hover={{
                          bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                          color: "white",
                        }}
                      >
                        Pharmacy
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </GridItem>
              );
            }
            return (
              <GridItem key={item.label} w="100%">
                <Link to={item.to} style={{ textDecoration: "none" }}>
                  <Box
                    textAlign="center"
                    px="8px"
                    py="6px"
                    borderRadius="8px"
                    bg={
                      location.pathname.startsWith(item.to)
                        ? "rgba(255,255,255,0.08)"
                        : "transparent"
                    }
                    fontSize="12px"
                  >
                    {item.label}
                  </Box>
                </Link>
              </GridItem>
            );
          })}

          {/* Search */}
          <GridItem w="100%">
            <Flex
              align="center"
              justify="center"
              px="8px"
              py="6px"
              borderRadius="8px"
              background="rgba(255,255,255,0.04)"
            >
              <Icon
                as={FaSearch}
                color="rgba(255,255,255,0.7)"
                boxSize="13px"
              />
              <Input
                placeholder="Search"
                variant="unstyled"
                ml="6px"
                fontSize="12px"
                color="white"
                _placeholder={{ color: "rgba(255,255,255,0.45)" }}
                w="60px"
              />
            </Flex>
          </GridItem>

          {/* User */}
          <GridItem w="100%" textAlign="center">
            <Tooltip label="My account" placement="bottom" hasArrow shouldWrapChildren>
              <Link to="/account" style={{ textDecoration: 'none', display: 'inline-flex' }} aria-label="My account">
                <Icon as={FaUserCircle} boxSize="18px" color="#88E6DA" cursor="pointer" />
              </Link>
            </Tooltip>
          </GridItem>

          {/* Contact */}
          <GridItem w="100%">
            <Link to="/contact">
              <Button
                bg="linear-gradient(90deg,#38B2AC,#2C9F9A)"
                color="white"
                borderRadius="8px"
                px="8px"
                py="6px"
                fontSize="12px"
              >
                Contact
              </Button>
            </Link>
          </GridItem>
        </Grid>
      </Box>

      {/* --- DESKTOP LAYOUT FIXED --- */}
      <Grid
        display={{ base: "none", md: "grid" }}
        templateColumns="auto 1fr auto"
        alignItems="center"
        justifyContent="center"
        w="100%"
        gap={4}
        py="3"
      >
        {/* Desktop logo (only visible on md+) placed in left column so logo and nav are on one line */}
        <Box display={{ base: "none", md: "flex" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Flex align="center" gap={{ base: "6px", md: "10px" }}>
              <Box
                bg="linear-gradient(135deg,#38B2AC,#319795)"
                w={{ base: "28px", md: "36px" }}
                h={{ base: "28px", md: "36px" }}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 2px 8px rgba(0,0,0,0.3)"
              >
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "15px", md: "18px" }}
                  color="white"
                >
                  +
                </Text>
              </Box>
              <Text
                fontWeight="700"
                fontSize={{ base: "17px", md: "20px" }}
                color="#BFEDE6"
              >
                Medora
              </Text>
            </Flex>
          </Link>
        </Box>

        {/* Nav Links */}
        <Flex justify="center" align="center" gap="12px">
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <Menu
                  key={item.label}
                  isOpen={svcOpen}
                  onClose={() => setSvcOpen(false)}
                >
                  <Flex
                    align="center"
                    px="14px"
                    py="8px"
                    borderRadius="9999px"
                    bg={
                      location.pathname.startsWith(item.to) && !svcOpen
                        ? "rgba(255,255,255,0.12)"
                        : "transparent"
                    }
                    border={
                      location.pathname.startsWith(item.to) && !svcOpen
                        ? "1px solid rgba(255,255,255,0.14)"
                        : "1px solid transparent"
                    }
                    transition="all 150ms ease"
                    color="white"
                    fontWeight={500}
                    fontSize="15px"
                  >
                    <Box
                      as="span"
                      cursor="pointer"
                      _hover={{
                        transform: "translateY(-2px)",
                        bg: "rgba(255,255,255,0.08)",
                      }}
                      onClick={() => navigate("/services/consultation")}
                    >
                      Services
                    </Box>
                    <MenuButton
                      as={Box}
                      ml="6px"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSvcOpen(!svcOpen);
                      }}
                    >
                      <Icon as={FaChevronDown} boxSize="10px" />
                    </MenuButton>
                  </Flex>
                  <MenuList
                    bg="black"
                    border="1px solid rgba(255,255,255,0.1)"
                    color="grey"
                    boxShadow="0 4px 16px rgba(0,0,0,0.5)"
                    borderRadius="12px"
                    zIndex={60}
                  >
                    <MenuItem
                      as={Link}
                      to="/services/consultation"
                      _hover={{
                        bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                        color: "white",
                      }}
                    >
                      Consultation
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/services/diagnostics"
                      _hover={{
                        bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                        color: "white",
                      }}
                    >
                      Diagnostics
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/services/surgery"
                      _hover={{
                        bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                        color: "white",
                      }}
                    >
                      Surgery
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/services/pharmacy"
                      _hover={{
                        bg: "linear-gradient(90deg,#38B2AC,#2C9F9A)",
                        color: "white",
                      }}
                    >
                      Pharmacy
                    </MenuItem>
                  </MenuList>
                </Menu>
              );
            }
            return (
              <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
                <Box
                  px="14px"
                  py="8px"
                  borderRadius="9999px"
                  bg={
                    location.pathname.startsWith(item.to)
                      ? "rgba(255,255,255,0.12)"
                      : "transparent"
                  }
                  border={
                    location.pathname.startsWith(item.to)
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "1px solid transparent"
                  }
                  _hover={{
                    transform: "translateY(-2px)",
                    bg: "rgba(255,255,255,0.08)",
                  }}
                  transition="all 150ms ease"
                  fontWeight={500}
                  fontSize="15px"
                >
                  {item.label}
                </Box>
              </Link>
            );
          })}
        </Flex>

        {/* Right Icons */}
        <Flex justify="flex-end" align="center" gap="12px">
          <Flex
            align="center"
            px="12px"
            py="6px"
            borderRadius="9999px"
            background="rgba(255,255,255,0.04)"
            backdropFilter="blur(6px)"
          >
            <Icon as={FaSearch} color="rgba(255,255,255,0.7)" />
            <Input
              placeholder="Search"
              variant="unstyled"
              ml="8px"
              fontSize="14px"
              color="white"
              _placeholder={{ color: "rgba(255,255,255,0.45)" }}
              w="140px"
            />
          </Flex>
          <Tooltip label="My account" placement="bottom" hasArrow shouldWrapChildren>
            <Link to="/account" style={{ textDecoration: 'none', display: 'inline-flex' }} aria-label="My account">
              <Icon as={FaUserCircle} boxSize="22px" color="#88E6DA" cursor="pointer" />
            </Link>
          </Tooltip>
          <Link to="/contact">
            <Button
              bg="linear-gradient(90deg,#38B2AC,#2C9F9A)"
              color="white"
              borderRadius="9999px"
              px="18px"
              py="8px"
              _hover={{ opacity: 0.9 }}
            >
              Contact
            </Button>
          </Link>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Header;
