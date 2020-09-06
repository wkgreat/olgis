import React, {Component} from 'react';
import {Input, Modal, Slider} from "antd";
import * as OLMAP from "../../../map/olmapLayer";
import {actionCreators} from "../../../store";
import {connect} from "react-redux";

class GeoHashGridTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            west: 0,
            east: 0,
            south: 0,
            north: 0,
            geohashLen: 6
        };
        this.onWestChange = this.onWestChange.bind(this);
        this.onEastChange = this.onEastChange.bind(this);
        this.onSouthChange = this.onSouthChange.bind(this);
        this.onNorthChange = this.onNorthChange.bind(this);
        this.onGeoHashLenChange = this.onGeoHashLenChange.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
    }

    render() {

        return (
            <Modal
                title='添加Geohash网格'
                visible={this.props.visible}
                onOk={this.onModalOK}
                onCancel={this.onModalCancel}
            >
                经纬度范围:
                西经度
                <Input value={this.state.west} onChange={this.onWestChange}/>
                东经度
                <Input value={this.state.east} onChange={this.onEastChange}/>
                南纬度
                <Input value={this.state.south} onChange={this.onSouthChange}/>
                北纬度
                <Input value={this.state.north} onChange={this.onNorthChange}/>
                GeoHash位数:
                <Slider size="small" min={0} max={7} onChange={this.onGeoHashLenChange}/>
            </Modal>
        )

    }

    onGeoHashLenChange(v) {
        this.setState({geohashLen:v});
    }


    onWestChange(e) {
        const west = e.target.value;
        this.setState({west});
    }
    onEastChange(e) {
        const east = e.target.value;
        this.setState({east});
    }
    onSouthChange(e) {
        const south = e.target.value;
        this.setState({south});
    }
    onNorthChange(e) {
        const north = e.target.value;
        this.setState({north});
    }

    onModalOK() {
        console.log(this.state);
        this.props.addGeoHashGrid(this.state.west, this.state.east, this.state.south, this.state.north, this.state.geohashLen);
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
    addLayer: (olmap, name, csv, fieldIndex) => {
        const layer = OLMAP.makeCSVLayer(olmap, name, csv, fieldIndex);
        const action = actionCreators.addLayerAction(layer);
        dispatch(action);
    },
    addGeoHashGrid: (west, east, south, north, geohashLen) => {
        dispatch(actionCreators.getGeohashGrid(west, east, south, north, geohashLen));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoHashGridTool);