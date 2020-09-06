package wkgreat.gisservice.basicalgo.service;

import org.geotools.data.DataUtilities;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.geojson.feature.FeatureJSON;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.springframework.stereotype.Service;
import wk.doraemon.geo.JTSUtils;
import wk.doraemon.geo.geohash.GeoBits;
import wk.doraemon.geo.geohash.GeoHash;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class GeoHashService {

    public String geohash(double lon, double lat, int len) {

        return GeoHash.getGeoHash(lon, lat, len);

    }

    public String fishnet(double west, double east, double south, double north, int len) throws Exception {

        final SimpleFeatureType TYPE = DataUtilities.createType("Geohash",
                "geometry:Polygon," +
                        "geobits:Integer," +
                        "geohash:String"
        );

        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(TYPE);
        List<SimpleFeature> features = new ArrayList<>();
        SimpleFeatureCollection collection = new ListFeatureCollection(TYPE, features);
        FeatureJSON fjson = new FeatureJSON();

        Set<Long> geobits = GeoBits.expandGeohashes(west, east, south, north, len*5);
        for(long geobit : geobits) {
            String wkt = GeoBits.toWKT(geobit);
            Polygon polygon = (Polygon) JTSUtils.wkt2geom(wkt);
            featureBuilder.add(polygon);
            featureBuilder.add(geobit);
            featureBuilder.add(GeoBits.geobitsToBase32(geobit));
            features.add(featureBuilder.buildFeature(null));
        }
        StringWriter writer = new StringWriter();
        fjson.writeFeatureCollection(collection, writer);
        return writer.toString();
    }

}
