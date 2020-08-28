import React, {FC, FunctionComponentElement, ReactNode, useState} from "react";
import {ListItemButton} from "./expansionPanel";
import {IconButton, IconButtonProps, ListItemProps, ListItemText, Portal} from "@material-ui/core";

export interface ActivatorProps<T>{
    /**
     * 激活Button的Label名称
     * */
    label: string
    /**
     * 需要激活的对象
     * */
    //target: FC<BaseToolProps>
        target: FunctionComponentElement<any>

    triggerProps ?: T

    children ?: ReactNode
}

export const ListItemActivator: FC<ActivatorProps<ListItemProps>> = ({label, target})=> {

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
                {React.cloneElement(target, {open,signal})}
            </Portal>
        </>
    );
};

export const IconButtonActivator: FC<ActivatorProps<IconButtonProps>> = ({label, target, children, triggerProps}) => {

    const [open, setOpen] = useState(false);
    const [signal, setSignal] = useState(0);

    const handleActivate = () => {
        console.log("DSDFSDF");
        setSignal((signal+1)%10000);
        setOpen(true);
    };

    return (
        <>
            <IconButton {...triggerProps} onClick={handleActivate}>{children}</IconButton>
            <Portal container={document.getElementById('tool-div')}>
                {React.cloneElement(target, {open, signal})}
            </Portal>
        </>
    );

};
