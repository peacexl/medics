import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChartA = ({ w = 240, h = 125, points = 60 }) => {
  const [seriesA, setSeriesA] = useState(() => Array.from({ length: points }, () => 40 + Math.random() * 20));
  const [seriesB, setSeriesB] = useState(() => Array.from({ length: points }, () => 60 + Math.random() * 18));
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  
  useEffect(() => {
    const id = setInterval(() => {
      setSeriesA(s => [...s.slice(1), Math.max(5, Math.min(95, s.at(-1) + (Math.random() - 0.45) * 8))]);
      setSeriesB(s => [...s.slice(1), Math.max(5, Math.min(95, s.at(-1) + (Math.random() - 0.45) * 6))]);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const scroll = dir => scrollRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  const scale = 1.6, svgW = Math.round(w * scale);
  const toPoints = arr => arr.map((v, i) => `${(i / (arr.length - 1)) * svgW},${h - (v / 100) * h}`).join(" ");
  const yLabels = [100, 80, 60, 40, 20, 0], months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <Box w="240px" h="240px" pos="relative" bg="rgba(255,255,255,0.03)" borderRadius="12px" backdropFilter="blur(60px)" overflow="hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} boxShadow="0 6px 20px rgba(0,0,0,0.35)">
      <Box ref={scrollRef} overflowX="auto" overflowY="hidden" h={`${h + 50}px`} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
        <Box minW={`${svgW}px`} p="10px 8px 6px 8px">
          <Text fontSize="12px" color="rgba(255,255,255,0.9)" mb="6px" ml="-200px" textAlign="center">Mortality & Birth Rates</Text>
          <Flex align="flex-start">
            <Box display="flex" flexDir="column" justifyContent="space-between" h={`${h}px`} pr="8px" fontSize="10px" color="rgba(255,255,255,0.65)">{yLabels.map(v => <Text key={v}>{v}</Text>)}</Box>
            <Box>
              <svg width={svgW} height={h} style={{ display: "block" }}>
                {yLabels.map((val, i) => <line key={i} x1="0" y1={h - (val / 100) * h} x2={svgW} y2={h - (val / 100) * h} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />)}
                <polyline fill="none" stroke="#EAB308" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={toPoints(seriesB)} style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))" }} />
                <polyline fill="none" stroke="#FB7185" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={toPoints(seriesA)} opacity="0.95" />
              </svg>
              <Flex mt="6px" w={`${svgW}px`} justify="space-between" fontSize="9px" color="rgba(255,255,255,0.6)">{months.map(m => <Text key={m}>{m}</Text>)}</Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      <IconButton aria-label="left" icon={<FaChevronLeft />} size="sm" onClick={() => scroll(-1)} position="absolute" left="6px" top="55%" transform="translateY(-50%)" bg="rgba(0,0,0,0.45)" color="white" borderRadius="full" boxShadow={hovered ? "0 6px 18px rgba(88,216,193,0.18)" : "none"} opacity={hovered ? 1 : 0} transition="all 220ms ease" _hover={{ transform: "translateY(-50%) scale(1.06)", bg: "rgba(0,0,0,0.65)" }} zIndex={5} />
      <IconButton aria-label="right" icon={<FaChevronRight />} size="sm" onClick={() => scroll(1)} position="absolute" right="6px" top="54.5%" transform="translateY(-50%)" bg="rgba(0,0,0,0.45)" color="white" borderRadius="full" boxShadow={hovered ? "0 6px 18px rgba(88,216,193,0.18)" : "none"} opacity={hovered ? 1 : 0} transition="all 220ms ease" _hover={{ transform: "translateY(-50%) scale(1.06)", bg: "rgba(0,0,0,0.65)" }} zIndex={5} />

      <Box pos="absolute" bottom="8px" left="8px" bg="rgba(255,255,255,0.06)" borderRadius="6px" px="8px" py="6px" fontSize="10px" border="1px solid rgba(255,255,255,0.08)">
        <Flex align="center" gap="8px" mb="4px"><Box w="9px" h="9px" bg="#FB7185" borderRadius="full" /><Text>Red - Mortality</Text></Flex>
        <Flex align="center" gap="8px"><Box w="9px" h="9px" bg="#EAB308" borderRadius="full" /><Text>Yellow - Birth rate</Text></Flex>
      </Box>
    </Box>
  );
};

export default ChartA;
