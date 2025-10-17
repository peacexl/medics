import React, { useEffect, useState, useRef } from "react";
import { Box, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FiRefreshCw, FiPlus, FiMinus, FiChevronUp, FiChevronDown } from "react-icons/fi";

const getBarColor = (pct, label, value) => {
  if (label === "Heartbeat") {
    if (value > 90) return "#E53E3E"; // red
    if (value < 68) return "#EAB308"; // yellow
    return "#38B2AC"; // green
  }
  
  if (pct < 30) return "#EAB308"; // yellow (low)
  if (pct > 85) return "#E53E3E"; // red (too high)
  return "linear-gradient(90deg,#38B2AC,#2C9F9A)"; // normal
};

const Stat = ({ label, value, max, unit, onInc, onDec }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = getBarColor(pct, label, value);

  return (
    <VStack align="stretch" spacing="4px" w="100%">
      <HStack justify="space-between">
        <Text fontSize="12px" color="white">{label}</Text>
        <Text fontSize="12px" color="rgba(255,255,255,0.9)">{value}{unit}</Text>
      </HStack>

      {(onInc || onDec) && (
        <HStack justify="flex-end" spacing="4px" mb="-2px">
          {onDec && (
            <IconButton icon={<FiMinus />} size="xs" onClick={onDec}
              bg="rgba(255,255,255,0.06)" _hover={{ bg: "rgba(255,255,255,0.15)" }}
              color="white" borderRadius="full" />
          )}
          {onInc && (
            <IconButton icon={<FiPlus />} size="xs" onClick={onInc}
              bg="rgba(255,255,255,0.06)" _hover={{ bg: "rgba(255,255,255,0.15)" }}
              color="white" borderRadius="full" />
          )}
        </HStack>
      )}

      <Box bg="rgba(255,255,255,0.06)" borderRadius="999px" h="8px" overflow="hidden">
        <Box h="100%" w={`${pct}%`} bg={color} transition="width 600ms ease, background 400ms ease" />
      </Box>
    </VStack>
  );
};

const ChartB = ({ w = 240, h = 160 }) => {
  const [steps, setSteps] = useState(3200);
  const [bpm, setBpm] = useState(72);
  const [water, setWater] = useState(850);
  const [cal, setCal] = useState(760);
  const [spinning, setSpinning] = useState(false);
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSteps((s) => Math.min(10000, s + Math.round(Math.random() * 60)));
      setBpm((b) => Math.max(50, Math.min(110, Math.round(b + (Math.random() - 0.45) * 4))));
      setWater((w) => Math.min(3000, w + Math.round(Math.random() * 25)));
      setCal((c) => Math.max(300, Math.min(2500, c + Math.round((Math.random() - 0.4) * 20))));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const resetAll = () => {
    setSpinning(true);
    setSteps(0);
    setBpm(70);
    setWater(0);
    setCal(0);
    setTimeout(() => setSpinning(false), 1000);
  };

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <Box position="relative" w={`${w}px`} h={`${h}px`}
      borderRadius="12px" bg="rgba(0,0,0,0.36)"
      border="1px solid rgba(255,255,255,0.08)"
      backdropFilter="blur(6px)"
      boxShadow="0 8px 24px rgba(0,0,0,0.4)"
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scroll area */}
      <Box ref={scrollRef} p="12px" h="100%" overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)", borderRadius: "6px", visibility: "hidden"
          },
          "&:hover::-webkit-scrollbar-thumb": { visibility: "visible" },
        }}
      >
        <HStack justify="space-between" mb="6px">
          <Text fontSize="14px" color="white" fontWeight="600">Your Daily Progress</Text>
          <IconButton icon={<FiRefreshCw />} size="xs" onClick={resetAll}
            color="white" bg="transparent" _hover={{ color: "#38B2AC" }}
            borderRadius="full" transform={spinning ? "rotate(360deg)" : "rotate(0deg)"}
            transition="transform 1s ease" />
        </HStack>

        <VStack align="stretch" spacing="8px">
          <Stat label="Steps" value={steps} max={10000}
            onInc={() => setSteps((s) => Math.min(10000, s + 100))}
            onDec={() => setSteps((s) => Math.max(0, s - 100))} />
          <Stat label="Heartbeat" value={bpm} max={110} unit=" bpm" />
          <Stat label="Water Intake" value={water} max={3000} unit=" ml"
            onInc={() => setWater((w) => Math.min(3000, w + 100))}
            onDec={() => setWater((w) => Math.max(0, w - 100))} />
          <Stat label="Calories" value={cal} max={2500} unit=" kcal" />
        </VStack>
      </Box>

      {/* Scroll buttons (appear on hover) */}
      {hovered && (
        <>
          <IconButton
            icon={<FiChevronUp />} size="xs"
            position="absolute" top="4px" right="4px"
            onClick={() => scrollBy(-40)}
            bg="rgba(0,0,0,0.4)" color="white" _hover={{ bg: "rgba(0,0,0,0.6)" }}
            borderRadius="full" zIndex={2}
          />
          <IconButton
            icon={<FiChevronDown />} size="xs"
            position="absolute" bottom="4px" right="4px"
            onClick={() => scrollBy(40)}
            bg="rgba(0,0,0,0.4)" color="white" _hover={{ bg: "rgba(0,0,0,0.6)" }}
            borderRadius="full" zIndex={2}
          />
        </>
      )}
    </Box>
  );
};

export default ChartB;
