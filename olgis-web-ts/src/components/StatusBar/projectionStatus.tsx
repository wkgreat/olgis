import React, {FC, useContext, useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {MapContext} from "../MapContext/mapContext";
import Projection from "ol/proj/Projection";
import useViewProjection from "../../hooks/useViewProjection";

export interface ProjectionStatusProps {
    visible ?: boolean;
}


const ProjectionStatus: FC<ProjectionStatusProps> = (props) => {

    const {visible} = props;

    const map = useContext(MapContext);

    const parseText = (proj:Projection) => {
        return proj ? `Projection: ${proj.getCode()} Unit: ${proj.getUnits()}` : "Unknown Proj";
    };

    const [vis, setVis] = useState(!!visible);

    const text = parseText(useViewProjection(map));

    useEffect(()=>{
        setVis(!!visible);
    }, [visible, map, vis]);

    const boxProps = {
        p: 0.2,
        mx: 0.5,
        my: "auto",
        bgcolor: "rgba(0,0,0,1)",
        borderRadius: 4
    };

    return <Box visibility={vis ? "visible" : "hidden"} {...boxProps}>
        <Typography variant="caption" display="block">
            {text}
        </Typography>
    </Box>

};

ProjectionStatus.defaultProps = {
    visible: true
};

export default ProjectionStatus;
