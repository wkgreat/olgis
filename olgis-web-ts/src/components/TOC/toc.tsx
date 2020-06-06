import React, {CSSProperties, ReactNode, useContext, useEffect, useState} from "react";
import OlMap from "../../olmap/olMap";
import {MapContext} from "../MapContext/mapContext";
import CollectionEventType from "ol/CollectionEventType";
import {EventsKey} from "ol/events";
import {Box, BoxProps, List, ListTypeMap} from "@material-ui/core";
import LayerItem from "./layerItem";
import {Group} from "ol/layer";
import BaseLayer from "ol/layer/Base";
import {Collection} from "ol";
import {default as E} from "ol/CollectionEventType";
import classNames from "classnames";

interface TocProps extends BoxProps{

    /** 是否显示TOC */
    open : boolean;

}

export const useTocChange = () => {

    const olmap = useContext(MapContext);
    const [revision, setRevision] = useState(0);
    const callback = () => {
        console.log("hhh");
        setRevision(revision+1);
    };

    useEffect(()=>{
        let key : EventsKey | EventsKey[] | undefined ;
        if(olmap) {
            key = olmap.getLayers().once([
                CollectionEventType.ADD,
                CollectionEventType.REMOVE
            ],callback);
            olmap.getLayers().forEach(layer=> layer.once("change", callback) )
        }
    });

    return revision;

}

const makeLayerList: (layers: Collection<BaseLayer>) => ReactNode
    = (layers: Collection<BaseLayer>) => {
    return layers.getArray().map((layer: BaseLayer) => {
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

/**
 * 刷新时间：图层添加，图层删除，图层属性变化，图层顺序变化
 * */
const TOC: React.FC<TocProps> = ({open, ...restProps}) => {

    const olmap: OlMap|undefined = useContext(MapContext);

    const [version, setVersion] = React.useState(0);

    const increVersion = () => {
        setVersion((version+1)%999999);
    };

    useEffect(()=> {
        if(olmap) {
            olmap.getLayers().on([E.ADD,E.REMOVE], increVersion);
            return ()=>{
                olmap.getLayers().un([E.ADD,E.REMOVE], increVersion);
            }
        }
    },);

    if(open) {
        return (
            <Box {...restProps}>
                <List>
                    {olmap ? makeLayerList(olmap.getLayers()) : null}
                </List>
            </Box>
        )
    } else {
        return <></>;
    }

};

export default TOC;