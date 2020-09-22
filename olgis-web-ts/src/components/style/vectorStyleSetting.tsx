import BaseToolProps, {ToolCallback} from "../tools/baseToolProps";
import BaseVectorLayer from "ol/layer/BaseVector";
import React, {FC, useState} from "react";
import RegularShapeSetting from "./regularShapeSetting";
import {Typography} from "@material-ui/core";
import StrokeSetting from "./strokeSetting";
import FillSetting from "./fillSetting";
import Style, {Options as StyleOptions} from "ol/style/Style";
import {BasicStyleSettingProps} from "./basicStyleSetting";
import {Fill, RegularShape, Stroke} from "ol/style";
import LayerBasePropsSetting from "./layerBasePropsSetting";
import ToolTitle from "../common/toolTitle";

interface BasicVectorStyleSettingProps {
    layer ?: BaseVectorLayer;
}

export type VectorStyleSettingProps = BasicVectorStyleSettingProps & BaseToolProps & BasicStyleSettingProps<Style, StyleOptions>;

const getOptionsFromStyle = (style: Style) => {

    let res = {
        geometry: style.getGeometry(),
        fill: style.getFill(),
        image: style.getImage(),
        renderer: style.getRenderer(),
        stroke: style.getStroke(),
        text: style.getText(),
        zIndex: style.getZIndex()
    };
    return res;

};

const VectorStyleSetting: FC<VectorStyleSettingProps> = (props) => {

    const {
        layer,
        onChange,
    } = props;

    const getOptions = ():StyleOptions => {
        if(!layer) {
            return {}
        } else {
            let theStyle = layer.getStyle();
            if(theStyle instanceof Style) {
                return getOptionsFromStyle(theStyle);
            } else return {};
        }
    };

    const setOp = (opt: Partial<StyleOptions>): void => {
        let nopt = Object.assign(options, opt);
        setOptions({...nopt});
        onChange && onChange(nopt);
        layer && layer.setStyle(new Style({...nopt}));
    };

    const [options, setOptions] = useState<StyleOptions>(getOptions());

    const onOK = (event: ToolCallback)=> {
        props.onOK && props.onOK(event)
    };

    const onCancel = (event: ToolCallback)=> {
        props.onCancel && props.onCancel(event)
    };

    if(props.open) {
        if(!layer) {
            return <div>The Layer Can not find!</div>;
        } else {
            return (
                <div style={{maxWidth: 680, margin: 10}}>
                    <ToolTitle title={`矢量图层设置[${layer.get('name')}]`}
                               onOK={onOK} onCancel={onCancel} showCancel={false}
                    />

                    <div><Typography variant="subtitle1" color="primary">图层属性</Typography></div>
                    <LayerBasePropsSetting open={true} layer={layer} isLayerChange={true} paperProps={{elevation:2}}/>

                    <div><Typography variant="subtitle1" color="primary">点要素属性</Typography></div>
                    <RegularShapeSetting style={options.image as RegularShape} open={true} paperProps={{elevation:2}}
                                         onChange={(opt) => setOp({image: new RegularShape(opt)})}/>

                    <div><Typography variant="subtitle1" color="primary">线要素属性</Typography></div>
                    <StrokeSetting style={options.stroke} open={true} paperProps={{elevation:2}}
                                   onChange={(opt)=>setOp({stroke: new Stroke(opt)})}/>

                    <div><Typography variant="subtitle1" color="primary">多边形要素属性</Typography></div>
                    <FillSetting style={options.fill} open={true} paperProps={{elevation:2}}
                                 onChange={(opt)=>setOp({fill: new Fill(opt)})}/>
                </div>
            );
        }

    } else {
        return <></>
    }

};

export default VectorStyleSetting;