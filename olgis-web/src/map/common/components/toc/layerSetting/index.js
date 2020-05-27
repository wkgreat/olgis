import React, {Component, Fragment} from 'react';
import * as OLMAP from '../../map/olmapLayer';
import VectorLayerSetting from "./VectorLayerSetting";
import RasterLayerSettingModal from "./RasterLayerSettingModal";

class LayerSetting extends Component {

    render() {

        return (
            <Fragment>
                {this.settingModalChooser()}
            </Fragment>
        );

    }

    settingModalChooser() {

        let layerType = OLMAP.getLayerType(this.props.layer);

        switch (layerType) {
            case "VectorLayer":
                return this.vectorLayerSettingModal();
            case "ImageLayer":
                return this.rasterLayerSettingModal();
            default:
                return this.rasterLayerSettingModal();
        }

    }

    vectorLayerSettingModal() {
        console.log("Setting Model: " + this.props.visible);
        return (
            <VectorLayerSetting
                visible={this.props.visible}
                layer={this.props.layer}
                onOK={this.props.onOK}
                onCancel={this.props.onCancel}
            />
        );
    }

    rasterLayerSettingModal() {
        return (
            <RasterLayerSettingModal
                visible={this.props.visible}
                layer={this.props.layer}
                onOK={this.props.onOK}
                onCancel={this.props.onCancel}
            />
        );

    }

}

export default LayerSetting;