import React, { useState } from "react";
import {
  Box, Container, Heading, Text, Stack, FormControl, FormLabel,
  Input, Button, useToast, Link
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const loadUsers = () => JSON.parse(localStorage.getItem("medics_users") || "{}");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return toast({ title: "Invalid email", description: "Please enter a valid email address.", status: "error", duration: 3500 });
    }
    if (!form.password) {
      return toast({ title: "Missing password", description: "Please enter your password.", status: "error", duration: 3500 });
    }

    const users = loadUsers();
    const user = users[form.email.trim().toLowerCase()];

    if (!user || user.password !== form.password) {
      return toast({ title: "Login failed", description: "Incorrect email or password.", status: "error", duration: 3500 });
    }

    localStorage.setItem("medics_session", user.email);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${user.name}`,
      status: "success",
      duration: 2500,
    });

    setTimeout(() => navigate("/account"), 600);
  };

  return (
    <Box as="main" py={{ base: 8, md: 14 }}>
      <Container maxW="3xl">
        <Stack spacing={6} textAlign="center">
          <Heading color="#BFEDE6">Welcome back</Heading>
          <Text color="rgba(255,255,255,0.8)">
            Log in to access your account and continue managing your health journey.
          </Text>
        </Stack>

        <Box bg="rgba(255,255,255,0.02)" p={{ base: 5, md: 8 }} borderRadius="md" mt={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  bg="rgba(255,255,255,0.03)"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  bg="rgba(255,255,255,0.03)"
                />
              </FormControl>

              <Button colorScheme="teal" type="submit">
                Log in
              </Button>

              {/* Signup link */}
              <Text textAlign="center" fontSize="sm" color="rgba(255,255,255,0.7)">
                Don’t have an account yet?{" "}
                <Link color="#BFEDE6" fontWeight="semibold" onClick={() => navigate("/signup")}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
