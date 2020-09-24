package wkgreat.gisservice.basicalgo.service;

import org.geotools.data.DataUtilities;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.geojson.feature.FeatureJSON;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wk.doraemon.geo.JTSUtils;
import wk.doraemon.geo.geohash.GeoBits;
import wk.doraemon.geo.geohash.GeoHash;
import wkgreat.domain.basic.RequestProgress;
import wkgreat.domain.gis.shapefile.ShapefileWriter;
import wkgreat.gisservice.basicalgo.beans.GeoHashFishnetRequest;
import wkgreat.gisservice.basicalgo.beans.GeoHashRequest;
import wkgreat.gisservice.socket.RequestProgressSocketEndPoint;

import java.io.File;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class GeoHashService {

    @Autowired
    RequestProgressSocketEndPoint requestProgressSocketEndPoint;

    /**
     * 获得经纬度位置的geohash
     * @param request {@link GeoHashRequest}
     * @return geohash
     * */
    public String geohash(GeoHashRequest request) {

        return GeoHash.getGeoHash(request.getLon(), request.getLat(), request.getLen());

    }

    /**
     * 获得对应经纬度范围的geohash网格
     * @param request {@link GeoHashFishnetRequest}
     * @return 网格矢量数据geojson
     * @throws Exception 计算异常
     * */
    public String fishnet(GeoHashFishnetRequest request) throws Exception {

        String requestId = request.getRequestId();
        Double west = request.getWest();
        Double east = request.getEast();
        Double south = request.getSouth();
        Double north = request.getNorth();
        Integer len = request.getLen();

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
        int total = geobits.size();
        int cur = 0;
        for(long geobit : geobits) {
            String wkt = GeoBits.toWKT(geobit);
            Polygon polygon = (Polygon) JTSUtils.wkt2geom(wkt);
            featureBuilder.add(polygon);
            featureBuilder.add(geobit);
            featureBuilder.add(GeoBits.geobitsToBase32(geobit));
            features.add(featureBuilder.buildFeature(null));
            RequestProgress requestProgress = RequestProgress.running(requestId, ++cur, total);
            requestProgressSocketEndPoint.sendProgress(requestProgress);
        }
        StringWriter writer = new StringWriter();
        fjson.writeFeatureCollection(collection, writer);
        return writer.toString();
    }

    /**
     * 获得对应经纬度范围的geohash网格，并存入shapefile格式文件
     * @param path shapefile文件路径
     * @param west 矩形范围西边界
     * @param east 矩形范围东边界
     * @param south 矩形范围南边界
     * @param north 矩形范围北边界
     * @param len geohash base32位数
     * @throws Exception 计算异常
     * */
    public void geohashFishnetSaveShapefile(String path, double west, double east, double south, double north, int len)
            throws Exception {

        final SimpleFeatureType TYPE = DataUtilities.createType("Geohash",
                "the_geom:Polygon," +
                        "geobits:Integer," +
                        "geohash:String"
        );

        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(TYPE);
        List<SimpleFeature> features = new ArrayList<>();
        SimpleFeatureCollection collection = new ListFeatureCollection(TYPE, features);

        Set<Long> geobits = GeoBits.expandGeohashes(west, east, south, north, len*5);
        for(long geobit : geobits) {
            String geohash = GeoBits.geobitsToBase32(geobit);
            String wkt = GeoBits.toWKT(geobit);
            System.out.println(wkt);
            Polygon polygon = (Polygon) JTSUtils.wkt2geom(wkt);
            polygon.setSRID(4326);
            featureBuilder.add(polygon);
            featureBuilder.add(geobit);
            featureBuilder.add(geohash);
            features.add(featureBuilder.buildFeature(geohash));
        }

        File newFile = new File(path);

        ShapefileWriter shapefileWriter = new ShapefileWriter();
        shapefileWriter.writeFeatures(newFile, collection);

    }

}
