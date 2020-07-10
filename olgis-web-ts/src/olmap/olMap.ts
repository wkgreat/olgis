import {MapOptions} from 'ol/PluggableMap'
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Map, View} from "ol";
import {addCommon, fromLonLat, get} from "ol/proj";
import {ScaleLine} from "ol/control";
import {Options} from 'ol/control/ScaleLine'
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import CSVPoints from "./format/CSVPoints";
import {parseCSVText} from "./format/CSVData";

export interface OlMapOptions extends MapOptions{

    /** 是否显示默认Controls */
    showDefaultControls ?: boolean
}

class OlMap extends Map {

    scaleLine: ScaleLine | null = null;

    constructor(options: OlMapOptions) {

        super(options);
        this.init(options);

    }

    init (options: OlMapOptions) {

        if(!options.showDefaultControls) {
            this.getControls().clear();
        }

        if(!options.layers) {
            //set OSM Layer
            const osmLayer = new TileLayer({
                source: new OSM()
            });
            osmLayer.set('name', 'osm', false);
            this.addLayer(osmLayer);
        }

        if(!options.view) {
            //set View
            const view = new View({
                center: fromLonLat([118.794315, 32.050167]),
                zoom: 10
            });
            this.setView(view);
        }

        this.csvtest()

    }

    csvtest () {
        let csv = `col1, col2, col3
        117,32,3
        117.5,32.5,6
        118,33,9
        `;
        let data = parseCSVText(csv,true,",");

        let csvPoints = new CSVPoints();
        let fs = csvPoints.readFeatures(data,{
            x_field:"col1",
            y_field:"col2",
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
        });

        const testLayer = new VectorLayer({
            source: new VectorSource({
                features: fs
            })
        });
        testLayer.set("name", "csv", false);
        this.addLayer(testLayer);
    }



    toggleScalaBar(visible:boolean, props: Options | undefined) {
        if (visible) {
            this.scaleLine = this.scaleLine || new ScaleLine(props);
            this.addControl(this.scaleLine);
        } else if (!visible && this.scaleLine) {
            this.removeControl(this.scaleLine);
        }
    }

    setScaleBar(visible: boolean, props: Options | undefined) {
        if (visible) {
            if(this.scaleLine) {
                this.removeControl(this.scaleLine);
            }
            this.scaleLine = new ScaleLine(props);
            this.addControl(this.scaleLine);
        }
    }

    getScaleBar(): ScaleLine|null {
        return this.scaleLine
    }

}

export default OlMap
