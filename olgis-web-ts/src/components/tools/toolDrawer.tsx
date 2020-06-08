import React, {FC, ReactNode} from "react";
import {Drawer, DrawerProps} from "@material-ui/core";

export interface ToolDrawerProps extends DrawerProps{
    children: ReactNode;
}

const ToolDrawer: FC<ToolDrawerProps> = ({children, ...restProps}) => {

    return (
        <Drawer
            {...restProps}
        >
            {children}
        </Drawer>
    )

};
export default ToolDrawer;