import React, { useState } from 'react';
import { Box, Flex, Text, Link as ChakraLink, Input, Button, 
Stack, HStack, IconButton, InputGroup, InputRightElement, useToast, } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = (email || '').trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast({ title: 'Validation error', description: 'Please enter a valid email address.', status: 'error', duration: 4000 });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false);
      setEmail('');
      toast({ title: 'Subscribed', description: 'Thanks — you are now subscribed to our newsletter.', status: 'success', duration: 5000 });
    } catch {
      setLoading(false);
      toast({ title: 'Submission failed', description: 'Please try again later.', status: 'error', duration: 4000 });
    }
  };

  return (
    // fixed footer: always visible at bottom
    <Box as="footer" position="" bottom={50} left={0} right={0} zIndex={60} bgGradient="linear(to-b, rgba(6,30,34,0.85), rgba(6,30,34,0.95))" color="white" py={{ base: 6, md: 8 }}>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        {/* Use align items center on mobile so the icon row and link stacks are centered */}
        <Flex direction={{ base: 'column', md: 'row' }} justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'flex-start' }} gap={8}>
          <Box maxW={{ base: '100%', md: '360px' }} textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize="xl" fontWeight="700" color="#BFEDE6">Medora</Text>
            <Text mt={3} color="rgba(255,255,255,0.75)">Secure. Private. Professional. Delivering intelligent healthcare insights and consultations.</Text>
            <HStack mt={4} spacing={3} justify={{ base: 'center', md: 'flex-start' }}>
              <IconButton as="a" href="https://www.facebook.com" aria-label="Facebook" icon={<FaFacebook />} variant="ghost" color="white"
                transition="transform 160ms ease, box-shadow 160ms" _hover={{ transform: 'translateY(-4px) scale(1.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', bg: 'rgba(255,255,255,0.02)' }} />
              <IconButton as="a" href="https://www.twitter.com" aria-label="Twitter" icon={<FaTwitter />} variant="ghost" color="white"
                transition="transform 160ms ease, box-shadow 160ms" _hover={{ transform: 'translateY(-4px) scale(1.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', bg: 'rgba(255,255,255,0.02)' }} />
              <IconButton as="a" href="https://www.instagram.com" aria-label="Instagram" icon={<FaInstagram />} variant="ghost" color="white"
                transition="transform 160ms ease, box-shadow 160ms" _hover={{ transform: 'translateY(-4px) scale(1.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', bg: 'rgba(255,255,255,0.02)' }} />
              <IconButton as="a" href="https://www.linkedin.com" aria-label="LinkedIn" icon={<FaLinkedin />} variant="ghost" color="white"
                transition="transform 160ms ease, box-shadow 160ms" _hover={{ transform: 'translateY(-4px) scale(1.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', bg: 'rgba(255,255,255,0.02)' }} />
              <IconButton as="a" href="https://www.youtube.com" aria-label="YouTube" icon={<FaYoutube />} variant="ghost" color="white"
                transition="transform 160ms ease, box-shadow 160ms" _hover={{ transform: 'translateY(-4px) scale(1.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', bg: 'rgba(255,255,255,0.02)' }} />
            </HStack>
          </Box>

          {/* Make the quick links/resources centered on mobile */}
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 6, md: 12 }} align={{ base: 'center', sm: 'flex-start' }} textAlign={{ base: 'center', sm: 'left' }}>
            <Box>
              <Text fontWeight={700} mb={3}>Quick links</Text>
              <Stack spacing={2} align={{ base: 'center', sm: 'flex-start' }}>
                <ChakraLink as={Link} to="/services/consultation">Free Consultation</ChakraLink>
                <ChakraLink as={Link} to="/about">About</ChakraLink>
                <ChakraLink as={Link} to="/products">Products</ChakraLink>
                <ChakraLink as={Link} to="/contact">Contact</ChakraLink>
              </Stack>
            </Box>

            <Box>
              <Text fontWeight={700} mb={3}>Resources</Text>
              <Stack spacing={2} align={{ base: 'center', sm: 'flex-start' }}>
                <ChakraLink href="/blog">Blog</ChakraLink>
                <ChakraLink href="/careers">Careers</ChakraLink>
                <ChakraLink href="/account">Account</ChakraLink>
              </Stack>
            </Box>
          </Stack>

          <Box minW={{ base: '100%', md: '300px' }} textAlign={{ base: 'center', md: 'left' }}>
            <Text fontWeight={700} mb={3}>Stay updated</Text>
            <Flex as="form" gap={2} justify={{ base: 'center', md: 'flex-start' }} onSubmit={handleSubscribe}>
              <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" bg="rgba(255,255,255,0.04)" _placeholder={{ color: 'rgba(255,255,255,0.6)' }} aria-label="Email for newsletter" />
              <Button colorScheme="teal" type="submit" isLoading={loading}>Subscribe</Button>
            </Flex>
            <Text mt={3} fontSize="sm" color="rgba(255,255,255,0.6)">Subscribe to our newsletter for updates and offers.</Text>
          </Box>
        </Flex>

        <Box borderTop="1px solid rgba(255,255,255,0.04)" mt={6} pt={4} textAlign="center">
          <Text fontSize="sm" color="rgba(255,255,255,0.6)">© {new Date().getFullYear()} Medora. All rights reserved.</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer;
  {/* ---------- Footer ---------- */}
      <Box as="footer" mt={8} bg="transparent" px={{ base: 4, md: 12 }}>
        <Box maxW="1200px" mx="auto" borderTop="1px solid rgba(255,255,255,0.04)" pt={{ base: 6, md: 8 }} pb={{ base: 6, md: 10 }}>
          <Flex direction={{ base: 'column', md: 'row' }} align="flex-start" justify="space-between" gap={6}>
            <Box minW={{ md: '280px' }}>
              <Text fontSize="lg" fontWeight="700" color="#BFEDE6">Medora</Text>
              <Text fontSize="sm" color="rgba(255,255,255,0.7)" mt={2} maxW="320px">Secure. Private. Professional. Delivering intelligent healthcare insights and consultations.</Text>
            </Box>

            <HStack spacing={{ base: 6, md: 12 }} align="start">
              <Stack spacing={2}>
                <Text fontWeight={600}>Quick links</Text>
                <Link to="/services/consultation" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Free Consultation</Link>
                <Link to="/about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>About</Link>
                <Link to="/products" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Products</Link>
                <Link to="/contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Contact</Link>
              </Stack>

              <Stack spacing={2}>
                <Text fontWeight={600}>Resources</Text>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Blog</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Careers</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.8)' }}>Privacy</a>
              </Stack>
            </HStack>

            <Box minW={{ base: '100%', md: '320px' }}>
              <Text fontWeight={600} mb={2}>Stay updated</Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} align="center">
                <InputGroup maxW={{ base: '100%', sm: '220px' }}>
                  <Input placeholder="Your email" bg="rgba(255,255,255,0.03)" />
                  <InputRightElement>
                    <Button colorScheme="teal" size="sm">Subscribe</Button>
                  </InputRightElement>
                </InputGroup>

                <HStack spacing={2}>
                  <IconButton as="a" href="https://facebook.com" aria-label="Facebook" icon={<FaFacebook />} variant="ghost" color="white" />
                  <IconButton as="a" href="https://twitter.com" aria-label="Twitter" icon={<FaTwitter />} variant="ghost" color="white" />
                  <IconButton as="a" href="https://instagram.com" aria-label="Instagram" icon={<FaInstagram />} variant="ghost" color="white" />
                  <IconButton as="a" href="https://linkedin.com" aria-label="LinkedIn" icon={<FaLinkedin />} variant="ghost" color="white" />
                  <IconButton as="a" href="https://youtube.com" aria-label="YouTube" icon={<FaYoutube />} variant="ghost" color="white" />
                </HStack>
              </Stack>
            </Box>
          </Flex>

          <Box textAlign="center" mt={6}>
            <Text fontSize="sm" color="rgba(255,255,255,0.6)">© {new Date().getFullYear()} Medora. All rights reserved.</Text>
          </Box>
        </Box>
      </Box>