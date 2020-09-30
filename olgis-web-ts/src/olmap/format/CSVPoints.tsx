import Feature from "ol/Feature";
import FormatType from "ol/format/FormatType";
import {Geometry, Point} from "ol/geom";
import Projection from "ol/proj/Projection";
import {CSVData} from "./CSVData";
import FeatureFormat, {ReadOptions, transformGeometryWithOptions, WriteOptions} from "ol/format/Feature";

interface CSVPointsReadOptions extends ReadOptions {
    x_field : string,
    y_field : string,
    z_field ?: string,
    m_field ?: string,
    t_field ?: string
}

export default class CSVPoints extends FeatureFormat{

    getXField(opt_options ?: CSVPointsReadOptions) {
        if(opt_options && opt_options.x_field){
            return opt_options.x_field
        } else {
            return "C0"
        }
    }

    getYField(opt_options ?: CSVPointsReadOptions) {
        if(opt_options && opt_options.y_field){
            return opt_options.y_field
        } else {
            return "C1"
        }
    }

    getZField(opt_options ?: CSVPointsReadOptions) {
        if(opt_options && opt_options.z_field){
            return opt_options.z_field
        } else {
            return ""
        }
    }

    getMField(opt_options ?: CSVPointsReadOptions) {
        if(opt_options && opt_options.m_field){
            return opt_options.m_field
        } else {
            return ""
        }
    }

    getTField(opt_options ?: CSVPointsReadOptions) {
        if(opt_options && opt_options.t_field){
            return opt_options.t_field
        } else {
            return ""
        }
    }

    getType(): FormatType {
        return FormatType.TEXT;
    }

    readFeature(source: CSVData, opt_options?: CSVPointsReadOptions): Feature<Geometry> {

        let rows = source.rows;
        if(rows.length<=0) {
            return new Feature<Geometry>();
        } else {
            let geom = this.readGeometry(source, opt_options);
            const feature = new Feature<Geometry>(geom);
            for(let i=0; i<source.numCols; ++i) {
                const cname = source.columnNames[i];
                feature.set(cname,rows[0][i]);
            }
            return feature;
        }

    }

    readFeatures(source: CSVData, opt_options?: CSVPointsReadOptions): Feature[] {
        let rows = source.rows;
        if(rows.length<=0) {
            return [];
        }
        return rows.map(r=>
            this.readFeature({
                header: source.header,
                delimiter: source.delimiter,
                columnNames: source.columnNames,
                numCols: source.numCols,
                rows:[r]
            }, opt_options)
        )
    }

    readGeometry(source: CSVData, opt_options?: CSVPointsReadOptions): Geometry {
        let row = source.rows[0];
        let x = row[source.columnNames.indexOf(this.getXField(opt_options))];
        let y = row[source.columnNames.indexOf(this.getYField(opt_options))];
        //TODO Z, T and M field
        let point = new Point([x,y]);
        let transformedPoint = transformGeometryWithOptions(point,false, opt_options);
        return transformedPoint;
    }

    readProjection(source: CSVData): Projection {
        return this.dataProjection;
    }

    writeFeature(feature: Feature<Geometry>, opt_options?: WriteOptions): string {
        throw Error("writeFeature 未实现");
    }

    writeFeatures(features: Feature<Geometry>[], opt_options?: WriteOptions): string {
        throw Error("writeFeatures 未实现");
    }

    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string {
        throw Error("writeGeometry 未实现");
    }

}
