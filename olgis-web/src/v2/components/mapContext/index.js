import React from "react";
import OLMap from "../../../map/common/components/map/olmap";

export const olmap = new OLMap();

export const MapContext = React.createContext(olmap);

const MapContextProvider = (props) => {

    return (
        <MapContext.Provider value={olmap}>
            {props.children}
        </MapContext.Provider>
    );

};

export default MapContextProvider;