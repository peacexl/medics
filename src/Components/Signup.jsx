import React, { useState } from 'react';
import { Box, Container, Heading, Text, Stack, FormControl, FormLabel, Input, Button, RadioGroup, HStack, Radio, useToast, Textarea } from '@chakra-ui/react';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', hypertension: 'no', diabetes: 'no', obesity: 'no', mentalStress: 'no' });
  const toast = useToast();
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.match(/^\S+@\S+\.\S+$/) || form.password.length < 6) {
      return toast({ title: 'Validation error', description: 'Please provide name, valid email and a password (6+ chars).', status: 'error', duration: 4000 });
    }
    // Simulate signup
    await new Promise(r => setTimeout(r, 900));
    // persist user in localStorage (medics_users map by email)
    try {
      const stored = JSON.parse(localStorage.getItem('medics_users') || '{}');
      stored[form.email] = { ...form, createdAt: new Date().toISOString() };
      localStorage.setItem('medics_users', JSON.stringify(stored));
      // set session
      localStorage.setItem('medics_session', form.email);
    } catch (err) {
      console.error('storage error', err);
    }
    toast({ title: 'Account created', description: 'Welcome to Medora — your profile is ready and you are signed in.', status: 'success', duration: 5000 });
    setForm({ name: '', email: '', password: '', hypertension: 'no', diabetes: 'no', obesity: 'no', mentalStress: 'no' });
  };

  return (
    <Box as="main" py={{ base: 8, md: 16 }}>
      <Container maxW="3xl">
        <Stack spacing={6} textAlign="center">
          <Heading color="#BFEDE6">Create an account</Heading>
          <Text color="rgba(255,255,255,0.8)">Sign up to manage appointments and get personalized health guidance.</Text>
        </Stack>

        <Box bg="rgba(255,255,255,0.02)" p={6} borderRadius="md" mt={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your full name" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input value={form.password} onChange={(e) => handleChange('password', e.target.value)} type="password" placeholder="Choose a password" bg="rgba(255,255,255,0.03)" />
              </FormControl>

              <Box>
                <Text mb={2} fontWeight={600}>Health information (optional)</Text>
                <Stack spacing={4}>
                  <HStack align="center"><Text flex="1">Hypertension</Text>
                    <RadioGroup onChange={(v) => handleChange('hypertension', v)} value={form.hypertension}><HStack><Radio value="yes">Yes</Radio><Radio value="no">No</Radio><Radio value="unknown">Unknown</Radio></HStack></RadioGroup>
                  </HStack>

                  <HStack align="center"><Text flex="1">Diabetes</Text>
                    <RadioGroup onChange={(v) => handleChange('diabetes', v)} value={form.diabetes}><HStack><Radio value="yes">Yes</Radio><Radio value="no">No</Radio><Radio value="unknown">Unknown</Radio></HStack></RadioGroup>
                  </HStack>

                  <HStack align="center"><Text flex="1">Obesity</Text>
                    <RadioGroup onChange={(v) => handleChange('obesity', v)} value={form.obesity}><HStack><Radio value="yes">Yes</Radio><Radio value="no">No</Radio><Radio value="unknown">Unknown</Radio></HStack></RadioGroup>
                  </HStack>

                  <HStack align="center"><Text flex="1">Mental stress</Text>
                    <RadioGroup onChange={(v) => handleChange('mentalStress', v)} value={form.mentalStress}><HStack><Radio value="low">Low</Radio><Radio value="moderate">Moderate</Radio><Radio value="high">High</Radio></HStack></RadioGroup>
                  </HStack>
                </Stack>
              </Box>

              <Button colorScheme="teal" type="submit">Create account</Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
