package wkgreat.gisservice.basicalgo.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import wkgreat.gisservice.GisserviceApplicationTests;
import wkgreat.gisservice.basicalgo.beans.GeoHashFishnetRequest;

/**
 * @author Ke Wang
 * @since 2020/9/17
 */
class GeoHashServiceTest extends GisserviceApplicationTests {

    @Autowired
    GeoHashService geoHashService;

    private final static double CHINA_WEST = 73.4990130269162023;
    private final static double CHINA_SOUTH = 3.8378885181350699;
    private final static double CHINA_EAST = 135.0873769630709944;
    private final static double CHINA_NORTH = 53.5616571938263988;

    @Test
    void geohash() {
    }

    @Test
    void fishnet() throws Exception {
        GeoHashFishnetRequest request = new GeoHashFishnetRequest();
        request.setWest(CHINA_WEST);
        request.setEast(CHINA_EAST);
        request.setSouth(CHINA_SOUTH);
        request.setNorth(CHINA_NORTH);
        request.setLen(3);
        request.setRequestId("request-1");
        String json = geoHashService.fishnet(request);
        System.out.println(json);
    }

    @Test
    void saveFishnetAsShp() throws Exception {
        String path = "/Users/wkgreat/Documents/base/ArcGISdata/osm_20200825/fishnet/geohash4Fishnet.shp";
        geoHashService.geohashFishnetSaveShapefile(path, CHINA_WEST, CHINA_EAST, CHINA_SOUTH, CHINA_NORTH, 4);
    }
}