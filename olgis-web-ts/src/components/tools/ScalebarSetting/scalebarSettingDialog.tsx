import React, {FC, useEffect, useState} from "react";
import ToolDialog from "../toolDialog";
import ScalebarSetting from "./scalebarSetting";
import BaseToolProps from "../baseToolProps";

export interface ScalebarSettingDialogProps extends BaseToolProps{

}

const ScalebarSettingDialog: FC<ScalebarSettingDialogProps> = (props)=> {

    const [open, setOpen] = useState(props.open);

    useEffect(()=>{
        setOpen(props.open);
    },[props.open, props.signal]);

    return (
        <ToolDialog
            open={open}
            enableOK={false}
            enableCancel={false}
        >
            <ScalebarSetting
                title="比例尺设置"
                open={true}
                onOK={()=>{setOpen(false)}}
                onCancel={()=>setOpen(false)}
            />
        </ToolDialog>
    );

};

export default ScalebarSettingDialog;