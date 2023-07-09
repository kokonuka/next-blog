import React, { useState, Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode
}

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = React.createContext<LoadingContextType>({} as LoadingContextType);


export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const value = { isLoading, setIsLoading };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
  
};