import React, {Component} from 'react';
import {Col, Input, Row} from "antd";
import * as STYLE from "../../../map/olmapStyle";
import ColorSetter from "../../../color/ColorSetter";

/**
 *
 color = props.color || 'blue'
 * */
class FillStyleGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: 'blue'
        };
        this.setProp = this.setProp.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    render() {
        return (
            <div>
                <Row gutter={[6, 6]}>
                    <Col>
                        <span>填充颜色:</span>
                        <Input
                            size="small"
                            addonAfter={
                                <ColorSetter color={STYLE.rgbArrayToObject(this.state.color)}
                                             onChange={this.onColorChange}/>
                            }
                            defaultValue={this.state.color}
                            value={this.state.color}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    setProp(key, value) {
        this.setState({key: value});
    }

    onColorChange(colorCode) {
        this.setState({color: STYLE.rgbObjectToArray(colorCode.rgb)});
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
            let fill = STYLE.getFill(this.state);
            this.props.onChange(fill);
        }
    }
}

export default FillStyleGenerator;