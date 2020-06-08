import React, {createContext, ReactNode} from "react";
import OlMap, {OlMapOptions} from "../../olmap/olMap";
import 'ol/ol.css'
import '../../style/index.scss'

export const MapContext =  createContext<OlMap>(new OlMap({}));

interface MapContextProviderProps extends OlMapOptions{
    children: ReactNode
}

const MapContextProvider: React.FC<MapContextProviderProps> = ({children, ...restProps}) => {

    const olmap: OlMap = new OlMap(restProps);

    return (
        <MapContext.Provider value={olmap}>
            <div id='tool-div'/>
            {children}
        </MapContext.Provider>
    );

};

export default MapContextProvider;