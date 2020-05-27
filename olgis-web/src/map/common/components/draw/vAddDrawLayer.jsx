import React from "react";
import {Button, Col, Drawer, Input, Radio, Row} from "antd";
import IconFont from "../IconFont";

/**
 * {
 *
 *     onLayerTypeChange: f,
 *     onLayerNameChange: f,
 *     onOK f,
 *     onCancel f,
 *     visible: bool
 * }
 *
 * */
const VAddDrawLayer = (props) => {

    return (
        <Drawer
            title={
                <Row>
                    <Col span={12}>添加手绘图层:</Col>
                    <Col span={12}>
                        <Button size="small" type="primary" onClick={props.onOK}>确定</Button>
                        <Button size="small" onClick={props.onCancel}>取消</Button>
                    </Col>
                </Row>
            }
            className="drawer-setter"
            visible={props.visible}
            mask={false}
            closable={false}
            width={300}
        >
            <Row gutter={[16, 16]}>
                <Col>
                    <span>图层名称: </span>
                    <Input size="small" value={props.layerName} onChange={props.onLayerNameChange}/>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col><span>要素类型:</span></Col>
                <Col>
                    <Radio.Group size="small" defaultValue={props.layerType} value={props.layerType}
                                 onChange={props.onLayerTypeChange}>
                        <Radio.Button size="small" value="Point">
                            <IconFont type="iconsandiantu"/>Point</Radio.Button>
                        <Radio.Button size="small" value="LineString">
                            <IconFont type="iconvector-polyline"/>LineString</Radio.Button>
                        <Radio.Button size="small" value="Polygon">
                            <IconFont type="icondraw-polygon-solid"/>Polygon</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </Drawer>
    );
};

export default VAddDrawLayer;