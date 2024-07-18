// components/MasonryLayout.js
"use client";

import { ReactNode } from "react";
import Masonry, { MasonryProps } from "react-masonry-css";

type MasonryLayoutProps = MasonryProps & { 
  children: ReactNode;
}

export const MasonryLayout: React.FC<MasonryLayoutProps>  = ({children}) => {
  return (
    <Masonry className="flex gap-4" breakpointCols={3}>
      {children}
    </Masonry>
  );
};


