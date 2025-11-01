import React, { useState } from "react";
import {
  Box, Flex, Text, Link as ChakraLink, Input, Button, Stack, HStack,
  IconButton, InputGroup, InputRightElement, useToast
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState(""), [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = (email || "").trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast({ title: "Validation error", description: "Please enter a valid email address.", status: "error", duration: 4000 });
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false); setEmail("");
      toast({ title: "Subscribed", description: "You’re now subscribed to our newsletter.", status: "success", duration: 5000 });
    } catch {
      setLoading(false);
      toast({ title: "Submission failed", description: "Please try again later.", status: "error", duration: 4000 });
    }
  };

  return (
    <Box as="footer" bgGradient="linear(to-b, rgba(6,30,34,0.85), rgba(6,30,34,0.95))" color="white" py={{ base: 6, md: 8 }}>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "center", md: "flex-start" }} gap={8}>
          
          {/* Brand + Socials */}
          <Box maxW={{ base: "100%", md: "360px" }} textAlign={{ base: "center", md: "left" }}>
            <Text fontSize="xl" fontWeight="700" color="#BFEDE6">Medora</Text>
            <Text mt={3} color="rgba(255,255,255,0.75)">Secure. Private. Professional. Delivering intelligent healthcare insights and consultations.</Text>
            <HStack mt={4} spacing={3} justify={{ base: "center", md: "flex-start" }}>
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, i) => (
                <IconButton key={i} as="a" href="#" aria-label="social" icon={<Icon />} variant="ghost" color="white"
                  transition="transform .16s ease, box-shadow .16s" _hover={{ transform: "translateY(-4px) scale(1.08)", boxShadow: "0 6px 18px rgba(0,0,0,0.35)", bg: "rgba(255,255,255,0.02)" }} />
              ))}
            </HStack>
          </Box>

          {/* Quick Links + Resources side-by-side on mobile */}
          <Flex direction="row" justify="" w={{ base: "100%", md: "auto" }} gap={{ base: 32, md: 12 }}>
            <Box textAlign={{ base: "center", md: "left" }} ml="1em">
              <Text fontWeight={700} mb={3}>Quick Links</Text>
              <Stack spacing={2}>
                <ChakraLink as={Link} to="/services/consultation">Free Consultation</ChakraLink>
                <ChakraLink as={Link} to="/about">About</ChakraLink>
                <ChakraLink as={Link} to="/products">Products</ChakraLink>
                <ChakraLink as={Link} to="/contact">Contact</ChakraLink>
              </Stack>
            </Box>

            <Box textAlign={{ base: "center", md: "left" }} >
              <Text fontWeight={700} mb={3}>Resources</Text>
              <Stack spacing={2}>
                <ChakraLink href="/blog">Blog</ChakraLink>
                <ChakraLink href="/careers">Careers</ChakraLink>
                <ChakraLink href="/account">Account</ChakraLink>
              </Stack>
            </Box>
          </Flex>

          {/* Newsletter */}
          <Box minW={{ base: "100%", md: "300px" }} textAlign={{ base: "center", md: "left" }}>
            <Text fontWeight={700} mb={3}>Stay Updated</Text>
            <Flex as="form" gap={2} justify={{ base: "center", md: "flex-start" }} onSubmit={handleSubscribe}>
              <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
                bg="rgba(255,255,255,0.04)" _placeholder={{ color: "rgba(255,255,255,0.6)" }} />
              <Button colorScheme="teal" type="submit" isLoading={loading}>Subscribe</Button>
            </Flex>
            <Text mt={3} fontSize="sm" color="rgba(255,255,255,0.6)">Subscribe for news and offers.</Text>
          </Box>
        </Flex>

        <Box borderTop="1px solid rgba(255,255,255,0.04)" mt={6} pt={4} textAlign="center">
          <Text fontSize="sm" color="rgba(255,255,255,0.6)">© {new Date().getFullYear()} Medora. All rights reserved.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
