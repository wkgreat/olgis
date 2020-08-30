import React, {FC, useContext, useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {MapContext} from "../MapContext/mapContext";
import Projection from "ol/proj/Projection";

export interface ProjectionStatusProps {
    visible ?: boolean;
}


const ProjectionStatus: FC<ProjectionStatusProps> = (props) => {

    const {visible} = props;

    const map = useContext(MapContext);

    const getProjInfo = ():string => {
        const view = map.getView();
        const proj = view.getProjection();
        return parseText(proj);
    };

    const parseText = (proj:Projection) => {
        return proj ? `Proj: ${proj.getCode()} Unit: ${proj.getUnits()}` : "Unknown Proj";
    };

    const [vis, setVis] = useState(!!visible);
    const [text, setText] = useState(getProjInfo());

    const callback = () => {
        setText(getProjInfo());
    };

    useEffect(()=>{
        setVis(!!visible);
        if(vis) {
            map.on("change:view", callback);
            return () => {
                map.un("change:view", callback);
            }
        }
    }, [visible, map, vis, callback]);

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
