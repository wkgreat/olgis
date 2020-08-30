import {InputLabel, Slider as MSlider, SliderTypeMap, styled} from "@material-ui/core"
import React, {FC} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {DefaultComponentProps} from "@material-ui/core/OverridableComponent";

type Wrapper = 'div' | 'fromControlLabel'

interface ExtraSliderProps {
    label ?: string
    wrapper ?: Wrapper
}

export type SliderProps = ExtraSliderProps & DefaultComponentProps<SliderTypeMap>;

const _Slider:FC<SliderProps> = ({label, wrapper, ...restProps}) => {

    if(wrapper==='div') {
        return (
            <div>
                <InputLabel shrink={true}>{label}</InputLabel>
                <MSlider {...restProps} />
            </div>
        );
    } else {
        return (
            <FormControlLabel
                control={<MSlider {...restProps} />}
                label={<InputLabel shrink={true}>{label}</InputLabel>}
                labelPlacement="top"
            />
        );
    }
};

_Slider.defaultProps = {
    label: "",
    wrapper: "fromControlLabel"
};

const Slider = styled(_Slider)({

    minWidth: 200,
    maxWidth: 250,
    marginLeft: 10,
    marginRight: 10

});

export default Slider;