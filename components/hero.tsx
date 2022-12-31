import { useEffect, useRef } from "react";
import { Box, Text } from '@chakra-ui/react'
import Typed from "typed.js";

export default function Hero() {
  const el = useRef(null!);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "駆け出しエンジニアの備忘録です", 
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js", 
        "Redux", 
        "GraphQL", 
        "Tailwind CSS", 
        "Chakra UI",
      ],
      // Speed settings, try diffrent values untill you get good results
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
    <section>
      <Box height="96" bg="gray.600" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Text fontWeight="bold" fontSize="2xl">サイトタイトル</Text>
        <Text fontSize="xl">
          <span ref={el}></span>
        </Text>
      </Box>
    </section>
  )
}