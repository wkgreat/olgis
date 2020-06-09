import React, {FC} from "react";
import {SketchPicker, SketchPickerProps} from 'react-color';
import {IconButton, IconButtonProps, Popover} from "@material-ui/core";
import Settings from '@material-ui/icons/Settings'
import ColorizeOutlined from '@material-ui/icons/ColorizeOutlined'

interface ColorSetterButtonProps extends SketchPickerProps{
    iconButtonProps?: IconButtonProps
};

const ColorSetterButton:FC<ColorSetterButtonProps> = (props) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton {...props.iconButtonProps} onClick={handleClick}>
                <ColorizeOutlined color="primary"/>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <SketchPicker
                    color={props.color}
                    onChange={props.onChange}
                    onChangeComplete={props.onChangeComplete}
                />
            </Popover>
        </>
    );

};

export default ColorSetterButton;