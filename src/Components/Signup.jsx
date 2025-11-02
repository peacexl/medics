import React, { useState } from "react";
import {
  Box, Container, Heading, Text, Stack, FormControl, FormLabel,
  Input, Button, RadioGroup, HStack, Radio, useToast, Select, Link, VStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", dob: "", hypertension: "no",
    diabetes: "no", obesity: "no", mentalStress: "low",
    allergies: "", othersSelected: "none", othersText: ""
  });
  const toast = useToast(), navigate = useNavigate();
  const handleChange = (k,v)=>setForm(f=>({...f,[k]:v}));
  const loadUsers=()=>JSON.parse(localStorage.getItem("medics_users")||"{}");

  const handleSubmit=e=>{
    e.preventDefault();
    if(!form.name.trim())return toast({title:"Name required",status:"error"});
    if(!/\S+@\S+\.\S+/.test(form.email)) return toast({ title: "Invalid email", status: "error" });
    if(form.password.length<6)return toast({title:"Weak password",status:"error"});
    if(form.dob && new Date(form.dob)>new Date())return toast({title:"Invalid date of birth",status:"error"});

    const users=loadUsers(); if(users[form.email])return toast({title:"Email already registered",status:"error"});
    const u={...form,others:form.othersSelected==="others"?form.othersText.trim():"",createdAt:new Date().toISOString()};
    users[form.email]=u;
    localStorage.setItem("medics_users",JSON.stringify(users));
    localStorage.setItem("medics_session",u.email);
    toast({title:"Account created",status:"success",duration:2000});
    setTimeout(()=>navigate("/account"),600);
  };

  return (
    <Box as="main" py={{base:8,md:14}}>
      <Container maxW="3xl">
        <Stack spacing={6} textAlign="center">
          <Heading color="#BFEDE6">Create an account</Heading>
          <Text color="rgba(255,255,255,0.8)">Sign up to manage appointments and get personalized health guidance.</Text>
        </Stack>
        <Box bg="rgba(255,255,255,0.02)" p={{base:5,md:8}} borderRadius="md" mt={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {[
                ["Full name","name","text","Your full name"],
                ["Email","email","email","you@example.com"],
                ["Password","password","password","Choose a password"],
                ["Date of Birth","dob","date",""]
              ].map(([l,k,t,p])=>(
                <FormControl key={k} isRequired>
                  <FormLabel>{l}</FormLabel>
                  <Input type={t} value={form[k]} placeholder={p} onChange={e=>handleChange(k,e.target.value)} bg="rgba(255,255,255,0.03)" />
                </FormControl>
              ))}
              <Text mb={2} fontWeight={600} ml="13em">Health information (optional)</Text>
              {["hypertension","diabetes","obesity"].map(k=>(
                <HStack key={k} align="center">
                  <Text flex="1" textTransform="capitalize">{k}</Text>
                  <RadioGroup onChange={v=>handleChange(k,v)} value={form[k]}>
                    <HStack><Radio value="yes">Yes</Radio><Radio value="no">No</Radio><Radio value="unknown">Unknown</Radio></HStack>
                  </RadioGroup>
                </HStack>
              ))}
              <HStack align="center"><Text flex="1">Mental stress</Text>
                <RadioGroup onChange={v=>handleChange("mentalStress",v)} value={form.mentalStress}>
                  <HStack><Radio value="low">Low</Radio><Radio value="moderate">Moderate</Radio><Radio value="high">High</Radio></HStack>
                </RadioGroup>
              </HStack>
              <FormControl><FormLabel>Allergies</FormLabel>
                <Input value={form.allergies} onChange={e=>handleChange("allergies",e.target.value)} placeholder="List allergies (optional)" bg="rgba(255,255,255,0.03)" />
              </FormControl>
              <HStack align="center"><Text flex="1">Other conditions</Text>
                <Select value={form.othersSelected} onChange={e=>handleChange("othersSelected",e.target.value)} maxW="220px" bg="rgba(255,255,255,0.03)">
                  <option value="none">None</option><option value="others">Others (specify)</option>
                </Select>
              </HStack>
              {form.othersSelected==="others"&&(
                <FormControl><FormLabel>Describe</FormLabel>
                  <Input value={form.othersText} onChange={e=>handleChange("othersText",e.target.value)} bg="rgba(255,255,255,0.03)" />
                </FormControl>
              )}
              <Button colorScheme="teal" type="submit">Create account</Button>
              <Text textAlign="center" fontSize="sm" color="rgba(255,255,255,0.7)">Already have an account?{" "}
                <Link color="#BFEDE6" fontWeight="semibold" onClick={()=>navigate("/login")}>Log in</Link></Text>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};
export default Signup;
