package wkgreat.gisservice.basicalgo.service;

import com.uber.h3core.H3Core;
import com.uber.h3core.util.GeoCoord;
import org.geotools.data.DataUtilities;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.SchemaException;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.geojson.feature.FeatureJSON;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.springframework.stereotype.Service;
import wk.doraemon.geo.JTSUtils;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Ke Wang
 * @since 2020/8/29
 */
@Service
public class UberH3Service {

    public String getH3Boundary(Double lon, double lat, int res) throws Exception {

        String geojson;

        final SimpleFeatureType TYPE = DataUtilities.createType("h3",
                "geometry:Polygon," +
                        "h3:String," +
                        "h3Addr:String"
        );

        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(TYPE);
        FeatureJSON fjson = new FeatureJSON();

        H3Core h3Core = H3Core.newInstance();
        long h3code = h3Core.geoToH3(lat, lon, res);
        String h3Addr = h3Core.geoToH3Address(lat, lon, res);
        List<GeoCoord> geoCoordList = h3Core.h3ToGeoBoundary(h3code);
        List<Coordinate> coordinates
                = geoCoordList.stream().map(c->new Coordinate(c.lng, c.lat)).collect(Collectors.toList());
        LineString lineString = JTSUtils.getLineString(coordinates, 4326);
        featureBuilder.add(lineString);
        featureBuilder.add(h3code);
        featureBuilder.add(h3Addr);
        SimpleFeature feature = featureBuilder.buildFeature("1");
        StringWriter stringWriter = new StringWriter();
        fjson.writeFeature(feature, stringWriter);
        geojson = stringWriter.toString();
        return geojson;

    }

    public String getH3Grid(Double west, Double south, Double east, Double north, int res) throws Exception {
        String geojson;

        final SimpleFeatureType TYPE = DataUtilities.createType("h3",
                "geometry:Polygon," +
                        "h3:String," +
                        "h3Addr:String"
        );

        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(TYPE);
        FeatureJSON fjson = new FeatureJSON();

        H3Core h3Core = H3Core.newInstance();

        GeoCoord southWest = new GeoCoord(south, west);
        GeoCoord southEast = new GeoCoord(south, east);
        GeoCoord northEast = new GeoCoord(north, east);
        GeoCoord northWest = new GeoCoord(north, west);

        List<Long> h3codes = h3Core.polyfill(Arrays.asList(southWest, southEast, northEast, northWest), null, res);
        List<SimpleFeature> features = new ArrayList<>();
        SimpleFeatureCollection collection = new ListFeatureCollection(TYPE, features);

        int i=0;
        for(Long h3code : h3codes) {
            String h3Addr = h3Core.h3ToString(h3code);
            List<GeoCoord> geoCoordList = h3Core.h3ToGeoBoundary(h3code);
            List<Coordinate> coordinates
                    = geoCoordList.stream().map(c->new Coordinate(c.lng, c.lat)).collect(Collectors.toList());
            LineString lineString = JTSUtils.getLineString(coordinates, 4326);
            featureBuilder.add(lineString);
            featureBuilder.add(h3code);
            featureBuilder.add(h3Addr);
            SimpleFeature feature = featureBuilder.buildFeature(String.valueOf(i++));
            features.add(feature);
        }

        StringWriter stringWriter = new StringWriter();
        fjson.writeFeatureCollection(collection, stringWriter);
        geojson = stringWriter.toString();
        return geojson;
    }

}
