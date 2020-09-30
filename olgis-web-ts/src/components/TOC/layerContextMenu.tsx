import {Fade, Menu, MenuItem, MenuProps} from "@material-ui/core";
import BaseLayer from "ol/layer/Base";
import React, {FC, useContext} from "react";
import BaseVectorLayer from "ol/layer/BaseVector";
import BaseTileLayer from "ol/layer/BaseTile";
import {LayerUtils} from "../../olmap";
import {MapContext} from "../MapContext/mapContext";
import {ListItemActivator} from "../tools/toolActivator";
import AttributeTable from "../tools/AttributeTable/attributeTable";
import VectorLayer from "ol/layer/Vector";

/**
 * 图层对象上下文菜单组件属性
 * */
export interface LayerContextMenuProps extends MenuProps {

    /** 图层对象 */
    layer ?: BaseLayer
    /** 上下文菜单关闭事件回调 */
    onClose ?: (event?:any) => void

}

/**
 * 图层对象上下文菜单组件
 * */
const LayerContextMenu: FC<LayerContextMenuProps> = (props) => {
    if(props.layer instanceof BaseVectorLayer) {
        return (
            <VectorLayerContextMenu {...props}/>
        );
    } else if (props.layer instanceof BaseTileLayer){
        return (
            <RasterLayerContextMenu {...props}/>
        );
    }
    return <></>
};

export default LayerContextMenu;

/**
 * TODO 完成里面的选项
 * 栅格图层对象上下文菜单组件
 * */
export const RasterLayerContextMenu: FC<LayerContextMenuProps> = (props) => {

    const {layer,...rest} = props;

    return (
        <Menu
            id="RasterLayerContextMenu__menu"
            anchorEl={props.anchorEl}
            keepMounted
            TransitionComponent={Fade}
            {...rest}
        >
            <MenuItem disabled onClick={props.onClose}>栅格图层设置</MenuItem>
        </Menu>
    )

};

/**
 * TODO 完成里面的选项
 * 矢量图层对象上下文菜单组件
 * */
export const VectorLayerContextMenu: FC<LayerContextMenuProps> = (props) => {

    const map = useContext(MapContext);

    const {layer,...rest} = props;

    const handleZoomToLayerClick = (event:any) => {
        LayerUtils.zoomToLayer(map, layer?.get("name"));
        props.onClose && props.onClose(event);
    };

    return (
        <Menu
            id="VectorLayerContextMenu__menu"
            anchorEl={props.anchorEl}
            keepMounted
            TransitionComponent={Fade}
            {...rest}
        >
            <MenuItem onClick={handleZoomToLayerClick}>缩放至图层</MenuItem>
            <MenuItem disabled onClick={props.onClose}>查看属性表</MenuItem>
            <MenuItem disabled onClick={props.onClose}>矢量图层设置</MenuItem>
            <MenuItem disabled onClick={props.onClose}>矢量数据导出</MenuItem>
            <ListItemActivator label="查看属性表" target={<AttributeTable layer={layer as (VectorLayer|undefined)}/>}/>
        </Menu>
    )

};