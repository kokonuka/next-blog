import React, { useState, useRef, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { LoadingContext } from "../../context/LoadingContext";

type Props = {};

export const PageLoading: React.FC<Props> = () => {
  const [isView, setIsView] = useState(true);
  const { isLoading } = useContext(LoadingContext);
  const loading = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        loading.current?.classList.remove("active");
        setTimeout(() => setIsView(false), 1000);
      }, 500);
    }
  }, [isLoading]);

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
          h="100dvh"
          bg="gray.900"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="2"
        >
          <div className="page-loader">
            <div className="txt">Loading</div>
            <div className="spin a"></div>
            <div className="spin b"></div>
          </div>
        </Box>
      )}
    </>
  );
};
