package wkgreat.gisservice.basicalgo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import wkgreat.gisservice.basicalgo.service.GeoHashService;
import wkgreat.domain.basic.BaseResponse;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("geohash")
public class GeoHashController {

    @Autowired
    GeoHashService geoHashService;

    @GetMapping("/geohash")
    public BaseResponse<String> geohash(Double lon,Double lat, Integer len) {
        String geohash = geoHashService.geohash(lon, lat, len);
        return BaseResponse.success(geohash);
    }

    @GetMapping("/fishnet")
    public BaseResponse<String> geohashFishnet(Double west, Double east, Double south, Double north, Integer len) {
        String res = null;
        BaseResponse<String> response = null;
        try {
            res = geoHashService.fishnet(west,east,south,north,len);
            response = BaseResponse.success(res);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("fishnet error, [{}]", e.getMessage());
            response = BaseResponse.error(e.getMessage());
        }
        return response;
    }

}
