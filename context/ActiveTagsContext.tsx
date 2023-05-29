import React, { useState, Dispatch, SetStateAction } from "react";
import { Tag } from "../gql/generate/graphql";

type Props = {
  children: React.ReactNode
}

type ActiveTagsContextType = {
  activeTags: Tag[];
  setActiveTags: Dispatch<SetStateAction<Tag[]>>;
};

export const ActiveTagsContext = React.createContext<ActiveTagsContextType>({} as ActiveTagsContextType);


export const ActiveTagsContextProvider: React.FC<Props> = ({ children }) => {
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const value = { activeTags, setActiveTags };

  return (
    <ActiveTagsContext.Provider value={value}>
      {children}
    </ActiveTagsContext.Provider>
  );
  
};