import {styled, TextField as MTextField, TextFieldProps as MTextFieldProps} from "@material-ui/core";
import React, {FC, useState} from "react";

const StyledTextField = styled(MTextField)({
    minWidth: 100,
    flexShrink: 0,
    marginLeft: 5
});

interface BasicTextFieldProps{
    checker ?: (s:string) => boolean
    errorText ?: string
}

export type TextFieldProps = BasicTextFieldProps & MTextFieldProps;

const TextField: FC<TextFieldProps> = ({checker, ...restProps}) => {

    const judge = (v:string) => {
        if(checker) {
            return ! checker(v);
        }
        return checker;
    };

    const [isError, setIsError] = useState(judge(restProps.value as string));

    const onChange = (e:any) => {
        setIsError(judge(e.target.value));
        if(restProps.onChange && !isError) {
            restProps.onChange(e);
        }
    };

    return (
        <StyledTextField
            {...restProps}
            error={isError}
            helperText={isError ? restProps.errorText : restProps.helperText}
            onChange={onChange}
        >
        </StyledTextField>
    );

};


export default TextField;
