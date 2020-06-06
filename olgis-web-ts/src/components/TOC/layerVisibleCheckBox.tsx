import React, {useContext, useState} from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import LayerInfoProps from "./layerInfoProps";
import {MapContext} from "../MapContext/mapContext";
import {LayerUtils} from "../../olmap"

type onChangeCallback = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

interface LayerVisibleCheckBoxProps extends LayerInfoProps{

}


/**
 * @param layerName 图层名称
 * TODO 应该直接传入Layer对象，因为根据LayerName传入不保险，万一Layer重命名了呢?
 * */
const LayerVisibleCheckBox:React.FC<LayerVisibleCheckBoxProps> = (props) => {

    const {layerName} = props;

    const olmap = useContext(MapContext);

    const getLayer = () => {
        if(!olmap || !layerName) return undefined;
        return LayerUtils.findLayerByName(olmap, layerName);
    }

    const getChecked = ():boolean => {
        const theLayer = getLayer();
        if(!theLayer) return false;
        return theLayer.getVisible();
    };

    const [checked, setChecked] = useState<boolean>(getChecked());

    const handleChecked = (event:React.ChangeEvent<HTMLInputElement>, change:boolean) => {
        setChecked(change);
        const theLayer = getLayer();
        if(theLayer) {
            theLayer.setVisible(change);
        }
    };

    return (
        <Checkbox
            size="small"
            edge="start"
            checked={checked}
            onChange={handleChecked}
            tabIndex={-1}
            disableRipple
        />
    );


};

export default LayerVisibleCheckBox;