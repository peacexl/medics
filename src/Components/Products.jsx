import React from 'react';
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Button, Image, Icon, Stack } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import devicesImg from '../assets/devices.jpg';
import carePackagesImg from '../assets/carepackages.jpg';
import trainingImg from '../assets/training.jpg';

const FeatureCard = ({ title, text }) => (
  <HStack align="start" spacing={4} bg="rgba(255,255,255,0.02)" p={4} borderRadius="md">
    <Icon as={FaCheckCircle} boxSize={6} color="teal.300" mt={1} />
    <VStack align="start" spacing={0}>
      <Text fontWeight={700}>{title}</Text>
      <Text fontSize="sm" color="rgba(255,255,255,0.7)">{text}</Text>
    </VStack>
  </HStack>
);

const Products = () => {
  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 8, md: 16 }} maxW="1200px" mx="auto">
      <Stack spacing={8} textAlign={{ base: 'center', md: 'left' }}>
        <Box>
          <Heading size="lg" color="#BFEDE6">Our Products & Services</Heading>
          <Text mt={3} color="rgba(255,255,255,0.8)">Safe, reliable medical products and curated care services designed by top clinicians. Trusted by patients since 2008.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box p={6} bg="rgba(255,255,255,0.02)" borderRadius="md">
            <Image src={devicesImg} alt="Medical Devices" mb={4} borderRadius="md" width="100%" height={{ base: '160px', md: '180px' }} objectFit="cover" />
            <Heading size="md">Medical Devices</Heading>
            <Text mt={2} color="rgba(255,255,255,0.7)">High-quality instruments maintained to strict safety standards.</Text>
          </Box>

          <Box p={6} bg="rgba(255,255,255,0.02)" borderRadius="md">
            <Image src={carePackagesImg} alt="Care Packages" mb={4} borderRadius="md" width="100%" height={{ base: '160px', md: '180px' }} objectFit="cover" />
            <Heading size="md">Care Packages</Heading>
            <Text mt={2} color="rgba(255,255,255,0.7)">Comprehensive outpatient and in-home care bundles.</Text>
          </Box>

          <Box p={6} bg="rgba(255,255,255,0.02)" borderRadius="md">
            <Image src={trainingImg} alt="Training & Support" mb={4} borderRadius="md" width="100%" height={{ base: '160px', md: '180px' }} objectFit="cover" />
            <Heading size="md">Training & Support</Heading>
            <Text mt={2} color="rgba(255,255,255,0.7)">Clinical training and 24/7 support for all patients.</Text>
          </Box>
        </SimpleGrid>

        <Box>
          <Heading size="md">Why trust our products?</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
            <FeatureCard title="Safe & Reliable" text="All products meet international safety standards and are validated by clinical teams." />
            <FeatureCard title="Best Medical Hands" text="Our products are designed and recommended by experienced clinicians." />
            <FeatureCard title="High Technical Infrastructure" text="We invest in modern facilities and digital health infrastructure for secure care." />
            <FeatureCard title="Patient-centered Hospitality" text="Comfort-focused packaging and support that prioritize dignity and ease." />
          </SimpleGrid>
        </Box>

        <HStack spacing={4} justify={{ base: 'center', md: 'flex-start' }}>
          <Button colorScheme="teal" size="lg">Book Consultation</Button>
          <Button variant="outline" colorScheme="teal" size="lg">Watch Demo</Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Products;
