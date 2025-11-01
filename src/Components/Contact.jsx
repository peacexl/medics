// src/Pages/Contact.jsx
import React, { useState } from 'react';
import {
  Box, Heading, Text, Stack, FormControl, FormLabel,
  Input, Textarea, Button, SimpleGrid, Icon, VStack, HStack,
  useToast, useDisclosure
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from 'react-icons/fa';
import ConsultationModal from '../Components/ConsultationModal'; // ✅ import the global modal

const Contact = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ---- Message Form Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Save message to localStorage
      const storedMessages = JSON.parse(localStorage.getItem("medics_messages") || "[]");
      storedMessages.push({ ...formData, time: new Date().toLocaleString() });
      localStorage.setItem("medics_messages", JSON.stringify(storedMessages));

      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setFormData({ name: '', email: '', message: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 8, md: 16 }} maxW="900px" mx="auto">
      <Stack spacing={8} textAlign={{ base: 'center', md: 'left' }}>
        <Box>
          <Heading size="lg" color="#BFEDE6">Contact Us</Heading>
          <Text mt={2} color="rgba(255,255,255,0.8)">
            We're here to help — book consultations, request demos, or ask about our products and services.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* LEFT SIDE */}
          <Box>
            <VStack align="start" spacing={4}>
              <HStack align="start">
                <Icon as={FaMapMarkerAlt} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Location</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">
                    123 Wellbeing Ave, Health City
                  </Text>
                </Box>
              </HStack>

              <HStack align="start">
                <Icon as={FaPhoneAlt} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Call Us</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">
                    +1 (555) 123-4567
                  </Text>
                </Box>
              </HStack>

              <HStack align="start">
                <Icon as={FaRegClock} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Hours</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">
                    Mon - Fri: 8am - 6pm
                  </Text>
                </Box>
              </HStack>

              <Button colorScheme="teal" onClick={onOpen}>
                Book a Consultation
              </Button>
            </VStack>
          </Box>

          {/* RIGHT SIDE (MESSAGE FORM) */}
          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  bg="rgba(255,255,255,0.03)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  bg="rgba(255,255,255,0.03)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  bg="rgba(255,255,255,0.03)"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>

      {/* ✅ Reusable Consultation Modal (imported) */}
      <ConsultationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Contact;
