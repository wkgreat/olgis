import React, {FC, useEffect, useState} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Box, Typography} from "@material-ui/core";

export interface ProgressBarProps {
    autoShow?:boolean
    showNumber?:boolean
    value?:number
}

const limitInRange = (v?:number) => {
    if(!v || v<0) {
        return 0;
    }
    if(v>100) {
        return 100;
    }
    return Math.round(v);
};

const ProgressBar:FC<ProgressBarProps> = (props) => {
    const {autoShow, showNumber, value} = props;
    const [_value, _setValue] = useState<number|undefined>(value);
    useEffect(()=>{
        _setValue(value);
    },[value]);
    const limitedValue = limitInRange(_value);

    if(autoShow && (limitedValue<=0 || limitedValue>=100)) {
        return <></>
    } else {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={showNumber ? 1 : 0}>
                    <LinearProgress variant="determinate" color={"secondary"} value={limitedValue} />
                </Box>
                {showNumber ?
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${limitedValue}%`}</Typography>
                    </Box>
                    :<></>
                }
            </Box>
        );
    }

};

ProgressBar.defaultProps = {
    value: 0,
    showNumber: false,
    autoShow: false
};

export default ProgressBar;