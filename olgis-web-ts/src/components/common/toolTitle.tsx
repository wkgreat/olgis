import React, {FC} from "react";
import {Box, BoxProps, Button, ButtonProps, Typography, TypographyProps} from "@material-ui/core";

export interface ToolTitleProps {

    title ?: string
    showOK ?: boolean
    showCancel ?: boolean
    showHelp ?: boolean
    onOK ?: (event: any) => void
    onCancel ?: (event: any) => void
    onHelp ?: (event: any) => void

    wrapperBoxProps ?: BoxProps
    titleTypographyProps ?: TypographyProps
    buttonProps ?: ButtonProps
    okButtonProps ?: ButtonProps
    cancelButtonProps ?: ButtonProps
    helpButtonProps ?: ButtonProps

}

const ToolTitle: FC<ToolTitleProps> = (props) => {

    const {
        title, showOK, showCancel, showHelp, onOK, onCancel, onHelp,
        wrapperBoxProps, titleTypographyProps,
        buttonProps, okButtonProps, cancelButtonProps, helpButtonProps
    } = props;

    const okPorps = Object.assign(Object.assign({}, buttonProps), okButtonProps);
    const cancelPorps = Object.assign(Object.assign({}, buttonProps), cancelButtonProps);
    const helpPorps = Object.assign(Object.assign({}, buttonProps), helpButtonProps);

    return (

        <Box {...wrapperBoxProps} display="flex" justifyContent="space-between" flexWrap="wrap">
            <Typography {...titleTypographyProps}>{title}</Typography>
            <Box>
                {showHelp ? <Button {...helpPorps} onClick={onHelp}>Help</Button> : null}
                {showCancel ? <Button {...cancelPorps} onClick={onCancel}>Cancel</Button> : null}
                {showOK ? <Button {...okPorps} onClick={onOK}>OK</Button> : null}
            </Box>
        </Box>

    )

};

ToolTitle.defaultProps = {
    showOK: true,
    showCancel: true,
    showHelp: false,
    titleTypographyProps: {variant:'h6', color:'primary'}
};

export default ToolTitle;