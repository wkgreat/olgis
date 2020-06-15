import React, {FC} from "react";
import {
    Box,
    InputLabel,
    Switch as MSwitch,
    SwitchProps as MSwitchProps,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface ExtraSwitchProps {
    label?:string;
}

export type SwitchProps = ExtraSwitchProps & MSwitchProps;

const Switch: FC<SwitchProps> = ({label, ...restProps}) => {
    return (
        <Box display="inline" css={{maxWidth: 50, marginLeft: 10}}>
            <FormControlLabel
                control={<MSwitch size="small" {...restProps}/>}
                label={<InputLabel shrink={true}>{label}</InputLabel>}
                labelPlacement="top"
            />
        </Box>
    );
};

export default Switch;