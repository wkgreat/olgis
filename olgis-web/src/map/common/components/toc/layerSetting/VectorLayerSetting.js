import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Collapse, Drawer} from 'antd';
import RegularShapePointStyleGenerator from './vectorLayer/RegularShapePointStyleGenerator';
import StrokeStyleGenerator from "./vectorLayer/StrokeStyleGenerator";
import {getDefaultStyle} from "../../map/olmapStyle";
import FillStyleGenerator from "./vectorLayer/FillStyleGenerator";

class VectorLayerSetting extends Component {

    constructor(props) {
        super(props);
        this.oldStyle = this.isFuncStyle() ? this.getStyle() : this.getStyle().clone();
        this.title = this.title.bind(this);
        this.isFuncStyle = this.isFuncStyle.bind(this);
        this.onOK = this.onOK.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onStrokeChange = this.onStrokeChange.bind(this);
        this.onFillChange = this.onFillChange.bind(this);
    }

    render() {

        const {layer} = this.props;

        return (
            <Drawer
                title={this.title(layer.get('name'))}
                placement='right'
                width={350}
                onClose={this.onOK}
                visible={this.props.visible}
                className="drawer-setter"
                bodyStyle={{margin: "0px", padding: "0px"}}
            >
                <Collapse defaultActiveKey={["1"]}>
                    <Collapse.Panel header="Point Regular Shape" key="1">
                        <RegularShapePointStyleGenerator
                            layer={this.props.layer}
                            onChange={this.onImageChange}
                        />
                    </Collapse.Panel>
                    <Collapse.Panel header="Line Stroke" key="2">
                        <StrokeStyleGenerator
                            layer={this.props.layer}
                            onChange={this.onStrokeChange}
                        />
                    </Collapse.Panel>
                    <Collapse.Panel header="Polygon Fill" key="3">
                        <FillStyleGenerator
                            layer={this.props.layer}
                            onChange={this.onFillChange}
                        />
                    </Collapse.Panel>
                </Collapse>
            </Drawer>
        );
    }

    title(layerName) {
        return (
            <span>
                <span>图层设置: </span>
                <span>{layerName}</span><br/>
                <Button size="small" type="link" onClick={this.onOK}>确定</Button>
                <Button size="small" type="link" onClick={this.onCancel}>取消</Button>
            </span>
        );
    }

    isFuncStyle() {
        let style = this.props.layer.getStyle();
        return (typeof style) == 'function';
    }

    getStyle() {
        let style = this.props.layer.getStyle();
        if ((typeof style) == "function") {
            return getDefaultStyle();
        } else {
            return style;
        }
    }

    onOK() {
        this.props.onOK();
    }

    onCancel() {
        let layer = this.props.layer;
        layer.setStyle(this.oldStyle);
        this.props.onCancel();
    }

    onImageChange(image) {
        let layer = this.props.layer;
        let style = this.getStyle();
        style.setImage(image);
        layer.setStyle(style);
    }

    onStrokeChange(stroke) {
        let layer = this.props.layer;
        let style = this.getStyle();
        style.setStroke(stroke);
        layer.setStyle(style);
    }

    onFillChange(fill) {
        let layer = this.props.layer;
        let style = this.getStyle();
        style.setFill(fill);
        layer.setStyle(style);
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps, null)(VectorLayerSetting);