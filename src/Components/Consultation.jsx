// src/Components/Consultation.jsx
import React, { useState } from "react";
import {
  Box, Button, Flex, Heading, Text, Stack, SimpleGrid, Badge,
  useDisclosure, useToast, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack
} from "@chakra-ui/react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { useConsultations } from "./ConsultationContext";
import ConsultationModal from "./ConsultationModal";

const Consultation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // booking modal
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose
  } = useDisclosure(); // learn more modal

  const { addConsultation } = useConsultations();
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900)); // simulate API
      addConsultation({ ...form, dateBooked: new Date().toLocaleString() });
      toast({
        title: "Booking received",
        description: "We'll contact you to confirm.",
        status: "success",
        duration: 4000
      });
      onClose();
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again.",
        status: "error",
        duration: 4000
      });
    }
    setSubmitting(false);
  };

  return (
    <Box px={{ base: 4, md: 12 }} py={{ base: 8, md: 16 }} maxW="1200px" mx="auto">
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={8} mb={8}>
        <Box flex="1">
          <Heading size="lg" mb={4} color="teal.100">
            Premium Consultation Services
          </Heading>
          <Text fontSize="lg" color="rgba(255,255,255,0.85)" mb={6}>
            Book a specialised consultation with our experienced medical team.
            Choose a convenient time and we’ll handle the rest.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
            <Button leftIcon={<FaCalendarAlt />} colorScheme="teal" onClick={onOpen}>
              Book Appointment
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              leftIcon={<FaInfoCircle />}
              onClick={onInfoOpen}
            >
              Learn More
            </Button>
          </Stack>
        </Box>

        <Box
          flex="1"
          bg="rgba(255,255,255,0.03)"
          p={6}
          borderRadius="12px"
          boxShadow="0 8px 30px rgba(0,0,0,0.5)"
        >
          <Heading size="md" mb={3}>
            What to expect
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} color="rgba(255,255,255,0.85)">
            {[
              "Comprehensive assessment",
              "Personalized care plan",
              "Follow-up & referrals",
              "Secure teleconsult options"
            ].map((t, i) => (
              <Box key={i}>
                <Badge colorScheme="teal" mr={2}>
                  {i + 1}
                </Badge>
                <Text as="span">{t}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      <Box bg="rgba(255,255,255,0.02)" p={{ base: 4, md: 6 }} borderRadius="12px">
        <Heading size="md" mb={4}>
          Available Consultants
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            "Dr. Amina Yusuf - Obstetrics",
            "Dr. Chike Okonkwo - Surgery",
            "Dr. Maria Gomez - Diagnostics"
          ].map((n) => (
            <Box
              key={n}
              p={4}
              bg="rgba(255,255,255,0.02)"
              borderRadius="10px"
              border="1px solid rgba(255,255,255,0.04)"
            >
              <Heading size="sm" mb={2}>
                {n}
              </Heading>
              <Text fontSize="sm" mb={3} color="rgba(255,255,255,0.7)">
                Expert with 10+ years of experience. Available for in-clinic & teleconsult.
              </Text>
              <Button size="sm" colorScheme="teal" onClick={onOpen}>
                Book
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Flex justify="center" mt={8}>
        <Button colorScheme="teal" onClick={onOpen}>
          Book Consultation
        </Button>
      </Flex>

      {/* ✅ Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isOpen}
        onClose={onClose}
        isSubmitting={submitting}
        onSubmit={handleSubmit}
      />

      {/* ✅ Learn More / Terms Modal */}
      <Modal isOpen={isInfoOpen} onClose={onInfoClose} isCentered size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg="#0C3836" color="white" p={6} borderRadius="lg">
          <ModalHeader>Consultation Overview & Terms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={5}>
              <Box>
                <Heading size="sm" mb={2} color="teal.200">
                  Overview
                </Heading>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">
                  Our consultation service provides direct access to certified healthcare professionals
                  across multiple specialties. Appointments may be conducted in-clinic or through secure
                  telemedicine channels. Each session is aimed at comprehensive evaluation, personalized
                  care recommendations, and coordinated follow-ups where necessary.
                </Text>
              </Box>

              <Box>
                <Heading size="sm" mb={2} color="teal.200">
                  Terms & Conditions
                </Heading>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">
                  By booking a consultation, clients agree to provide accurate medical and contact
                  information. Consultation fees are payable prior to service confirmation. Cancellations
                  made less than 12 hours before the appointment may incur charges. The organization
                  reserves the right to reassign or reschedule sessions based on clinician availability.
                </Text>
              </Box>

              <Box>
                <Heading size="sm" mb={2} color="teal.200">
                  Guidelines for Clients
                </Heading>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">
                  • Please arrive (or log in) 10 minutes before your scheduled appointment. <br />
                  • Ensure a quiet, well-lit space for teleconsultations. <br />
                  • Prepare a list of symptoms, medications, and relevant documents beforehand. <br />
                  • All medical information shared will remain confidential in accordance with privacy laws. <br />
                  • In emergency cases, please seek immediate care from the nearest hospital rather than scheduling an online consultation.
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onInfoClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={() => { onInfoClose(); onOpen(); }}>
              Proceed to Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Consultation;
