import React, {Fragment} from 'react'
import {Col, Input, Row, Select, Slider, Switch} from "antd";


export default function VScalaBarSetting(props) {

    return (
        <Fragment>
            <Row gutter={[6, 6]}>
                <Col span={6}>
                    <span>显示:</span>
                </Col>
                <Col span={6}>
                    <Switch size="small" onChange={props.setVisible}/>
                </Col>
                <Col span={6}>
                    <span>单位:</span>
                </Col>
                <Col span={6}>
                    <Select disabled={!props.visible} size="small" defaultValue="metric" onChange={props.setUnits}>
                        <Select.Option value="degrees">degrees</Select.Option>
                        <Select.Option value="imperial">imperial inch</Select.Option>
                        <Select.Option value="us">us inch</Select.Option>
                        <Select.Option value="nautical">nautical mile</Select.Option>
                        <Select.Option value="metric" selected>metric</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row gutter={[6, 6]}>
                <Col>
                    <span>最短长度:</span>
                    <Slider disabled={!props.visible} size="small" min={1} max={1000} onChange={props.setMinWidth}/>
                </Col>
            </Row>
            <Row gutter={[6, 6]}>
                <Col span={6}>
                    <span>bar:</span>
                </Col>
                <Col span={6}>
                    <Switch disabled={!props.visible} size="small" onChange={props.setBar}/>
                </Col>
                <Col span={6}>
                    <span>text:</span>
                </Col>
                <Col span={6}>
                    <Input disabled={!props.visible || !props.bar} size="small" onChange={props.setText}/>
                </Col>
            </Row>
            <Row gutter={[6, 6]}>
                <Col>
                    <span>Step:</span>
                    <Slider disabled={!props.visible || !props.bar} size="small" min={0} max={props.minWidth}
                            onChange={props.setSteps}/>
                </Col>

            </Row>
        </Fragment>
    );

}