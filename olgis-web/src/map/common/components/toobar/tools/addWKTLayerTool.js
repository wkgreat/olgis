/**
 * 添加WKT代码
 * */
import React, {Component} from "react";
import {connect} from "react-redux";
import {actionCreators} from '../../store';
import {Input, Modal} from "antd";
import * as OLMAP from '../../map/olmapLayer'

class AddWKTLayerTool extends Component {

    /**
     * 构造器
     * */
    constructor(props) {
        super(props);
        this.state = {
            layerName: "wktVector",
            inputWKT: ""
        };

        //绑定方法
        this.onToolButtonClick = this.onToolButtonClick.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
        this.changeLayerName = this.changeLayerName.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this);
    }

    render() {
        return (
            <Modal
                title='添加WKT矢量图层'
                visible={this.props.visible}
                onOk={this.onModalOK}
                onCancel={this.onModalCancel}>

                图层名称:
                <Input value={this.state.layerName} onChange={this.changeLayerName}/>
                WKT字符串:
                <Input.TextArea
                    placeholder='WKT数据'
                    autoSize={{minRows: 5, maxRows: 8}}
                    value={this.state.inputWKT}
                    onChange={this.changeTextArea}
                />
            </Modal>
        );
    }

    changeLayerName(e) {
        let layerName = e.target.value;
        this.setState({layerName});
    }

    changeTextArea(e) {
        let inputWKT = e.target.value;
        this.setState({inputWKT});
    }

    onToolButtonClick() {
        this.toggleModal();
        console.log("Button Clicked! Tool-Template");
    }

    onModalOK() {
        this.props.addWKTLayer(this.props.olmap, this.state.layerName, this.state.inputWKT);
        this.props.onOK();
    }

    onModalCancel() {
        this.props.onCancel();
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    addWKTLayer: (olmap, name, wkts) => {
        let layer = OLMAP.makeWKTLayer(olmap, name, wkts);
        let action = actionCreators.addLayerAction(layer);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWKTLayerTool);