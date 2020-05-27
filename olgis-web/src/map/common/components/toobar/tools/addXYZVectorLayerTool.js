import React, {Component, Fragment} from 'react';
import {Input, Modal} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from '../../store';
import * as olmapFuncs from "../../map/olmapLayer";

class AddXYZVectorLayerTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputName: 'MapBox MVT',
            inputURL: 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf',
            access_token: ''
        };
        this.onURLInputChange = this.onURLInputChange.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onTokenInputChange = this.onTokenInputChange.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancle = this.onModalCancle.bind(this);
    }

    render() {

        const {olmap, onAddXYZLayer} = this.props;

        return (
            <Fragment>

                <Modal
                    title='添加XYZ图层'
                    visible={this.props.visible}
                    onOk={() => this.onModalOK(olmap, onAddXYZLayer)}
                    onCancel={this.onModalCancle}
                >
                    请输入图层名称:
                    <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                    请输入XYZ图层URL:
                    <Input value={this.state.inputURL} onChange={this.onURLInputChange}/>
                    Access_Token:
                    <Input.TextArea value={this.state.access_token} onChange={this.onTokenInputChange}/>
                </Modal>

            </Fragment>
        );
    }

    onURLInputChange(e) {
        const inputURL = e.target.value;
        this.setState((preState) => ({
            inputURL
        }));
    }
    onTokenInputChange(e) {
        const access_token = e.target.value;
        this.setState((preState) => ({
            access_token
        }));
    }

    onNameInputChange(e) {
        const inputName = e.target.value;
        this.setState((preState) => ({
            inputName
        }));
    }

    onModalOK(olmap, addLayer) {
        let url = this.state.inputURL;
        if(this.state.access_token) {
            url += ("?access_token="+this.state.access_token);
        }
        addLayer(olmap, this.state.inputName, url);
        this.props.onOK();
    }

    onModalCancle() {
        this.props.onCancel();
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    onAddXYZLayer: (olmap, name, url) => {
        const layer = olmapFuncs.makeXYZVectorLayer(olmap, name, url);
        const action = actionCreators.addLayerAction(layer);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddXYZVectorLayerTool);