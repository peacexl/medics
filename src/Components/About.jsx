import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Image, Stat, StatLabel, StatNumber, Badge, Divider, Stack } from '@chakra-ui/react';
import { FaHandsHelping, FaShieldAlt, FaUserMd, FaChartLine, FaLaptopMedical } from 'react-icons/fa';
import docImg from '../assets/doc.png';

const About = () => {
	return (
		<Box as="main" py={{ base: 8, md: 16 }} bgGradient="linear(to-b, #00171f, #03202a)">
			<Container maxW="6xl" color="white">
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
					<VStack align={{ base: 'center', md: 'start' }} spacing={4}>
						<Badge colorScheme="teal" px={3} py={1} borderRadius="full">Our Story</Badge>
						<Heading as="h1" size="xl">Compassionate care, professional excellence</Heading>
						<Text fontSize="lg" color="rgba(255,255,255,0.85)">
							Medora is built on a promise: to deliver safe, reliable and human-centred healthcare. Since 2008 our founder has driven a people-first approach that combines warm hospitality with the highest clinical standards.
						</Text>
						{/* Desktop: all badges in a row; Mobile: first two on one line, third on the next line */}
						<HStack spacing={4} pt={2} display={{ base: 'none', md: 'flex' }}>
							<Badge variant="subtle" colorScheme="cyan">Safe & reliable</Badge>
							<Badge variant="subtle" colorScheme="green">Best medical hands</Badge>
							<Badge variant="subtle" colorScheme="purple">High technical standards</Badge>
						</HStack>

						<Stack spacing={2} pt={2} display={{ base: 'flex', md: 'none' }} align="center">
							<HStack spacing={4} justify="center">
								<Badge variant="subtle" colorScheme="cyan">Safe & reliable</Badge>
								<Badge variant="subtle" colorScheme="green">Best medical hands</Badge>
							</HStack>
							<HStack justify="center">
								<Badge variant="subtle" colorScheme="purple">High technical standards</Badge>
							</HStack>
						</Stack>
					</VStack>

					<Box display="flex" justifyContent={{ base: 'center', md: 'flex-end' }}>
						<Image src={docImg} alt="medical" borderRadius="lg" boxShadow="lg" maxW={{ base: '320px', md: '420px' }} />
					</Box>
				</SimpleGrid>

				<Stack spacing={12} mt={12}>
					<SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
						<Stat bg="rgba(255,255,255,0.03)" p={6} borderRadius="md">
							<StatLabel>Founder</StatLabel>
							<StatNumber>PEACE EXCELLENT — 2008</StatNumber>
							<Text mt={2} fontSize="sm" color="rgba(255,255,255,0.7)">Founded from a love for humanity and the belief that quality healthcare should be warm, accessible and dignified.</Text>
						</Stat>

						<Stat bg="rgba(255,255,255,0.03)" p={6} borderRadius="md">
							<StatLabel>Care & Hospitality</StatLabel>
							<StatNumber>People-first approach</StatNumber>
							<Text mt={2} fontSize="sm" color="rgba(255,255,255,0.7)">Our teams are trained to combine clinical excellence with compassionate hospitality — small gestures that make treatment easier for patients and families.</Text>
						</Stat>

						<Stat bg="rgba(255,255,255,0.03)" p={6} borderRadius="md">
							<StatLabel>Safety & Reliability</StatLabel>
							<StatNumber>Evidence-driven</StatNumber>
							<Text mt={2} fontSize="sm" color="rgba(255,255,255,0.7)">We follow strict clinical protocols, continuous training and transparent reporting so patients always receive dependable care.</Text>
						</Stat>
					</SimpleGrid>

					<Divider borderColor="rgba(255,255,255,0.06)" />

					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="start">
						<VStack align="start" spacing={4}>
							<Heading size="md">Our Vision</Heading>
							<Text color="rgba(255,255,255,0.8)">To be a trusted healthcare partner where cutting-edge medicine meets genuine human care — empowering healthier lives across our community.</Text>

							<Heading size="md" pt={4}>Our Mission</Heading>
							<Text color="rgba(255,255,255,0.8)">Deliver accessible, high-quality clinical services supported by leading technologies and empathetic staff — always prioritizing patient safety and dignity.</Text>
						</VStack>

						<VStack align="start" spacing={4}>
							<Heading size="md">Core Values</Heading>
							<VStack align="start" spacing={2} color="rgba(255,255,255,0.8)">
								<HStack><FaHandsHelping /><Text>Compassion</Text></HStack>
								<HStack><FaShieldAlt /><Text>Safety & Integrity</Text></HStack>
								<HStack><FaUserMd /><Text>Clinical Excellence</Text></HStack>
								<HStack><FaChartLine /><Text>Continuous Improvement</Text></HStack>
								<HStack><FaLaptopMedical /><Text>High Technical Infrastructure</Text></HStack>
							</VStack>

							<Text fontSize="sm" color="rgba(255,255,255,0.65)">We invest in modern equipment, digital records and secure systems to give clinicians the tools they need to deliver better outcomes.</Text>
						</VStack>
					</SimpleGrid>
				</Stack>
			</Container>
		</Box>
	);
};

export default About;
