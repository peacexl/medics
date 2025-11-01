// src/Components/ConsultationModal.jsx
import React,{useState,useEffect}from"react";
import{
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,
  ModalBody,ModalFooter,Button,FormControl,FormLabel,Input,
  Textarea,RadioGroup,Radio,VStack,HStack,useToast,Box
}from"@chakra-ui/react";
import{FaUserMd}from"react-icons/fa";
import{useConsultations}from"./ConsultationContext";

const ConsultationModal=({isOpen,onClose,prefill})=>{
  const toast=useToast();
  const{addConsultation}=useConsultations();
  const[form,setForm]=useState({name:"",email:"",phone:"",notes:"",date:"",time:"",doctor:""});

  useEffect(()=>{
    const sessionEmail=localStorage.getItem("medics_session");
    const users=JSON.parse(localStorage.getItem("medics_users")||"{}");
    const u=users[sessionEmail];
    if(prefill){
      setForm(f=>({...f,...prefill}));
    }else if(u){
      setForm(f=>({...f,name:u.name||"",email:u.email||"",phone:u.phone||""}));
    }
  },[isOpen,prefill]);

  const handleChange=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));

  const handleSubmit=()=>{
    if(!form.name||!form.email||!form.phone||!form.date||!form.time)
      return toast({title:"Incomplete form",description:"Please fill in all required fields.",status:"error",duration:2000});
    const newConsult={...form,message:form.notes,dateBooked:new Date().toLocaleString()};
    addConsultation(newConsult);
    toast({title:"Consultation booked",description:"Your consultation request has been submitted.",status:"success",duration:2000});
    setForm({name:"",email:"",phone:"",notes:"",date:"",time:"",doctor:""});onClose();
  };

  return(
    <Modal isOpen={isOpen}onClose={onClose}isCentered size="md"scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700"backdropFilter="blur(2px)"/>
      <ModalContent bg="gray.900"color="white"maxH="85vh"overflow="hidden"
        sx={{"::-webkit-scrollbar":{width:"6px"},"::-webkit-scrollbar-thumb":{background:"teal.500",borderRadius:"3px"},"::-webkit-scrollbar-track":{background:"rgba(255,255,255,0.05)"}}}>
        <ModalHeader display="flex"alignItems="center"gap={2}><FaUserMd/> {prefill?"Edit Consultation":"Book Consultation"}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody overflowY="auto"pr={2}>
          <Box pb={2}>
            <FormControl mb={3}><FormLabel>Name</FormLabel><Input name="name"value={form.name}onChange={handleChange}placeholder="Your full name"bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
            <FormControl mb={3}><FormLabel>Email</FormLabel><Input type="email"name="email"value={form.email}onChange={handleChange}placeholder="you@example.com"bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
            <FormControl mb={3}><FormLabel>Phone</FormLabel><Input type="tel"name="phone"value={form.phone}onChange={handleChange}placeholder="+234 801 234 5678"bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
            <HStack spacing={3}mb={3}>
              <FormControl><FormLabel>Date</FormLabel><Input type="date"name="date"value={form.date}onChange={handleChange}bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
              <FormControl><FormLabel>Time</FormLabel><Input type="time"name="time"value={form.time}onChange={handleChange}bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
            </HStack>
            <FormControl mb={3}><FormLabel>Preferred Doctor (optional)</FormLabel>
              <RadioGroup onChange={v=>setForm(p=>({...p,doctor:v}))}value={form.doctor}>
                <VStack align="start">
                  {["Dr. Amina Yusuf","Dr. Chike Okonkwo","Dr. Maria Gomez"].map(d=>(<Radio key={d}value={d}>{d}</Radio>))}
                </VStack>
              </RadioGroup>
            </FormControl>
            <FormControl mb={3}><FormLabel>Notes / Message</FormLabel><Textarea name="notes"value={form.notes}onChange={handleChange}placeholder="Describe your concern"bg="rgba(255,255,255,0.05)"_focus={{borderColor:"teal.400"}}/></FormControl>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid rgba(255,255,255,0.1)">
          <Button variant="ghost"mr={3}onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal"onClick={handleSubmit}>{prefill?"Save Changes":"Confirm Booking"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ConsultationModal;
