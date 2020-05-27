import React, {Component} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {connect} from 'react-redux';
import * as ACTION from '../store/actionCreator'
import VAddDrawLayer from "./vAddDrawLayer";
import Draw from "ol/interaction/Draw";
import * as LAYER from '../map/olmapLayer';
import {genLayerName} from '../map/olmapLayer';
import * as STYLE from "../map/olmapStyle";


/**
 * onOK
 * onCancel
 *
 * */
class AddDrawLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            layerType: "Point",
            layerName: "draw_layer"
        };
        if (this.state.visible) {
            this.start();
        }

        this.onOK = this.onOK.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onLayerNameChange = this.onLayerNameChange.bind(this);
        this.onLayerTypeChange = this.onLayerTypeChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setVisible(nextProps.visible);
    }

    start() {
        this.source = new VectorSource();
        this.layer = new VectorLayer({
            name: genLayerName(this.props.olmap, this.state.layerName),
            source: this.source,
            style: STYLE.getDefaultStyle()
        });
        this.props.addLayer(this.layer);
        this.drawInteraction = new Draw({
            source: this.source,
            type: this.state.layerType
        });
        this.props.olmap.addInteraction(this.drawInteraction);
    }

    onOK() {
        this.props.onOK();
        this.props.olmap.removeInteraction(this.drawInteraction);
        this.setVisible(false);
    }

    onCancel() {
        this.props.onCancel();
        this.props.removeLayer(this.layer.get("name"));
        this.props.olmap.removeInteraction(this.drawInteraction);
        this.setVisible(false);
    }

    setVisible(visible) {
        this.setState((preState) => {
            if (visible && !preState.visible) {
                this.start();
            }
            return {visible};
        })
    }

    onLayerNameChange(e) {
        let layerName = e.target.value;
        this.props.renameLayer(this.props.olmap, this.layer.get("name"), layerName);
        this.setState({layerName});
    }

    onLayerTypeChange(e) {
        let layerType = e.target.value;
        this.props.olmap.removeInteraction(this.drawInteraction);
        this.drawInteraction = new Draw({
            source: this.source,
            type: layerType
        });
        this.props.olmap.addInteraction(this.drawInteraction);
        this.setState({layerType});
    }

    render() {
        if (this.state.visible) {
            return (
                <VAddDrawLayer
                    visible={this.state.visible}
                    layerType={this.state.layerType}
                    layerName={this.state.layerName}
                    onLayerTypeChange={this.onLayerTypeChange}
                    onLayerNameChange={this.onLayerNameChange}
                    onOK={this.onOK}
                    onCancel={this.onCancel}
                />
            )
        } else {
            return null;
        }

    }
}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    addLayer: (layer) => {
        let action = ACTION.addLayerAction(layer);
        dispatch(action);
    },
    removeLayer: (layerName) => {
        let action = ACTION.removeLayerByNameAction(layerName);
        dispatch(action);
    },
    renameLayer: (olmap, name1, name2) => {
        let newName = LAYER.genLayerName(olmap, name2);
        let action = ACTION.renameLayer(name1, newName);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDrawLayer);