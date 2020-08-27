import React, {createContext, ReactNode, useRef} from "react";
import OlMap, {OlMapOptions} from "../../olmap/olMap";
import 'ol/ol.css'
import '../../style/index.scss'

export const MapContext =  createContext<OlMap>(new OlMap({}));

interface MapContextProviderProps extends OlMapOptions{
    children: ReactNode
}

const MapContextProvider: React.FC<MapContextProviderProps> = ({children, ...restProps}) => {

    const olmapRef = useRef(new OlMap(restProps));

    return (
        <MapContext.Provider value={olmapRef.current}>
            <div id='tool-div'/>
            {children}
        </MapContext.Provider>
    );

};

export default MapContextProvider;
