import React from "react";
import MenuButton from "./index";
import AddXYZTileLayerTool from "../../tools/src/AddXYZTileLayer";
import AddXYZVectorLayer from "../../tools/src/AddXYZVectorLayer/addXYZVectorLayer";

const LayerMenu = (props) => {

    return (
        <MenuButton label="图层">
            <AddXYZTileLayerTool/>
            <AddXYZVectorLayer/>
        </MenuButton>
    )

};

export default LayerMenu;