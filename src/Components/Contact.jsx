import React from 'react';
import { Box, Heading, Text, Stack, FormControl, FormLabel, Input, Textarea, Button, SimpleGrid, Icon, VStack, HStack } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 8, md: 16 }} maxW="900px" mx="auto">
      <Stack spacing={8} textAlign={{ base: 'center', md: 'left' }}>
        <Box>
          <Heading size="lg" color="#BFEDE6">Contact Us</Heading>
          <Text mt={2} color="rgba(255,255,255,0.8)">We're here to help — book consultations, request demos, or ask about our products and services.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <VStack align="start" spacing={4}>
              <HStack align="start">
                <Icon as={FaMapMarkerAlt} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Location</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">123 Wellbeing Ave, Health City</Text>
                </Box>
              </HStack>

              <HStack align="start">
                <Icon as={FaPhoneAlt} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Call Us</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">+1 (555) 123-4567</Text>
                </Box>
              </HStack>

              <HStack align="start">
                <Icon as={FaRegClock} boxSize={5} color="teal.300" mt={1} />
                <Box>
                  <Text fontWeight={700}>Hours</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.7)">Mon - Fri: 8am - 6pm</Text>
                </Box>
              </HStack>

              <Button colorScheme="teal">Book a Consultation</Button>
            </VStack>
          </Box>

          <Box>
            <Box as="form">
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Your full name" bg="rgba(255,255,255,0.03)" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
                </FormControl>
                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="How can we help?" bg="rgba(255,255,255,0.03)" />
                </FormControl>
                <Button colorScheme="teal">Send Message</Button>
              </Stack>
            </Box>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Contact;
