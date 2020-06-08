import React, {FC, useState} from "react";
import {ListItemButton} from "../Panel/expansionPanel";
import {ListItemText, Portal} from "@material-ui/core";
import BaseToolProps from "./baseToolProps";

export interface ActivatorProps{
    /**
     * 激活Button的Label名称
     * */
    label: string
    /**
     * 需要激活的对象
     * */
    target: FC<BaseToolProps>
}

const ListItemActivator: FC<ActivatorProps> = ({label, target})=> {

    const Target = target;
    const [open, setOpen] = useState(false);
    const [signal, setSignal] = useState(0);

    const handleActivate = () => {
        setSignal((signal+1)%10000);
        setOpen(true);
    };

    return (
        <>
            <ListItemButton role={undefined} dense button onClick={handleActivate}>
                <ListItemText>{label}</ListItemText>
            </ListItemButton>
            <Portal container={document.getElementById('tool-div')}>
                <Target open={open} signal={signal}/>
            </Portal>
        </>
    );
};

export default ListItemActivator;