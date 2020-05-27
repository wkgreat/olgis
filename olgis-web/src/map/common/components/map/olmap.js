import {Map, View} from 'ol'
import 'ol/ol.css';
import {ScaleLine} from 'ol/control';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";

class OLMap {
    constructor(props) {
        let map = new _OLMap(props);
        map.init();
        return map;
    }
}

class _OLMap extends Map {

    scaleLine = undefined;

    osmLayer = new TileLayer({
        name: 'osm',
        source: new OSM()
    });

    view = new View({
        center: fromLonLat([118.794315, 32.050167]),
        zoom: 10
    });

    init() {
        this.setView(this.view);
        this.addLayer(this.osmLayer);
        let that = this;
        setTimeout(function () { that.updateSize(); },100);
    }

    toggleScalaBar(visible) {
        if (visible) {
            this.scaleLine = this.scaleLine || new ScaleLine();
            this.addControl(this.scaleLine);
        } else if (!visible) {
            this.removeControl(this.scaleLine);
        }
    }

    setScaleBar(visible, props) {
        if (visible) {
            this.removeControl(this.scaleLine);
            console.log(props);
            this.scaleLine = new ScaleLine(props);
            this.addControl(this.scaleLine);
        }
    }
}

export default OLMap;