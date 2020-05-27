import * as constants from './actionTypes';
import * as OLMAP from '../map/olmapLayer';
import OLMap from "../map/olmap";

const olmap = new OLMap();

const defaultState = {
    version: 0,
    layerVersion: 0,
    olmap,
    layerNums: 1
};


const copyState = (state) => ({
    version: state.version + 1,
    layerVersion: state.layerVersion,
    olmap: state.olmap,
    layerNums: state.olmap.getLayers().getArray().length,
});


export default ((state = defaultState, action) => {

    let newState;

    switch (action.type) {
        case constants.ADD_LAYER:
            state.olmap.addLayer(action.layer);
            OLMAP.zoomToLayer(state.olmap, action.layer.get('name'));
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.ADD_EMPTY_VECTOR_LAYER:
            let layer = OLMAP.makeVectorLayer(state.olmap, action.layerName);
            state.olmap.addLayer(layer);
            //OLMAP.zoomToLayer(state.olmap, layer.get('name'));
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.ADD_GEOJSON_LAYER:
            let geoJsonLayer = OLMAP.makeGeoJsonLayer(state.olmap, action.name, action.geojson);
            state.olmap.addLayer(geoJsonLayer);
            newState =  copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.REMOVE_LAYER_BY_NAME:
            OLMAP.removeLayerByName(state.olmap, action.name);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.RENAME_LAYER:
            OLMAP.renameLayer(state.olmap, action.name1, action.name2);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.SET_LAYER_PROPS:
            OLMAP.setLayerProps(state.olmap, action.name, action.props);
            newState = copyState(state);
            return newState;
        case constants.LAYER_UP:
            OLMAP.layerUp(state.olmap, action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.LAYER_DOWN:
            OLMAP.layerDown(state.olmap, action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;

        default:
            return state;
    }

});