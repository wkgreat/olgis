import React, {ReactNode} from "react";
import Map from "../components/Map/map";
import Panel from "../components/Panel/panel";

export const showWithMap = (children:ReactNode) => {
    return () => (
        <>
            <Panel open={true}/>
            <Map/>
            {children}
        </>
    );
};