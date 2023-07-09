import { useEffect, useRef } from "react";
import { Box, Text } from '@chakra-ui/react'
import Typed from "typed.js";

// Todo: ランダムにする

const strings = [
  "Webエンジニアの備忘録です",
  "HTML/CSS",
  "Tailwind CSS",
  "Chakra UI",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Vercel",
  "Express.js",
  "Java",
  "Spring Boot",
  "Ruby",
  "Ruby on Rails",
  "GraphQL",
  "SQL",
  "Linux",
  "AWS",
  "Docker",
  "Kubernetes",
  "Auth0",
  "Webエンジニアの備忘録です"
]

export const Mainvisual = () => {
  const el = useRef(null!);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings,
      startDelay: 500,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Box 
      as="section"
      position="relative" 
      height="30vh" 
      display="flex" 
      justifyContent="center" 
      flexDirection="column" 
      overflow="hidden"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(103, 126, 250, 1), rgba(142, 84, 219, 1))" }}
    >
      <Text
        fontSize="xl"
        color="white"
        textAlign="center" >
        <span ref={el} ></span>
      </Text>
    </Box>
  )
}