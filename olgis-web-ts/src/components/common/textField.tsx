import {styled, TextField as MTextField, TextFieldProps as MTextFieldProps} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";

const StyledTextField = styled(MTextField)({
    minWidth: 100,
    flexShrink: 0,
    marginLeft: 5
});

/**
 * Properties of {@link TextField} component
 * */
interface BasicTextFieldProps{
    /** Default value on input value is error*/
    defaultValue ?: string
    /** function to check whether input value is error or not*/
    checker ?: (s:string) => boolean
    /** prompting text when input value is error*/
    errorText ?: string,
}

export type TextFieldProps = BasicTextFieldProps & MTextFieldProps;

/**
 * @function
 * TextField Function Component, providing the functionality of checking input value error or not
 * */
const TextField: FC<TextFieldProps> = ({checker, ...restProps}) => {

    const judge = (v:string) => {
        if(checker) {
            return ! checker(v);
        }
        return checker;
    };

    const [text, setText] = useState(restProps.value);
    const [isError, setIsError] = useState(judge(restProps.value as string));

    const onChange = (e:any) => {
        const error = judge(e.target.value);
        setIsError(error);
        if(restProps.onChange) {
            if(error) {
                e.target.value = restProps.defaultValue;
                setText(restProps.defaultValue);
                restProps.onChange(e);
            } else {
                setText(e.target.value);
                restProps.onChange(e);
            }
        }
    };

    useEffect(()=>{
        setText(restProps.value);
    }, [restProps.value]);

    return (
        <StyledTextField
            {...restProps}
            value={text}
            error={isError}
            helperText={isError ? restProps.errorText : restProps.helperText}
            onChange={onChange}
        >
        </StyledTextField>
    );

};

TextField.defaultProps = {
    defaultValue: ""
};


export default TextField;
