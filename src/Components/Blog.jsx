import React, { useState } from 'react';
import { Box, Grid, Heading, Text, Image, Stack, Button, Tag } from '@chakra-ui/react';
import hbpImg from '../assets/hbp.jpg';
import cholesterolImg from '../assets/cholesterol.jpg';
import womenHealthImg from '../assets/womenhealth.jpg';
import vaccineImg from '../assets/vaccine.jpg';
import exerciseImg from '../assets/exercise.jpg';
import anemiaImg from '../assets/anemia.jpg';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Healthy Diet: Practical Steps for Real Life',
    excerpt: 'A down-to-earth guide to building sustainable eating habits that support long-term health.',
    tag: 'Nutrition',
    author: 'Dr. Amina',
    date: 'Oct 10, 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Family Planning: Choices, Support and Care',
    excerpt: 'How to navigate family planning options with your provider and find a plan that fits your life.',
    tag: 'Family Health',
    author: 'PEACE EXCELLENT',
    date: 'Sep 18, 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Preventing High Blood Pressure: Everyday Measures',
    excerpt: 'Lifestyle adjustments and screening strategies to reduce your risk of hypertension.',
    tag: 'Cardiology',
    author: 'Dr. Mensah',
    date: 'Aug 12, 2025',
    readTime: '5 min',
    image: hbpImg
  },
  {
    id: 4,
    title: 'Lowering Cholesterol Safely',
    excerpt: 'Dietary choices, activity plans and when to discuss medication with your clinician.',
    tag: 'Cardiology',
    author: 'Dr. Patel',
    date: 'Jul 22, 2025',
    readTime: '6 min',
    image: cholesterolImg
  },
  {
    id: 5,
    title: 'Preventive Measures for Anemia',
    excerpt: 'Recognize symptoms, dietary sources of iron and when to test.',
    tag: 'Hematology',
    author: 'Dr. Kim',
    date: 'Jun 30, 2025',
    readTime: '5 min',
  image: anemiaImg
  },
  {
    id: 6,
    title: 'Mental Wellness: Small Practices, Big Gains',
    excerpt: 'Evidence-based micro-habits to strengthen mental resilience and daily wellbeing.',
    tag: 'Wellness',
    author: 'Dr. Ramos',
    date: 'May 14, 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'Women’s Health: Screening and Preventive Care',
    excerpt: 'What screenings are important at different life stages and how to stay ahead of health risks.',
    tag: 'Women',
    author: 'Dr. Chen',
    date: 'Apr 02, 2025',
    readTime: '6 min',
    image: womenHealthImg
  },
  {
    id: 8,
    title: 'Childhood Vaccinations: Myths & Facts',
    excerpt: 'A clear guide for parents on safety, schedules and community protection.',
    tag: 'Pediatrics',
    author: 'Dr. Okoye',
    date: 'Mar 10, 2025',
    readTime: '5 min',
    image: vaccineImg
  },
  {
    id: 9,
    title: 'Move More: Exercise Tips for Every Age',
    excerpt: 'Practical movement plans that fit busy schedules and improve long-term mobility.',
    tag: 'Fitness',
    author: 'Physio Team',
    date: 'Feb 05, 2025',
    readTime: '4 min',
    image: exerciseImg
  }
];

const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = showAll ? posts.length : Math.min(posts.length, 6);

  return (
    <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      <Stack spacing={6} textAlign={{ base: 'center', md: 'left' }}>
        <Heading as="h1" size="xl">Medora Insights</Heading>
        <Text color="rgba(255,255,255,0.8)">
          Expert articles, patient stories and healthcare best practices curated by our medical team.
        </Text>
      </Stack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={8}>
        {posts.slice(0, visibleCount).map(post => (
          <Box
            key={post.id}
            bg="rgba(255,255,255,0.03)"
            p={6}
            borderRadius="md"
            _hover={{ transform: 'translateY(-6px)', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
            transition="all 160ms"
          >
            <Image
              src={post.image}
              alt={post.title}
              borderRadius="md"
              mb={4}
              objectFit="cover"
              height="160px"
              width="100%"
            />
            <Stack direction="row" justify="space-between" align="center" mb={2}>
              <Tag size="sm">{post.tag}</Tag>
              <Text fontSize="sm" color="rgba(255,255,255,0.6)">
                {post.date} • {post.readTime}
              </Text>
            </Stack>
            <Heading as="h3" size="md" my={2}>{post.title}</Heading>
            <Text color="rgba(255,255,255,0.75)" mb={4}>{post.excerpt}</Text>
            <Stack direction="row" justify="space-between" align="center">
              <Button as={Link} to={`/blog/${post.id}`} variant="outline" colorScheme="teal" size="sm">
                Read more
              </Button>
              <Text fontSize="sm" color="rgba(255,255,255,0.6)">By {post.author}</Text>
            </Stack>
          </Box>
        ))}
      </Grid>

      <Box textAlign="center" mt={8}>
        <Button colorScheme="teal" onClick={() => setShowAll(prev => !prev)}>
          {showAll ? 'Show less' : 'View all articles'}
        </Button>
      </Box>
    </Box>
  );
};

export default Blog;
