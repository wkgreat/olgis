import React, {FC, ReactElement} from "react";
import {Box} from "@material-ui/core";
import MousePosition from "./mousePosition";
import ProjectionStatus from "./projectionStatus";

export interface StatusBarProps {
    visible ?: boolean;
    className ?: string;
    children?: ReactElement;
}

/**
 * 地图应用状态栏
 * */
const StatusBar: FC<StatusBarProps> = (props) => {

    return <Box
        position="absolute"
        bottom={0}
        right={0}
        zIndex="snackbar"
        display="flex"
        flexDirection="row-reverse"
        boxShadow={10}
        bgcolor="rgba(0,0,0,0.7)"
    >
        <MousePosition visible={true} followMouse={false} />
        <ProjectionStatus visible={true}/>
    </Box>;
};

export default StatusBar;
