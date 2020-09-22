import React, {ReactNode, useContext, useEffect} from "react";
import OlMap from "../../olmap/olMap";
import {MapContext} from "../MapContext/mapContext";
import {Box, BoxProps, List} from "@material-ui/core";
import LayerItem from "./layerItem";
import {Group} from "ol/layer";
import BaseLayer from "ol/layer/Base";
import {Collection} from "ol";
import OlMapLayerEventType from "../../olmap/olMapLayerEventType";

interface TocProps extends BoxProps{

    /** 是否显示TOC */
    open : boolean;
    boxProps ?: BoxProps

}

const makeLayerList: (layers: Collection<BaseLayer>) => ReactNode
    = (layers: Collection<BaseLayer>) => {
    return layers.getArray().map((layer: BaseLayer) => {
        const name = layer.get('name');
        if (layer instanceof Group) { // 如果是groupLayer
            return (
                <>
                    <LayerItem layer={layer} layerName={name} key={name}/>
                    {makeLayerList(layer.getLayers())}
                </>
            );
        } else {
            return (
                <LayerItem layer={layer} layerName={name} key={name}/>
            );
        }

    }).reverse();
};

/**
 * 刷新时间：图层添加，图层删除，图层属性变化，图层顺序变化
 * */
const TOC: React.FC<TocProps> = ({open, boxProps}) => {

    const olmap: OlMap|undefined = useContext(MapContext);

    const [version, setVersion] = React.useState(0);

    const increVersion = () => {
        setVersion((version+1)%999999);
    };

    useEffect(()=> {
        if(olmap) {
            olmap.on([
                String(OlMapLayerEventType.LAYER_ADD),
                String(OlMapLayerEventType.LAYER_REMOVE),
                String(OlMapLayerEventType.LAYER_RENAME),
                String(OlMapLayerEventType.LAYER_ORDER_CHANGE)
            ], increVersion)
            return ()=>{
                olmap.un([
                    String(OlMapLayerEventType.LAYER_ADD),
                    String(OlMapLayerEventType.LAYER_REMOVE),
                    String(OlMapLayerEventType.LAYER_RENAME),
                    String(OlMapLayerEventType.LAYER_ORDER_CHANGE)
                ], increVersion)
            }
        }
    },);

    if(open) {
        return (
            <Box {...boxProps}>
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