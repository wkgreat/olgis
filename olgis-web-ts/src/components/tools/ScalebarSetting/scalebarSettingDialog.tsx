import React, {FC, useEffect, useState} from "react";
import ToolDialog from "../toolDialog";
import ScalebarSetting from "./scalebarSetting";
import BaseToolProps from "../baseToolProps";

export interface ScalebarSettingDialogProps extends BaseToolProps{

}

const ScalebarSettingDialog: FC<ScalebarSettingDialogProps> = (props)=> {

    const [open, setOpen] = useState(props.open);

    useEffect(()=>{
        console.log("activate");
        setOpen(props.open);
    },[props.open, props.signal]);

    return (
        <ToolDialog
            title="比例尺设置"
            open={open}
            enableOK={false}
            enableCancel={false}
        >
            <ScalebarSetting
                title=""
                open={true}
                onOK={()=>{setOpen(false)}}
                onCancel={()=>setOpen(false)}
            />
        </ToolDialog>
    );

};

export default ScalebarSettingDialog;