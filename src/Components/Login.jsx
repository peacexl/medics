import React, { useState } from 'react';
import { Box, Container, Heading, Text, Stack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.match(/^\S+@\S+\.\S+$/) || form.password.length < 1) {
      return toast({ title: 'Validation', description: 'Enter valid email and password', status: 'error', duration: 3000 });
    }
    // simulate login
    await new Promise(r => setTimeout(r, 700));
    toast({ title: 'Signed in', description: 'Welcome back!', status: 'success', duration: 3000 });
    navigate('/');
  };

  return (
    <Box as="main" py={{ base: 8, md: 16 }}>
      <Container maxW="3xl">
        <Stack spacing={6} textAlign="center">
          <Heading color="#BFEDE6">Sign in</Heading>
          <Text color="rgba(255,255,255,0.8)">Access your Medora account to manage bookings and preferences.</Text>
        </Stack>

        <Box bg="rgba(255,255,255,0.02)" p={6} borderRadius="md" mt={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} type="password" placeholder="Password" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <Button colorScheme="teal" type="submit">Sign in</Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
