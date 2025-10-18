import React from "react";
import {
  Box, Flex, Text, Button, Image, VStack, HStack, Modal,
  ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import ChartA from "./ChartA";
import ChartB from "./ChartB";


const Body = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoLink = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <Box as="section" w="100%" minH="100vh"
      bg="linear-gradient(90deg, rgba(6,30,34,0.95) 0%, rgba(12,82,86,0.85) 45%, rgba(48,180,175,0.15) 100%)"
      color="white" pt={{ base: "10px", md: "0px" }} pb="50px">

      {/* ---------- Desktop View ---------- */}
      <Flex display={{ base: "none", md: "flex" }}
        align="center" justify="space-between" w="88%" mx="auto"
        flexWrap="wrap" gap="50px">

        {/* Left Section */}
        <VStack align="flex-start" textAlign="left" spacing="22px"
          maxW="520px" flex="1">

          <Box bg="rgba(56,178,172,0.15)" px="16px" py="7px"
            borderRadius="full" fontSize="13px" color="#BFEDE6">
            Online Platforms offer loans
          </Box>

          <Text fontSize={{ base: "34px", md: "46px", lg: "54px" }}
            fontWeight="700" lineHeight="1.2" letterSpacing="-0.02em">
            Smarter AI Healthcare Starts With{" "}
            <Text as="span" color="#C8FF5A">Medora</Text>.
          </Text>

          <Text fontSize="17px" color="rgba(255,255,255,0.78)"
            lineHeight="1.7" maxW="480px">
            Medora is an AI-powered medical platform built to transform complex healthcare data into clear, actionable insights — helping hospitals, clinics, and patients make better decisions in real-time.
          </Text>

          <HStack spacing="20px" pt="10px">
            <Button bg="#C8FF5A" color="#0C3836" fontWeight="600"
              borderRadius="9999px" px="30px" py="20px" fontSize="15px"
              _hover={{ bg: "#B6F04F" }}>
              Book a Free Consultation
            </Button>

            <Button leftIcon={<FaPlay />} variant="outline"
              borderColor="rgba(255,255,255,0.3)" color="white"
              px="26px" py="20px" borderRadius="9999px" fontSize="15px"
              _hover={{ bg: "rgba(255,255,255,0.1)" }} onClick={onOpen}>
              Watch a Demo
            </Button>
          </HStack>
        </VStack>

        {/* Right Section (Doctor + Charts) */}
        <Box position="relative" display="flex" justifyContent="center"
          alignItems="center" flex="1" minW="420px">

          <Image src="src/assets/doc.png" alt="Doctor"
            borderRadius="2xl" maxW="460px" mx="auto" />

          <Box position="absolute" top="5%" right="-50px"
            w="240px" h="240px" borderRadius="lg" overflow="hidden"
            boxShadow="0 8px 20px rgba(0,0,0,0.35)">
            <ChartA />
          </Box>

          <Box position="absolute" bottom="15%" right="-40px"
            w="240px" h="160px" borderRadius="lg" bg="rgba(255,255,255,0.08)"
            border="1px solid rgba(255,255,255,0.15)" backdropFilter="blur(8px)"
            overflow="hidden" boxShadow="0 6px 18px rgba(0,0,0,0.3)">
            <ChartB />
          </Box>
        </Box>
      </Flex>

{/* ---------- Mobile View ---------- */}
<VStack display={{ base: "flex", md: "none" }} spacing="25px"
  align="center" w="90%" mx="auto" mt="80px">

  {/* Writeup */}
  <VStack spacing="16px" align="flex-start" w="100%">
    <Box bg="rgba(56,178,172,0.15)" px="16px" py="7px"
      borderRadius="full" fontSize="13px" color="#BFEDE6">
      Online Platforms offer loans
    </Box>

    <Text fontSize="28px" fontWeight="700" lineHeight="1.3" textAlign="left">
      Smarter AI Healthcare Starts With{" "}
      <Text as="span" color="#C8FF5A">Medora</Text>.
    </Text>

    <Text fontSize="15px" color="rgba(255,255,255,0.78)" lineHeight="1.6" textAlign="left">
      Medora is an AI-powered medical platform built to transform complex healthcare data into clear, actionable insights — helping hospitals, clinics, and patients make better decisions in real-time.
    </Text>
  </VStack>

  {/* Buttons */}
  <HStack spacing="15px" w="100%">
    <Button flex="1" bg="#C8FF5A" color="#0C3836" fontWeight="600"
      borderRadius="9999px" py="18px" fontSize="14px"
      _hover={{ bg: "#B6F04F" }}>
      Book a Free Consultation
    </Button>

    <Button flex="1" leftIcon={<FaPlay />} variant="outline"
      borderColor="rgba(255,255,255,0.3)" color="white"
      py="18px" borderRadius="9999px" fontSize="14px"
      _hover={{ bg: "rgba(255,255,255,0.1)" }} onClick={onOpen}>
      Watch a Demo
    </Button>
  </HStack>

  {/* ChartA aligned left */}
  <Box w="100%" maxW="280px" h="280px" borderRadius="lg"
    overflow="hidden" boxShadow="0 6px 18px rgba(0,0,0,0.3)" alignSelf="flex-start">
    <ChartA />
  </Box>

  {/* Doctor Image overlapping ChartA */}
  <Box position="relative" w="100%" maxW="300px" alignSelf="flex-end" mt="-190px" mr="-45px">
    <Image src="src/assets/doc.png" alt="Doctor"
      borderRadius="2xl" w="100%" />
  </Box>

  {/* ChartB overlapping image and ChartA */}
  <Box w="100%" maxW="280px" h="160px" borderRadius="lg"
    bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.15)"
    backdropFilter="blur(8px)" overflow="hidden"
    boxShadow="0 6px 18px rgba(0,0,0,0.3)"
    alignSelf="flex-start" mt="-150px">
    <ChartB />
  </Box>
</VStack>


      {/* ---------- Video Modal ---------- */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay bg="rgba(0,0,0,0.85)" backdropFilter="blur(6px)" />
        <ModalContent bg="transparent" boxShadow="none" maxW="850px">
          <ModalCloseButton color="white" />
          <ModalBody p="0">
            <Box as="iframe" src={isOpen ? `${videoLink}?autoplay=1` : ""}
              allowFullScreen title="Medora Demo" w="100%" h="460px"
              borderRadius="16px" border="none" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Body;
