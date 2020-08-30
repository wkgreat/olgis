import BaseLayer from "ol/layer/Base";

interface LayerInfoProps {
    /** 图层ID */
    layerId ?: number;
    /** 图层名称 */
    layerName ?: string;
    /** 图层对象 */
    layer ?: BaseLayer;
}

export default LayerInfoProps;