import React, { useState } from 'react';
import { Box, Stack, Heading, Text, Grid, Button, Badge, useDisclosure, 
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
	ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';

const jobs = [
	{ id: 1, role: 'Registered Nurse', location: 'Lagos, Nigeria', type: 'Full-time' },
	{ id: 2, role: 'Clinical Laboratory Scientist', location: 'Abuja, Nigeria', type: 'Full-time' },
	{ id: 3, role: 'Telehealth Physician', location: 'Remote', type: 'Part-time' }
];

const Careers = () => {
	const { isOpen: isJobOpen, onOpen: onJobOpen, onClose: onJobClose } = useDisclosure();
	const { isOpen: isQuickOpen, onOpen: onQuickOpen, onClose: onQuickClose } = useDisclosure();
	const [selectedJob, setSelectedJob] = useState(null);
	const [form, setForm] = useState({ name: '', email: '', cover: '', cvFile: null });
	const [sending, setSending] = useState(false);
	const toast = useToast();

	const openApply = (job) => {
		setSelectedJob(job);
		setForm({ name: '', email: '', cover: '', cvFile: null });
		onJobOpen();
	};

	const validate = (f) => {
		if (!f.name.trim()) return 'Please enter your full name';
		if (!f.email.match(/^\S+@\S+\.\S+$/)) return 'Please enter a valid email';
		return null;
	};

	const submitJob = async () => {
		const err = validate(form);
		if (err) return toast({ title: 'Validation error', description: err, status: 'error', duration: 4000 });
		setSending(true);
		try {
			await new Promise(r => setTimeout(r, 900));
			setSending(false);
			onJobClose();
			toast({ title: 'Application sent', description: 'We received your application. We will contact you if there is a match.', status: 'success', duration: 5000 });
		} catch {
			setSending(false);
			toast({ title: 'Submission failed', description: 'Please try again later.', status: 'error', duration: 4000 });
		}
	};

	const submitQuick = async () => {
		const err = validate(form);
		if (err) return toast({ title: 'Validation error', description: err, status: 'error', duration: 4000 });
		setSending(true);
		try {
			await new Promise(r => setTimeout(r, 900)); 
			setSending(false);
			onQuickClose();
			toast({ title: 'CV sent', description: 'Thanks — we will keep your CV on file and reach out when a role matches.', status: 'success', duration: 5000 });
		} catch {
			setSending(false);
			toast({ title: 'Submission failed', description: 'Please try again later.', status: 'error', duration: 4000 });
		}
	};

	return (
		<Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
			<Stack spacing={6} textAlign={{ base: 'center', md: 'left' }}>
				<Heading as="h1">Careers at Medora</Heading>
				<Text color="rgba(255,255,255,0.8)">Join a team committed to compassionate care, high technical standards, and continuous professional growth.</Text>
			</Stack>

			<Box mt={8}>
				<Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
					{jobs.map(job => (
						<Box key={job.id} bg="rgba(255,255,255,0.03)" p={5} borderRadius="md">
							<Heading as="h3" size="md">{job.role}</Heading>
							<Text color="rgba(255,255,255,0.7)" mt={2}>{job.location}</Text>
							<Badge mt={3} colorScheme="teal">{job.type}</Badge>
							<Button mt={4} colorScheme="teal" onClick={() => openApply(job)}>Apply now</Button>
						</Box>
					))}
				</Grid>
			</Box>

			<Box textAlign="center" mt={10}>
				<Text mb={3}>Don’t see a role that fits? Send us your CV and we’ll reach out when a match appears.</Text>
						<Button colorScheme="teal" onClick={() => { setForm({ name: '', email: '', cover: '', cvFile: null }); onQuickOpen(); }}>Send CV</Button>
			</Box>

			{/* Job apply modal */}
			<Modal isOpen={isJobOpen} onClose={onJobClose} isCentered size="md">
				<ModalOverlay bg="blackAlpha.600" />
				<ModalContent bg="rgba(6,30,34,0.95)" color="white">
					<ModalHeader>Apply for {selectedJob?.role}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb={3}>
							<FormLabel>Name</FormLabel>
							<Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl mb={3}>
							<FormLabel>Email</FormLabel>
							<Input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl>
							<FormLabel>Cover note (optional)</FormLabel>
							<Textarea value={form.cover} onChange={(e) => setForm(f => ({ ...f, cover: e.target.value }))} placeholder="Short note or message" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl>
							<FormLabel>Attach CV (optional)</FormLabel>
							<Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setForm(f => ({ ...f, cvFile: e.target.files && e.target.files[0] || null }))} bg="rgba(255,255,255,0.02)" />
							{form.cvFile && <Text mt={2} fontSize="sm" color="rgba(255,255,255,0.7)">Selected: {form.cvFile.name}</Text>}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onJobClose}>Cancel</Button>
						<Button colorScheme="teal" onClick={submitJob} isLoading={sending}>Send application</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Quick CV modal */}
			<Modal isOpen={isQuickOpen} onClose={onQuickClose} isCentered size="md">
				<ModalOverlay bg="blackAlpha.600" />
				<ModalContent bg="rgba(6,30,34,0.95)" color="white">
					<ModalHeader>Send your CV</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb={3}>
							<FormLabel>Name</FormLabel>
							<Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl mb={3}>
							<FormLabel>Email</FormLabel>
							<Input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl mb={3}>
							<FormLabel>Message (optional)</FormLabel>
							<Textarea value={form.cover} onChange={(e) => setForm(f => ({ ...f, cover: e.target.value }))} placeholder="A short intro or link to your CV" bg="rgba(255,255,255,0.03)" />
						</FormControl>
						<FormControl>
							<FormLabel>Attach CV (optional)</FormLabel>
							<Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setForm(f => ({ ...f, cvFile: e.target.files && e.target.files[0] || null }))} bg="rgba(255,255,255,0.02)" />
							{form.cvFile && <Text mt={2} fontSize="sm" color="rgba(255,255,255,0.7)">Selected: {form.cvFile.name}</Text>}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onQuickClose}>Cancel</Button>
						<Button colorScheme="teal" onClick={submitQuick} isLoading={sending}>Send CV</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Careers;
