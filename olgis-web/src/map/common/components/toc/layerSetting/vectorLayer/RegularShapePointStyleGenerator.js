import React, {Component} from 'react';
import {Col, Input, InputNumber, Row} from "antd";
import * as STYLE from "../../../map/olmapStyle";
import ColorSetter from "../../../color/ColorSetter";

/**
 * props:
 *  onChange
 * */
class RegularShapePointStyleGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            radius: 5,
            angle: 0,
            rotation: 0,
            fillColor: 'blue',
            strokeColor: 'blue',
            strokeWidth: 1,
            whichColor: 'fillColor'
        };

        this.fillColorChange = this.fillColorChange.bind(this);
        this.strokeColorChange = this.strokeColorChange.bind(this);
        this.onPointsChange = this.onPointsChange.bind(this);
        this.onStrokeWidthChange = this.onStrokeWidthChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.onAngleChange = this.onAngleChange.bind(this);
    }

    render() {
        return (
            <div>
                <Row gutter={[6, 6]}>
                    <Col span={6}>
                        <span>边数:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={0} min={0} max={10} onChange={this.onPointsChange}/>
                    </Col>
                    <Col span={6}>
                        <span>边线宽度:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={2} min={0} max={100} onChange={this.onStrokeWidthChange}/>
                    </Col>
                </Row>
                <Row gutter={[6, 6]}>
                    <Col span={6}>
                        <span>半径:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={10} min={0} max={100} onChange={this.onRadiusChange}/>
                    </Col>
                    <Col span={6}>
                        <span>角度:</span>
                    </Col>
                    <Col span={6}>
                        <InputNumber size='small' style={{width: '50px'}}
                                     defaultValue={0} min={0} max={360} onChange={this.onAngleChange}/>
                    </Col>
                </Row>
                <span>填充颜色:</span>
                <Input
                    size="small"
                    addonAfter={<ColorSetter color={STYLE.rgbArrayToObject(this.state.fillColor)}
                                             onChange={this.fillColorChange}/>}
                    defaultValue={this.state.fillColor}
                    value={this.state.fillColor}
                />
                <span>边线颜色:</span>
                <Input
                    size="small"
                    addonAfter={
                        <ColorSetter color={STYLE.rgbArrayToObject(this.state.strokeColor)}
                                     onChange={this.strokeColorChange}/>
                    }
                    defaultValue={this.state.strokeColor}
                    value={this.state.strokeColor}
                />
            </div>

        );
    }

    /**
     * state中的属性是否发生改变
     * */
    shouldUpdateStyle(prevState) {
        return Object.keys(this.state)
            .filter(k => k !== 'colorPanelVisible')
            .some(k => prevState[k] !== this.state[k]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldUpdateStyle(prevState)) {
            let image = STYLE.getPointRegularShapeImage(this.state);
            this.props.onChange(image);
        }
    }

    fillColorChange(colorCode) {

        this.setState({
            fillColor: Object.values(colorCode.rgb)
        });
    }

    strokeColorChange(colorCode) {
        this.setState({
            strokeColor: Object.values(colorCode.rgb)
        });
    }


    onPointsChange(points) {
        this.setState({points});
    }

    onStrokeWidthChange(strokeWidth) {
        this.setState({strokeWidth});
    }

    onRadiusChange(radius) {
        this.setState({radius});
    }

    onAngleChange(angle) {
        angle = angle * Math.PI / 180.0;
        this.setState({angle});
    }


}

export default RegularShapePointStyleGenerator;
