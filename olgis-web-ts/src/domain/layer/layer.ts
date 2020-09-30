//图层类型
export type LayerType = "Vector" | "Raster" | "Tile" | "WFS" | "WMS"

//基本图层属性
abstract class BaseLayerDef {
    type ?: LayerType
}



