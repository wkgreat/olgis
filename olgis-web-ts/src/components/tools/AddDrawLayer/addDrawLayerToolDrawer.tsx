import React, {FC, useEffect, useState} from "react";
import AddDrawLayer from "./addDrawLayer";
import BaseToolProps from "../baseToolProps";
import {Drawer, useTheme} from "@material-ui/core";

export interface AddDrawLayerToolDrawerProps extends BaseToolProps{

}

const AddDrawLayerToolDrawer: FC<AddDrawLayerToolDrawerProps> = (props)=> {

    const [isOpen, setIsOpen] = useState(Boolean(props.open));
    const theme = useTheme();

    useEffect(()=>{
        setIsOpen(Boolean(props.open));
    },[props.open, props.signal]);

    return (
        <Drawer open={isOpen}
                    variant="permanent"
                    anchor="right"
                    PaperProps={{
                        elevation: 10,
                        style: {
                            opacity: 0.95
                        }
                    }}
        >
            <AddDrawLayer
                open={isOpen}
                enableOK
                enableCancel
                onOK={() => {
                    setIsOpen(false)
                }}
                onCancel={() => {
                    setIsOpen(false)
                }}
                title="图层绘制"
                boxProps={{
                    css: {
                        maxWidth: 420,
                        margin: theme.spacing(3)
                    }
                }}
            />
        </Drawer>
    )
};

export default AddDrawLayerToolDrawer;
