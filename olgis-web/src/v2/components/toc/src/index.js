import React, {Fragment, useEffect} from "react";
import {LayerItem} from "./LayerItem";
import {List} from "@material-ui/core";
import {MapContext} from "../../mapContext";
import {Group} from "ol/layer";
import {default as E} from "ol/CollectionEventType";

const TOC = (props) => {

    const olmap = React.useContext(MapContext);
    const [version, setVersion] = React.useState(0);

    const increVersion = () => {
        setVersion((version+1)%999999);
    };

    useEffect(()=> {
        olmap.getLayers().on([E.ADD,E.REMOVE], increVersion);
        return ()=>{
            olmap.getLayers().un([E.ADD,E.REMOVE], increVersion);
        }
    },);

    const makeLayerList = (layers) => {
        return layers.getArray().map((layer) => {
            const name = layer.get('name');
            if (layer instanceof Group) { // 如果是groupLayer
                return (
                    <>
                        <LayerItem layerName={name} key={name}/>
                        {makeLayerList(layer.getLayers())}
                    </>
                );
            } else {
                return (
                    <LayerItem layerName={name} key={name}/>
                );
            }

        }).reverse();
    };

    return (

        <List>
            {makeLayerList(olmap.getLayers())}
        </List>

    );

};

export default TOC;