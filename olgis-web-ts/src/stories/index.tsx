import React, {ReactNode} from "react";
import TOC from "../components/TOC/toc";
import Map from "../components/Map/map";

export const showWithMap = (children:ReactNode) => {
    return () => (
        <>
            <TOC open={false}/>
            <Map/>
            {children}
        </>
    );
};