import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Icon,
  useToast,
  SimpleGrid,
  Badge
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Consultation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) return 'Please enter a valid email';
    if (!form.phone.trim()) return 'Please enter a phone number';
    if (!form.date) return 'Please choose a date';
    if (!form.time) return 'Please choose a time';
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      toast({ title: 'Validation error', description: err, status: 'error', duration: 4000 });
      return;
    }
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 900));
      setSubmitting(false);
      onClose();
      setForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
      toast({ title: 'Booking received', description: 'We will contact you to confirm the appointment.', status: 'success', duration: 5000 });
    } catch {
      setSubmitting(false);
      toast({ title: 'Submission failed', description: 'Please try again later.', status: 'error', duration: 4000 });
    }
  };

  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 8, md: 16 }} maxW="1200px" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={8} mb={8}>
        <Box flex="1">
          <Heading as="h1" size="lg" mb={4} color="teal.100">Premium Consultation Services</Heading>
          <Text fontSize="lg" color="rgba(255,255,255,0.85)" mb={6}>Book a specialised consultation with our experienced medical team. Choose a convenient time and we'll handle the rest — secure, private, and professional.</Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button leftIcon={<FaCalendarAlt />} colorScheme="teal" onClick={onOpen}>Book Appointment</Button>
            <Button variant="outline" colorScheme="teal">Learn More</Button>
          </Stack>
        </Box>

        <Box flex="1" bg="rgba(255,255,255,0.03)" p={6} borderRadius="12px" boxShadow="0 8px 30px rgba(0,0,0,0.5)">
          <Heading as="h3" size="md" mb={3}>What to expect</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} color="rgba(255,255,255,0.85)">
            <Box><Badge colorScheme="teal" mr={2}>1</Badge><Text as="span"> Comprehensive assessment</Text></Box>
            <Box><Badge colorScheme="teal" mr={2}>2</Badge><Text as="span"> Personalized care plan</Text></Box>
            <Box><Badge colorScheme="teal" mr={2}>3</Badge><Text as="span"> Follow-up & referrals</Text></Box>
            <Box><Badge colorScheme="teal" mr={2}>4</Badge><Text as="span"> Secure teleconsult options</Text></Box>
          </SimpleGrid>
        </Box>
      </Flex>

      <Box bg="rgba(255,255,255,0.02)" p={{ base: 4, md: 6 }} borderRadius="12px">
        <Heading as="h3" size="md" mb={4}>Available Consultants</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
    {['Dr. Amina Yusuf - Obstetrics', 'Dr. Chike Okonkwo - Surgery', 'Dr. Maria Gomez - Diagnostics'].map((n) => (
            <Box key={n} p={4} bg="rgba(255,255,255,0.02)" borderRadius="10px" border="1px solid rgba(255,255,255,0.04)">
              <Heading as="h4" size="sm" mb={2}>{n}</Heading>
              <Text fontSize="sm" mb={3} color="rgba(255,255,255,0.7)">Expert with over 10 years experience. Available for in-clinic and teleconsult.</Text>
              <Button size="sm" colorScheme="teal" onClick={onOpen}>Book</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Booking Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent bg="rgba(6,30,34,0.95)" color="white">
          <ModalHeader>Book Consultation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Full name" bg="rgba(255,255,255,0.03)" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
                <FormHelperText>We will only contact you about this booking.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input name="date" value={form.date} onChange={handleChange} type="date" bg="rgba(255,255,255,0.03)" />
                </FormControl>
                <FormControl>
                  <FormLabel>Time</FormLabel>
                  <Input name="time" value={form.time} onChange={handleChange} type="time" bg="rgba(255,255,255,0.03)" />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Notes (optional)</FormLabel>
                <Textarea name="notes" value={form.notes} onChange={handleChange} bg="rgba(255,255,255,0.03)" placeholder="Brief notes or reason for consultation" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleSubmit} isLoading={submitting}>Confirm Booking</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Consultation;
