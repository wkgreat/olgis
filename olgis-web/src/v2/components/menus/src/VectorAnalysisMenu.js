import React from "react";
import MenuButton from "./index";
import AddGeohashFishnet from "../../tools/src/AddGeohashFishnet/addGeohashFishnet";

const VectorAnalysisMenu = (props) => {

    return (
        <MenuButton label="矢量分析">
            <AddGeohashFishnet/>
        </MenuButton>
    )

};

export default VectorAnalysisMenu;