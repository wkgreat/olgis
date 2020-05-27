import React, {Component} from 'react';
import {Col, Input, InputNumber, Row, Select, Slider, Switch} from "antd";
import * as STYLE from "../../../map/olmapStyle";
import ColorSetter from "../../../color/ColorSetter";

/**
 *
 color = props.color || 'blue',
 width = props.width || 3,
 lineCap = props.lineCap || 'round',
 lineJoin = props.lineJoin || 'round',
 lineDash = props.lineDash || undefined,
 lineDashOffset = props.lineDashOffset || 0,
 miterLimit = props.miterLimit || 10;
 * */
class StrokeStyleGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: 'blue',
            width: 3,
            lineCap: 'round',
            lineJoin: 'round',
            lineDashOffset: 0,
            miterLimit: 10,
            lineDash: undefined,
            lineDashValue: [0, 0]
        };
        this.setLayerProps = this.setLayerProps.bind(this);
        this.toggleDash = this.toggleDash.bind(this);
    }

    render() {
        return (
            <div>
                <Row gutter={[6, 6]}>
                    <Col span={6}>
                        <span>线宽:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={3} min={0}
                                     onChange={(value) => this.setLayerProps({width: value})}/>
                    </Col>
                    <Col span={6}>
                        <span>虚线偏移:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={0} min={0}
                                     onChange={(value) => this.setLayerProps({lineDashOffset: value})}/>
                    </Col>
                </Row>
                <Row gutter={[6, 6]}>
                    <Col span={6}>
                        <span>转角限量:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={10} min={0}
                                     onChange={(value) => this.setLayerProps({miterLimit: value})}/>
                    </Col>
                    <Col span={6}>
                        <span>线条Cap:</span>
                    </Col>
                    <Col span={6}>
                        <Select size='small' defaultValue="round"
                                onChange={(value) => this.setLayerProps({lineCap: value})}>
                            <Select.Option value="butt">butt</Select.Option>
                            <Select.Option value="round">round</Select.Option>
                            <Select.Option value="square">square</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[6, 6]}>
                    <Col span={6}>
                        <span>线条Join:</span>
                    </Col>
                    <Col span={6}>
                        <Select size='small' defaultValue="round"
                                onChange={(value) => this.setLayerProps({lineJoin: value})}>
                            <Select.Option value="bevel">bevel</Select.Option>
                            <Select.Option value="round">round</Select.Option>
                            <Select.Option value="miter">miter</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[6, 6]}>
                    <Col>
                        <span>虚线:</span> <Switch size="small" checked={this.state.isDash} onChange={this.toggleDash}/>
                        <Slider
                            range
                            step={1}
                            defaultValue={this.state.lineDashValue}
                            disabled={!this.state.isDash}
                            onChange={(v) => this.setLayerProps({lineDashValue: v, lineDash: v})}
                        />
                    </Col>
                    <Col>
                        <span>线条颜色:</span>
                        <Input
                            size="small"
                            addonAfter={
                                <ColorSetter
                                    color={STYLE.rgbArrayToObject(this.state.color)}
                                    onChange={(colorCode) => {
                                        this.setLayerProps({color: Object.values(colorCode.rgb)})
                                    }}/>
                            }
                            defaultValue={this.state.color}
                            value={this.state.color}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    setLayerProps(props) {
        this.setState(props);
    }

    toggleDash(checked) {
        this.setState((preState) => {
            if (checked) {
                return {isDash: checked, lineDash: preState.lineDashValue};
            } else {
                return {isDash: checked, lineDash: undefined};
            }
        });
    }

    /**
     * state中的属性是否发生改变
     * */
    shouldUpdateStyle(prevState) {
        return Object.keys(this.state)
            .some(k => prevState[k] !== this.state[k]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldUpdateStyle(prevState)) {
            let stroke = STYLE.getStroke(this.state);
            console.log(this.state);
            this.props.onChange(stroke);
        }
    }
}

export default StrokeStyleGenerator;