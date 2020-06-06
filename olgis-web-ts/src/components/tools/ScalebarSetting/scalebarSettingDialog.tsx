import React, {FC, useState} from "react";
import ToolDialog from "../toolDialog";
import ScalebarSetting from "./scalebarSetting";

const ScalebarSettingDialog: FC = (props)=> {

    const [open, setOpen] = useState(true);

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