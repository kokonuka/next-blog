import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { RotatingLines } from 'react-loader-spinner'

type Props = {
  isLoading: boolean
}


export const PageLoading:React.FC<Props> = ({ isLoading }) => {
  const [isView, setIsView] = useState(true)
  const loading = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!isLoading) {
      loading.current?.classList.remove("active")
      setTimeout(() => setIsView(false), 1000)
    }
  }, [isLoading])

  return (
    <>
      {isView && (
        <Box 
          ref={loading} 
          className="loadingWrap active" 
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          bg="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="2"
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Box>
      )}
    </>
  )
}