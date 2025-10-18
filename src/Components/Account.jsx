import React from 'react';
import { Box, Container, Heading, Text, Stack, Input, Button, VStack, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <Box as="main" py={{ base: 8, md: 16 }}>
      <Container maxW="4xl" color="white">
        <Stack spacing={8} textAlign="center">
          <Heading size="xl" color="#BFEDE6">My Account</Heading>
          <Text color="rgba(255,255,255,0.8)">Access your profile, appointments and subscriptions. Secure, private and easy to use.</Text>

          <Box bg="rgba(255,255,255,0.02)" p={6} borderRadius="md" maxW="560px" mx="auto">
            <VStack spacing={4} align="stretch">
              <Input placeholder="Email address" bg="rgba(255,255,255,0.03)" />
              <Input placeholder="Password" type="password" bg="rgba(255,255,255,0.03)" />
              <HStack spacing={3} justify="space-between">
                <Button as={Link} to="/login" colorScheme="teal">Sign in</Button>
                <Button as={Link} to="/signup" variant="outline" colorScheme="teal" >Create account</Button>
              </HStack>
            </VStack>
          </Box>

          <Text fontSize="sm" color="rgba(255,255,255,0.6)">If you need help accessing your account, contact our support team.</Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Account; 
