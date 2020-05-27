import React, {Component} from 'react';
import {LayerItemWrapper, LayerToolDiv} from './style';
import {connect} from 'react-redux';
import * as olmapActions from '../store/actionCreator';
import * as OLMAP from "../map/olmapLayer";
import LayerSetting from "./layerSetting";


class LayerItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toolVisible: false,
            settingVisible: false,
            layerProps: {
                visible: true
            },
            layer: OLMAP.findLayerByName(this.props.olmap, this.props.layerName)
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onSettingClick = this.onSettingClick.bind(this);
        this.onSettingOK = this.onSettingOK.bind(this);
        this.onSettingCancle = this.onSettingCancle.bind(this);
    }

    render() {

        const P = this.props;
        const S = this.state;
        return (
            <LayerItemWrapper onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <span className='layerNameSpan'>{P.layerName}</span>
                <LayerToolDiv className={S.toolVisible ? '' : 'hide'}>
                    <span className="iconfont" onClick={() => {
                        P.layerUp(P.layerName)
                    }}>&#xe612;</span>
                    <span className="iconfont" onClick={() => {
                        P.layerDown(P.layerName)
                    }}>&#xe615;</span>
                    <span className="iconfont" onClick={() => {
                        P.zoomToLayer(P.olmap, P.layerName)
                    }}>&#xeaf6;</span>
                    <span className="iconfont" onClick={() => {
                        P.removeLayer(P.layerName)
                    }}>&#xe603;</span>
                    <span className="iconfont" onClick={this.onSettingClick}>&#xe6ef;</span>
                </LayerToolDiv>
                {this.showSettingModal()}
            </LayerItemWrapper>
        );
    }

    showSettingModal() {

        if (this.state.settingVisible) {
            return (
                <LayerSetting
                    visible={this.state.settingVisible}
                    layer={this.state.layer}
                    onOK={this.onSettingOK}
                    onCancel={this.onSettingCancle}
                />
            );
        }

    }

    onSettingClick() {
        this.setState({settingVisible: true});
    }

    onMouseEnter() {
        this.setState({toolVisible: true});
    }

    onMouseLeave() {
        this.setState({toolVisible: false});
    }

    onSettingOK() {
        this.setState({settingVisible: false});
    }

    onSettingCancle() {
        this.setState({settingVisible: false});
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    zoomToLayer: (olmap, name) => {
        OLMAP.zoomToLayer(olmap, name);
    },
    layerUp: (name) => {
        dispatch(olmapActions.layerUpAction(name));
    },
    layerDown: (name) => {
        dispatch(olmapActions.layerDownAction(name));
    },
    removeLayer: (name) => {
        dispatch(olmapActions.removeLayerByNameAction(name));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerItem);