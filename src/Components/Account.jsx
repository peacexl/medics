import React,{useState,useEffect,useRef}from"react";
import{Box,Flex,Avatar,Text,Heading,Button,Grid,Stack,Divider,IconButton,useToast,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,FormControl,FormLabel,Input,Badge}from"@chakra-ui/react";
import{FaUserCircle,FaEdit,FaTrashAlt,FaSignOutAlt}from"react-icons/fa";
import{useNavigate}from"react-router-dom";
import{useConsultations}from"./ConsultationContext";
import ConsultationModal from"./ConsultationModal";

const Account=()=>{
  const toast=useToast(),nav=useNavigate(),fileRef=useRef(null);
  // bring back addConsultation for undo functionality
  const{consultations=[],addConsultation,deleteConsultation}=useConsultations();
  const[userData,setUserData]=useState(null),[favorites,setFavorites]=useState([]);
  const[avatarModal,setAvatarModal]=useState(false),[editProfileOpen,setEditProfileOpen]=useState(false);
  const[editConsultData,setEditConsultData]=useState(null),[deleteModal,setDeleteModal]=useState(false),[logoutConfirm,setLogoutConfirm]=useState(false);

  const calcAge=d=>!d?"N/A":Math.floor((Date.now()-new Date(d))/3.15576e10);

  const loadUser=()=>{const email=localStorage.getItem("medics_session");if(!email)return;
    const users=JSON.parse(localStorage.getItem("medics_users")||"{}"),u=users[email];
    if(u){setUserData(u);setFavorites(u.favorites||[]);localStorage.setItem("userProfilePic",u.photo||"");}
  };
  useEffect(()=>{loadUser();const h=e=>{if(e.key==="medics_users")loadUser();};window.addEventListener("storage",h);return()=>window.removeEventListener("storage",h);},[]);

  const saveUser=u=>{if(!u?.email)return;const users=JSON.parse(localStorage.getItem("medics_users")||"{}");users[u.email]=u;
    localStorage.setItem("medics_users",JSON.stringify(users));localStorage.setItem("medics_session",u.email);setUserData(u);setFavorites(u.favorites||[]);
  };

  const handleAvatar=f=>{if(!f)return;if(f.size>5*1024*1024)return toast({title:"File too large (max 5MB)",status:"error",duration:1500});
    const r=new FileReader();r.onload=()=>{const up={...userData,photo:r.result};saveUser(up);toast({title:"Profile updated",status:"success",duration:1000});setAvatarModal(false);};r.readAsDataURL(f);
  };
  const clearAvatar=()=>{const up={...userData,photo:""};saveUser(up);toast({title:"Profile cleared",status:"info",duration:1000});setAvatarModal(false);};

  const confirmLogout=()=>setLogoutConfirm(true);
  const handleLogout=()=>{setLogoutConfirm(false);localStorage.removeItem("medics_session");toast({title:"Logged out",status:"info",duration:1000});setTimeout(()=>nav("/signup"),400);};
  const handleDelete=()=>{if(!userData?.email)return;const users=JSON.parse(localStorage.getItem("medics_users")||"{}");delete users[userData.email];
    localStorage.setItem("medics_users",JSON.stringify(users));localStorage.removeItem("medics_session");toast({title:"Account deleted successfully",status:"success",duration:1400});setDeleteModal(false);setTimeout(()=>nav("/signup"),500);
  };

  const myConsultations=consultations.filter(c=>[c.email,c.userEmail,c.requesterEmail].includes(userData?.email));
  const handleEditConsult=c=>setEditConsultData(c);

  // delete with undo
  const handleCancel=c=>{
    const idx=consultations.findIndex(i=>i.dateBooked===c.dateBooked&&i.email===c.email&&i.time===c.time&&i.name===c.name);
    if(idx===-1) return toast({title:"Could not cancel",status:"error",duration:1200});
    // keep a copy to allow undo
    const removed = {...consultations[idx], __idx: idx};
    deleteConsultation(idx);
    // show toast with undo
    const id = toast({
      position: "bottom-center",
      duration: 5000,
      render: () => (
        <Box bg="gray.800" color="white" p={3} borderRadius="md">
          <Text fontWeight="bold" ml="16">Request cancelled</Text>
          <Flex mt={2} gap={2}>
            <Button size="sm" onClick={() => { addConsultation(removed); toast.close(id); toast({title:"Restored",status:"success",duration:1200}); }} ml="10">Undo</Button>
            <Button size="sm" variant="ghost" onClick={() => toast.close(id)}>Dismiss</Button>
          </Flex>
        </Box>
      )
    });
  };

  const posts=JSON.parse(localStorage.getItem("medics_allPosts")||"[]");

  return(
    <Box maxW="1200px"mx="auto"px={{base:3,md:8}}py={{base:6,md:10}}>
      <Divider mb={6}/><Heading size="xl"mb={6}>My Account</Heading>

      {userData?(
        <Box bg="rgba(255,255,255,0.03)"p={{base:3,md:6}}borderRadius="md"boxShadow="md"mb={8}>
          <Flex justify="flex-end"mb={3}><Button bg="white"color="teal.600"_hover={{bg:"teal.100"}}onClick={()=>setEditProfileOpen(true)}>Edit Profile</Button></Flex>
          <Flex direction="column"align="center"gap={4}>
            <Box pos="relative">
              <Avatar size="2xl"name={userData.name?.slice(0,2)}src={userData.photo||""}icon={!userData.photo&&<FaUserCircle fontSize="2rem"/>}/>
              <IconButton icon={<FaEdit/>}size="sm"colorScheme="teal"pos="absolute"bottom="2"right="2"borderRadius="full"onClick={()=>setAvatarModal(true)}/>
              <Input type="file"accept="image/*"display="none"ref={fileRef}onChange={e=>handleAvatar(e.target.files?.[0])}/>
            </Box>
            <Heading size="lg"mt={2}>{userData.name}</Heading>

            <Grid templateColumns={{base:"1fr 1fr",md:"200px 1fr"}}gap={2}mt={4}fontSize={{base:"sm",md:"md"}}w="full"px={{base:1,md:10}} justify="center">
              {[["Email:",userData.email],["Age:",calcAge(userData.dob)],["Phone:",userData.phone||"N/A"],["Location:",userData.location||"N/A"],["Joined:",userData.createdAt?new Date(userData.createdAt).toLocaleDateString():"N/A"],["Hypertension:",userData.hypertension||"N/A"],["Diabetes:",userData.diabetes||"N/A"],["Obesity:",userData.obesity||"N/A"],["Mental stress:",userData.mentalStress||"N/A"],["Allergies:",userData.allergies||"None"],["Other conditions:",userData.others||"None"]].map(([l,v])=>(
                <React.Fragment key={l}><Text fontWeight="bold"color="teal.300">{l}</Text><Text>{v}</Text></React.Fragment>
              ))}
            </Grid>

            <Flex justify={{base:"flex-end",md:"flex-end"}}w="full"mt={4}gap={3}>
              <Button leftIcon={<FaSignOutAlt/>}colorScheme="red"onClick={confirmLogout}>Logout</Button>
              <Button leftIcon={<FaTrashAlt/>}variant="outline"colorScheme="red"onClick={()=>setDeleteModal(true)}>Delete Account</Button>
            </Flex>
          </Flex>
        </Box>
      ):<Text color="gray.400">Please sign in to view your account.</Text>}

      <Divider my={8}/>

      {/* CONSULTATIONS */}
      <Box mb={8}>
        <Heading size="md"mb={4}>My Consultation Requests</Heading>
        {myConsultations.length===0?<Text color="gray.400">No consultation requests yet.</Text>:(
          <Stack spacing={4}>{myConsultations.map((c,i)=>(
            <Box key={i}bg="rgba(255,255,255,0.05)"p={4}borderRadius="md"borderLeft="4px solid teal">
              <Flex justify="space-between"align="center">
                <Box>
                  <Text fontWeight="bold"color="teal.300">{c.name}</Text>
                  <Text fontSize="sm"color="gray.400">{c.email}</Text>
                  <Text mt={2}>{c.notes||c.message||"—"}</Text>
                  <Text mt={2}><b>Doctor:</b> {c.doctor||"Not selected"}</Text>
                  <Text mt={1}><b>Date:</b> {c.date||c.dateBooked||"N/A"} &nbsp; <b>Time:</b> {c.time||"N/A"}</Text>
                </Box>
                <Stack direction="row"spacing={2}>
                  <Button size="sm"variant="outline"onClick={()=>handleEditConsult(c)}>Edit</Button>
                  <IconButton aria-label="Cancel"size="sm"icon={<FaTrashAlt/>}onClick={()=>handleCancel(c)}/>
                </Stack>
              </Flex>
            </Box>
          ))}</Stack>
        )}
      </Box>

      <Divider my={8}/>

      {/* FAVORITES */}
      <Box mb={12}>
        <Heading size="md"mb={4}>Favorite Blogs</Heading>
        {favorites.length===0?<Text color="gray.400">You haven’t added any favorites yet.</Text>:(
          <Grid templateColumns={{base:"1fr",md:"repeat(3,1fr)"}}gap={6}>
            {posts.filter(p=>favorites.includes(p.id)).map(post=>(
              <Box as="button"onClick={()=>nav(`/blog/${post.id}`)}key={post.id}
                bg="rgba(255,255,255,0.05)"p={4}borderRadius="md"transition=".3s"
                _hover={{transform:"translateY(-4px)",boxShadow:"0 0 10px rgba(0,255,255,0.5)"}}>
                <Heading size="sm"mb={2}>{post.title}</Heading>
                <Text fontSize="sm"color="gray.400"mb={3}>{post.excerpt}</Text>
                <Badge colorScheme="teal">{post.tag}</Badge>
              </Box>
            ))}
          </Grid>
        )}
      </Box>

      {/* LOGOUT CONFIRM */}
      <Modal isOpen={logoutConfirm}onClose={()=>setLogoutConfirm(false)}isCentered>
        <ModalOverlay/>
        <ModalContent bg="gray.900"color="white"><ModalHeader>Confirm Logout</ModalHeader><ModalCloseButton/>
          <ModalBody><Text>Are you sure you want to log out of your account?</Text></ModalBody>
          <ModalFooter>
            <Button colorScheme="red"mr={3}onClick={handleLogout}>Yes, Logout</Button>
            <Button variant="ghost"onClick={()=>setLogoutConfirm(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AVATAR MODAL */}
      <Modal isOpen={avatarModal}onClose={()=>setAvatarModal(false)}isCentered>
        <ModalOverlay/>
        <ModalContent bg="gray.900"color="white"><ModalHeader>Profile Picture</ModalHeader><ModalCloseButton/>
          <ModalBody>
            <Button colorScheme="red"mb={3}w="full"onClick={clearAvatar}>Clear Profile Picture</Button>
            <Button colorScheme="teal"w="full"onClick={()=>fileRef.current.click()}>Change Profile Picture</Button>
            <Input type="file"accept="image/*"display="none"ref={fileRef}onChange={e=>handleAvatar(e.target.files?.[0])}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* DELETE ACCOUNT */}
      <Modal isOpen={deleteModal}onClose={()=>setDeleteModal(false)}isCentered>
        <ModalOverlay/>
        <ModalContent bg="gray.900"color="white"><ModalHeader>Confirm Deletion</ModalHeader><ModalCloseButton/>
          <ModalBody><Text mb={3}>Are you sure you want to permanently delete your account? This cannot be undone.</Text></ModalBody>
          <ModalFooter>
            <Button colorScheme="red"mr={3}onClick={handleDelete}>Yes, Delete</Button>
            <Button variant="ghost"onClick={()=>setDeleteModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* CONSULTATION MODAL (edit mode, prefilled) */}
      {editConsultData && <ConsultationModal isOpen={!!editConsultData} onClose={()=>setEditConsultData(null)} prefill={editConsultData} />}

      {/* EDIT PROFILE modal (signup-style) */}
      <Modal isOpen={editProfileOpen}onClose={()=>setEditProfileOpen(false)}isCentered>
        <ModalOverlay/>
        <ModalContent bg="gray.900"color="white"maxW="600px">
          <ModalHeader>Edit Profile</ModalHeader><ModalCloseButton/>
          <ModalBody>
            {userData && (["name","email","phone","location","dob","hypertension","diabetes","obesity","mentalStress","allergies","others"].map(k=>(
              <FormControl mb={3} key={k}><FormLabel textTransform="capitalize">{k==="dob"?"Date of Birth":k}</FormLabel>
                <Input type={k==="dob"?"date":"text"} value={userData[k]||""} onChange={e=>setUserData(s=>({...s,[k]:e.target.value}))}/>
              </FormControl>
            )))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal"mr={3}onClick={()=>{saveUser(userData);toast({title:"Profile updated",status:"success",duration:1000});setEditProfileOpen(false);}}>Save</Button>
            <Button variant="ghost"onClick={()=>setEditProfileOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default Account;
